<template>
    <div>
        <NuxtLayout name="single-row">
            <div class="flex flex-col gap-7 px-10">
                <PageHeadline headline="Page: 'apps'" :image="{}" />
            </div>
        </NuxtLayout>
    </div>
</template>


<style lang="scss" scoped>
    .page {
        padding: 2rem;
    }
</style>


<script setup>
    useSeoMeta({
        title: 'Freiberuflicher Web Designer & Software Entwickler',
        ogTitle: 'Freiberuflicher Web Designer & Software Entwickler',
        description: 'Suchen Sie Entwickler, UX/IX-Designer oder Hilfe bei Websites? Brauchen Sie Unterstützung bei Software Projekten oder bei Ihrer Website?',
        ogDescription: 'Suchen Sie Entwickler, UX/IX-Designer oder Hilfe bei Websites? Brauchen Sie Unterstützung bei Software Projekten oder bei Ihrer Website?',
        ogImage: 'https://frederikkohler.de/image.png',
        author: 'Frederik Kohler, Portfolio'
    })

     useHead({
        htmlAttrs: {
            lang: 'de'
        }
    })
</script>