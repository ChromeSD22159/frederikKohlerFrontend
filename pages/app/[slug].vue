<template>
   <div>
    <NuxtLayout name="multi-row" :primarySticky="false" :secondarySticky="true">
        <template v-slot:primary>
             <div class="flex flex-col flex-1 mx-auto gap-10" ref="contentHeight">
                <!-- Intro / Hero -->
                <div class="flex flex-col gap-2">
                    <h1 class="text-xl md:text-xl xl:text-3xl line-break fk-colored-text antialiased tracking-wide font-sans"> {{ app.feature.titel }} </h1>
                    <h2 class="text-sm md:text-md xl:text-xl line-break text-gray-500 antialiased tracking-wide font-sans"> {{ app.feature.subtitle }} </h2>
                    <p>{{ app.feature.description }}</p>

                  
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <NuxtLink v-if="isNotNullOrUndefined(app.feature.badge.data) && isNotNullOrUndefined(app.feature.appstore)" :to="app.feature.appstore" >
                            <img 
                                :src="buildImageUrl(app.feature.badge.data.attributes.url)" 
                                :alt="`${app.seo.title} im AppStore`"
                                width="120"
                                height="40"
                            />
                            </NuxtLink>
                        </div>
                        <div class="flex justify-end sm:justify-start">
                            <ButtonAppStoreDownloadsTotal v-if="app.feature.titel.includes(`Country`)" app="Country"/>
                            <ButtonAppStoreDownloadsTotal v-if="['Amputierte', 'Pro', 'these'].some(str => app.feature.titel.includes(str))" app="Pro"/>
                        </div>
                    </div>
                    
                </div>
                <!-- Intro / Hero end -->

                <!-- Cards -->
                <div 
                    v-if="app.feature && app.feature.features && app.feature.features.length > 0" 
                    :class="{ 'flex': true, 'flex-col': true, 'gap-5': true, 'mb-10': isMobileViewport || isContentBiggerAsViewport }"
                >
                    <div v-for="(feature, index) in app.feature.features" :key="feature.id" @click="changeImage(index, feature.image )">
                            <PageCard
                            :content="feature"
                            :isActive="currentCard === index"
                            :class="'max-w-2xl flex-1 mx-auto'"
                            :isMobil="isMobileViewport"
                        />
                    </div>
                    
                </div>
                <!-- Cards -->

                <PageFoot v-if="isMobileViewport"/>
            </div>
        </template>
        
        <template v-slot:secondary v-if="!isMobileViewport">
            <div class="h-full mx-auto my-auto flex flex-col justify-between">

                <div></div>

                <Transition name="bounce" mode="out-in">
                    <NuxtImg 
                    :key="currentImage" 
                    :src="currentImage"
                    loading="lazy"
                    class="image"
                    :alt="currentImageAlt"
                    />
                     <!-- style="max-height: 480px" -->
                </Transition>

                <PageFoot />
            </div>
        </template>
    </NuxtLayout>
</div>
</template>


<style lang="scss" scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  40% {
    filter: blur(10px);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    filter: blur(0);
    transform: scale(1);
  }
}
</style>

<script setup> 
import { onBeforeMount, onMounted } from "vue";

    const router = useRouter();
    const StrapiUrl = useStrapiMedia()    
    const { findOne } = useStrapi();
    const { slug } = useRoute().params;

    var currentImage = ref("images/mockImages/screenshot-applewatch.webp");
    var currentImageAlt = ref("Frederik Alt Text");
    var currentCard = ref(0);

    const buildImageUrl = (url) => `${StrapiUrl}${url}`;

    const changeImage = (index, url) => {        
        currentCard.value = index

         if (isNotNullOrUndefined(url)) {
            currentImage.value = buildImageUrl(url.data.attributes.url)
            currentImageAlt.value = url.data.attributes.caption
        }
    };

    const { data: app } = await useAsyncData(`${slug}-appdata`, async () => {
        try {
            const data = await findOne('apps', { 
                    filters: {
                        localizations: {
                            slug: {
                                $eq: slug
                            },
                        },
                    },
                    fields: ['name', 'slug'],
                    populate: {
                        localizations: {
                            fields: ['name', 'slug', 'appStoreID', 'deepLink'],
                            populate: {
                                seo: {
                                    fields: ['title', 'description', 'author'],
                                },
                                features: {
                                    fields: ['titel','subtitle', 'description', 'appstore'],
                                    populate: {
                                        features: {
                                            fields: ['titel', 'text'],
                                            populate: {
                                                icon: {
                                                    fields: ['name', 'alternativeText', 'caption', 'url'],
                                                },
                                                image: {
                                                    fields: ['name', 'alternativeText', 'caption', 'url'],
                                                }
                                            },
                                        },
                                        badge: {
                                            fields: ['name', 'alternativeText', 'url'],
                                        }
                                    }
                                }
                            },
                        },
                    },
            })

            const transformData = (rawData) => {
               
                return rawData.data.map(item => {
                    const seo = item.attributes.localizations.data.map(localizedData => {
                        return localizedData.attributes.seo.map(seoItem => seoItem);
                    }).flat();

                     const features = item.attributes.localizations.data.map(localizedData => {
                        return localizedData.attributes.features.map(featureItem => featureItem);
                    }).flat();

                    const other = item.attributes.localizations.data.map(localizedData => {
                        return localizedData.attributes
                    }).flat();

                    const transformedData = {
                        seo: seo.length > 0 ? seo[0] : null,
                        feature: features.length > 0 ? features[0] : null,
                        other: other.length > 0 ? other[0] : null,
                    };

                    return transformedData
                });
            };

            const transformed = transformData(data)

            if (transformed.length >= 0) {
                return transformed[0];
            } else {
                return null
            }
        } catch (err) {
            console.error('Fehler bei der Datenabfrage:', err);
            throw err;
        }
    })

    const head = useHead({
        htmlAttrs: {
            lang: 'de'
        },
        link: [{ rel: 'canonical', href: `https://www.frederikkohler.de${useRoute().fullPath}` }],
        meta: [
            { name: 'apple-itunes-app', content: `app-id=${app.value.other.appStoreID}, app-argument=${app.value.other.deepLink}statistic` },
            { name: 'al:ios:url', content: `${app.value.other.deepLink}statistic` },
            { name: 'al:ios:app_name', content: `${app.value.other.deepLink}` },
            { name: 'al:ios:app_store_id', content: `${app.value.other.appStoreID}` },
        ]
    });

    const seo =  useSeoMeta({
        title:          `${app.value.seo.title} App von ${app.value.seo.author}`,
        ogTitle:        `${app.value.seo.title} App von ${app.value.seo.author}`,
        description:    `${app.value.seo.description}`,
        ogDescription:  `${app.value.seo.description}`,
        //ogImage:        'https://frederikkohler.de/image.png',
        author:         `${app.value.seo.author}`
    });


    const viewportWidth = ref(0);
    const viewportHeight = ref(0);
    const isMobileViewport = ref(viewportWidth.value <= 1024);
    const contentHeight = ref(null);
    const isContentBiggerAsViewport = ref(isContentHeigherAsViewport(getElementSize(contentHeight), viewportHeight.value));

    const updateViewportWidth = (window) => {
        viewportWidth.value = window.innerWidth || document.documentElement.clientWidth;
        isMobileViewport.value = viewportWidth.value <= 1024;
        isContentBiggerAsViewport.value = isContentHeigherAsViewport(getElementSize(contentHeight).height, window.innerHeight || document.documentElement.clientHeight)
    };

    watchEffect(() => {
        if (app.value && app.value.feature && app.value.feature.features && app.value.feature.features.length > 0) {
            const url = app.value.feature.features[0].image.data.attributes.url;
            changeImage(0, { data: { attributes: { url } } });
        }
    });

    onMounted(() => {
        window.addEventListener('resize', updateViewportWidth(window));
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateViewportWidth(window));
    });
</script>