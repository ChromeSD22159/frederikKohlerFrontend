import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import pako from 'pako';
import axios from 'axios';

function generateToken(now,expirationTime,config) {
    const privateKeyPath = path.resolve('assets/AuthKey_L698WZ2VD6.p8');
    const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

    const keyId = process.env.APPSTORE_KEY_ID || config.APPSTORE_KEY_ID
    const issuerId = process.env.APPSTORE_ISSUER_ID || config.APPSTORE_ISSUER_ID
    const bundleId = process.env.APPSTORE_BUNDLE_ID || config.APPSTORE_BUNDLE_ID
    
    const header = {
        'alg': 'ES256',
        'kid': keyId,
        'typ': 'JWT'
    };
  
    const payload = {
        "iss": issuerId,
        "iat": now,
        "exp": expirationTime,
        "aud": 'appstoreconnect-v1',
        "bid": bundleId,
    };
  
    try {
    const t = jwt.sign(payload, privateKey, { header: header, algorithm: "ES256" });
        return t;
    } catch (error) {
        console.log("Error:" + error.message);
    }   
}

// fetchAppStoreConnectData(event) -> { name, download }
async function  fetchAppStoreConnectData(event)  {
    const config = useRuntimeConfig(event)
    const now = Math.round(new Date().getTime() / 1000);
    const expirationTime = now + 900;
    const accessToken = generateToken(now, expirationTime, config)
    const vendor = "91178647"

    // Get the current date
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 2);
    let formattedDate = currentDate.toISOString().split('T')[0];


    const responseLastMonth = await $fetch(`https://api.appstoreconnect.apple.com/v1/salesReports?filter[frequency]=DAILY&filter[reportDate]=${formattedDate}&filter[reportSubType]=SUMMARY&filter[reportType]=SALES&filter[vendorNumber]=${vendor}&filter[version]=1_0`, {
        headers: {
            Authorization: `Bearer `+ accessToken
        }
    });

    var decompressedData = pako.inflate(new Uint8Array(await responseLastMonth.arrayBuffer()), { to: 'string' });
    decompressedData = decompressedData.trim();

    var dataFromFileArray = decompressedData.split('\n');

    var resultsMap = [];

    for (var i = 1; i < dataFromFileArray.length; i++) {
        
        var lineDataFromFileArray = dataFromFileArray[i].split('\t');

        var excludedStrings = ["Monthly", "Yearly", "Lifetime", "Monatlich", "Developer", "Jährlich"];
        var shouldExclude = excludedStrings.some(str => lineDataFromFileArray[4].includes(str));

        var includeStrings = ["1", "1F", "1T", "F1"];
        var shouldIncludeProductTypeIdentifier = includeStrings.some(str => lineDataFromFileArray[6].includes(str));

        if (shouldExclude) {
            continue;
        } else {
            if (shouldIncludeProductTypeIdentifier) {
                resultsMap.push({ "name" : lineDataFromFileArray[4] , "download" : lineDataFromFileArray[7] })
            }
        }
    }

    
    const resultAppsData = resultsMap.reduce((acc, curr) => {
        const existingEntry = acc.find(entry => entry.name === curr.name);
    
        if (existingEntry) {
            existingEntry.download = String(parseInt(existingEntry.download) + parseInt(curr.download));
        } else {
        acc.push({ name: curr.name, download: curr.download });
        }
    
        return acc;
    }, []);

    return resultAppsData
}

// fetchData(event) -> { name, count }
async function fetchStrapiAppStoreConnectData(event) {
    const url = useRuntimeConfig(event).public.strapi.url
  try {
    const response = await axios.get('https://api.frederikkohler.de/api/app-store-connect?populate=*');
    
    if (response.status !== 200) {
      throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }

    return response.data.data.attributes.app;
  } catch (error) {
    console.error('Fehler beim Fetchen der Daten:', error);
    throw error;
  }
}

async function updateStrapiAppStoreConnectData(newPayload) {
    try {
      const response = await axios.put(`https://api.frederikkohler.de/api/app-store-connect`, {
        "data": {
            "app": newPayload
          }
      });
  
      if (response.status !== 200) {
        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
      }

      const postResponse = await axios.post('https://uptime.betterstack.com/api/v1/heartbeat/DwfKmSy5nA89KgDQn1zYCCcD', { });
  
      const updatedData = response.data;
      return updatedData;
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Daten:', error);
      throw error;
    }
};


export default defineEventHandler(async (event) => {

    let appstoreconnectData = await fetchAppStoreConnectData(event)
    let currentStrapiData = await fetchStrapiAppStoreConnectData(event)

    const newPayload = currentStrapiData.map(strapiItem => {
        const matchingAppstoreData = appstoreconnectData.find(appstoreItem => appstoreItem.name === strapiItem.name);
      
        if (matchingAppstoreData) {
          const newCount = parseInt(matchingAppstoreData.download) + strapiItem.count;
          
          return {
            ...strapiItem,
            count: newCount
          };
        }
      
        return strapiItem;
    });

    updateStrapiAppStoreConnectData(newPayload)

    // https://uptime.betterstack.com/api/v1/heartbeat/DwfKmSy5nA89KgDQn1zYCCcD

    return true
});