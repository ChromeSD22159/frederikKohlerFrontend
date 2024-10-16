<template>
    <div>
        <NuxtLayout name="multi-row" :primarySticky="true" :secondarySticky="false">
            <template v-slot:primary> <!-- primary slot  -->

                <div v-for="primaryData in site.primary" :key="primaryData.id" :component=primaryData.component >
                    <component :is="loadComponent(primaryData.component)" :content="primaryData" :socialMedias="socialMedias" fullSize=""/>
                </div>
            </template>
            
            <template v-slot:secondary> <!--  secondary slot  -->
                <div v-if="site.secondary !== null"> 
                    <div v-for="secondaryData in site.secondary" :key="secondaryData.id" :component=secondaryData.component>
                        <component :is="loadComponent(secondaryData.component)" :content="secondaryData" :socialMedias="socialMedias" fullSize=""/>
                    </div>

                    <PageFoot padding="false"/>
                </div>
            </template>
        </NuxtLayout>
    </div>
</template>

<style lang="scss" scoped>

    .overlay::before {
        background-color: #0c0e11;
        content: ""; // ::before and ::after both require content
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 100%;
        z-index: 0;
    }
</style>

<script setup lang="ts">
    import { defineProps, defineAsyncComponent } from 'vue';
    
    const StrapiUrl = useStrapiUrl()
    const { findOne } = useStrapi();
    const { slug } = useRoute().params;
    const viewportWidth = ref(0);
    const isMobileViewport = ref(viewportWidth.value <= 1024);

    const { data: socialMedias } = await useAsyncData('social-medias', () => $fetch(StrapiUrl + '/social-medias?populate[socialMedia][populate]=*'), {
        transform: (data: any) => {

            if (data.data) {
                const socialMedia = data.data.map(  (socialMedia: any) => socialMedia.attributes.socialMedia.map((sm: any) => sm.links ).flat() ).flat();

                return socialMedia
            } else {
                return null
            }

        }
    })

    const { data: site } = await useAsyncData('page', 
        () => findOne('pages', { 
                filters: {
                    slug: { $eq: "home" },
                },
        }), {
            transform: (data: any) => {
                if (data.data && data.data.length > 0) {
                    const primary = data.data.map(  (primary: any) => primary.attributes.primaryChild.map((item: any) => item ).flat() ).flat();
                    const secondary = data.data.map(  (primary: any) => primary.attributes.secondaryChild.map((item: any) => item ).flat() ).flat();
                    return { primary: primary.length > 0 ? primary : null, secondary: secondary.length > 0 ? secondary : null }
                } else {
                    return null;
                }
            }
        }
    )

    const loadComponent = (componentName: string) => defineAsyncComponent(() => import(`@/components/section/${componentName}.vue`));
   
    const updateViewportWidth = (window) => {
        viewportWidth.value = window.innerWidth || document.documentElement.clientWidth;
        isMobileViewport.value = viewportWidth.value <= 1024;
    };

    onMounted(() => {
        updateViewportWidth(window);

        const loadSeoMeta = useSeoMeta({
            title: 'Freiberuflicher Web Designer & Software Entwickler',
            ogTitle: 'Freiberuflicher Web Designer & Software Entwickler',
            description: 'Suchen Sie Entwickler, UX/IX-Designer oder Hilfe bei Websites? Brauchen Sie Unterstützung bei Software Projekten oder bei Ihrer Website?',
            ogDescription: 'Suchen Sie Entwickler, UX/IX-Designer oder Hilfe bei Websites? Brauchen Sie Unterstützung bei Software Projekten oder bei Ihrer Website?',
            ogImage: 'https://frederikkohler.de/image.png',
            author: 'Frederik Kohler, Portfolio'
        })

        const loadHead = useHead({
            htmlAttrs: {
                lang: 'de'
            },
            link: [{ rel: 'canonical', href: `https://www.frederikkohler.de${useRoute().fullPath}` }],
        })

        window.addEventListener('resize', updateViewportWidth);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateViewportWidth);
    });
    /* Sticky >= large */
</script>

/* ALT
Als Mediengestalter digital und print sowie erfahrener iOS- und Webentwickler habe ich fünf umfassende Apps entwickelt und erfolgreich im App Store veröffentlicht. Meine Expertise erstreckt sich über die Zusammenarbeit in agilen Teams, die Integration verschiedener Methoden und Designmuster sowie die Implementierung sowohl nativer als auch Drittanbieter-Frameworks.

Neben meiner Rolle als Entwickler war ich maßgeblich an der Konzeption von Geschäftsmodellen beteiligt, habe ansprechendes UI/UX-Design umgesetzt und die Erstellung von RESTful-APIs sowie SQL-Abfragen gemeistert. Mit drei Apps im App Store und umfassender Erfahrung in Technologien wie WordPress, Nuxt, Strapi und Tailwind stehe ich für kreative Lösungen und innovative Entwicklung.

Deine Projekte: Lassen Sie uns gemeinsam Ihre Vision Wirklichkeit werden lassen. Von der ersten Idee über das Design bis hin zur technischen Umsetzung stehe ich Ihnen als erfahrener Partner zur Seite.
*/


/* NEU

Als erfahrener Fullstack- und Mobile Developer habe ich bereits mehrere Apps erfolgreich im Google Play Store und Apple App Store veröffentlicht. Meine Expertise reicht von der Entwicklung nativer Apps bis hin zur Integration von Backend-Systemen und RESTful APIs. Ich arbeite regelmäßig in agilen Teams und nutze moderne Designmuster, um ansprechende Benutzeroberflächen und leistungsstarke Anwendungen zu entwickeln.

Gemeinsam können wir Ihre Ideen von der Konzeption bis zur technischen Umsetzung realisieren. Mit meiner Erfahrung stehe ich Ihnen als zuverlässiger Partner für die Entwicklung innovativer digitaler Lösungen zur Seite.
*/