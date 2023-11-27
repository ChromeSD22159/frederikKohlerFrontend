import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
const now = Math.round(new Date().getTime() / 1000);
const expirationTime = now + 900;
import pako from 'pako';

function generateToken(config) {
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

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)

    const accessToken = generateToken(config)
    const vendor = "91178647"

    var datetime = new Date();
    datetime.setUTCDate(datetime.getUTCDate() - (datetime.getUTCHours() < 15 ? 2 : 1));    
    const year = datetime.getUTCFullYear();
    let month = datetime.getUTCMonth() + 1; 
    
    month = (month - 1 + 11) % 12 + 1;

    const previousMonth = `${year}-${String(month).padStart(2, '0')}`;
    const printedPreviousMonth = `${String(month).padStart(2, '0')}.${year}`;

    const responseLastMonth = await $fetch(`https://api.appstoreconnect.apple.com/v1/salesReports?filter[frequency]=MONTHLY&filter[reportDate]=${previousMonth}&filter[reportSubType]=SUMMARY&filter[reportType]=SALES&filter[vendorNumber]=${vendor}&filter[version]=1_0`, {
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

    return {
        date: printedPreviousMonth,
        token: accessToken,
        apps: resultAppsData
    }

});