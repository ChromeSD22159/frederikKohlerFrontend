<template>
    <div class="flex flex-col relative gap-10 lg:px-0 mx-auto" :class="isObjectNotEmpty(fullSize) ? 'max-w-5xl' : 'max-w-2xl flex-1'">
        <div class="flex flex-col gap-5">
            <h2 v-if="content.titel" class="text-xl md:text-xl xl:text-3xl line-break fk-colored-text antialiased tracking-wide font-sans">{{ content.titel }}</h2> 
            <Content :content="content.intro" /> 
        </div>

        <div v-for="(app, index) in content.apps" :key="app.id" :ref="`animateCta${index}`" :class="['flex', 'flex-col', 'mx-auto', 'gap-5', 'mx-auto']">
            <NuxtLink :to="`/app/${app.name.toLowerCase().replaceAll(' ', '-')}`" class="flex flex-col gap-7">
                <div>
                    <h3 class="text-xl md:text-xl xl:text-3xl line-break fk-colored-text antialiased tracking-wide font-sans">{{ app.name }}</h3>
                    <h4 class="text-sm antialiased tracking-wide font-sans text-accent">{{ app.subline }}</h4>
                </div>
              <ImageWithHover :image="app.image" :alt="app.subline" />
            </NuxtLink>
                <p class="antialiased">{{ app.description }}</p>

                <ul class="flex flex-row gap-5">
                    <li v-for="link in app.links" :key="link.id">
                        <ButtonCollection :link=link />
                    </li>
                </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    const { content, socialMedias, fullSize } = defineProps({
        content: { type: Object, default: () => {} },
        socialMedias: { type: Object, default: () => {} },
        fullSize: { type: Boolean, default: () => false },
    });
</script>

<style lang="scss" scoped>
    .cta-content {
        height: 100%;
        width: 100%;
    }

    .cta-button {
        position: sticky;
        right: 0;
        bottom: 2rem;
        display: block;
        cursor: pointer;
        width: 6rem;
        height: 6rem;
        //transform: scale(0.8);
        .cta-button-wrapper {
            padding: 0.5rem;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            background: rgba(255,255,255,0.1);
            border-radius: 4rem;
            a { 
                font-size: 1em;
                color: white;
                white-space: nowrap;
                padding: 0;
                opacity: 0;
                width: 0;
            }

            .icon-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                background: $highlight;
                border-radius: 100%;
                padding: 0.5rem;
                .icon {
                    width: 2rem;
                    height: 2rem;
                    svg {
                        fill: white;
                    }
                }
            }
            
        }
    }
</style>