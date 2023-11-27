<template>
    <div>
        <div class="flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 stroke-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <p class="m-0" v-if="pending"> <strong>0x</strong> letzten Monat</p>
            <p class="m-0" v-else> <strong>{{ foundApp.download }}x</strong> letzten Monat</p>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        app: { type: String, default: "" }
    });

    const { pending, data: appstore} = useFetch('/api/appstoreconnect', {
        lazy: true
    })

    const foundApp = computed(() => {
        if (appstore.value) {
            const app = appstore.value.apps.filter((app) => app.name.includes(props.app))

            if (app[0]) {
                return app[0]
            }
        }  else {
            return { name: "" , download: "0"};
        }
    });
</script>

<style lang="scss" scoped>

</style>