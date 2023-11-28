<template>
    <div class="flex items-center gap-3 appstoreBadge">

        <span class="text-2xl fk-colored-text"><strong>{{ foundApp.download }}</strong></span>

        <div class="inner-wrapper">
            <span class="firstLine">downloads</span>
            <span class="secondLine">im {{ date.month }}</span>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        app: { type: String, default: "" }
    });

    const { data: appstore } = useFetch('/api/appstoreconnect')

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

     const date = computed(() => {
        if (appstore.value) {
            return appstore.value.date
        }  else {
            return { month: "Monat" , year: "0"};
        }
    });
</script>

<style lang="scss" scoped>
.appstoreBadge {
    background: white;
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
    max-height: 40px;

    .inner-wrapper {
        display: flex;
        flex-direction: column;
        .firstLine {
            font-size: 0.5rem;
            font-weight: 500;
            line-height: 0.7rem;
        }
        .secondLine {
            font-size: 1.0rem;
            font-weight: 600;
            line-height: 0.9rem;
        }
    }
}
</style>