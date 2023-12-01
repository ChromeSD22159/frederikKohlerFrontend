<template>
    <div class="flex items-center gap-3 appstoreBadge">

        <span class="text-2xl fk-colored-text"><strong>{{ formatNumber(foundApp.count) }}</strong></span>

        <div class="inner-wrapper">
            <span class="firstLine uppercase">Total</span>
            <span class="secondLine uppercase">Downloads</span>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        app: { type: String, default: "" }
    });

    const { data: appstore } = useFetch('https://api.frederikkohler.de/api/app-store-connect?populate=*')

    const foundApp = computed(() => {
        if (appstore.value) {
            const app = appstore.value.data.attributes.app.filter((app) => app.name.includes(props.app))

            if (app[0]) {
                return app[0]
            }
        }  else {
            return { name: "" , download: "0"};
        }

        if (Object.keys(appstore.data).length === 0) {
           return { "id": 1, "__component": "global.app-store-connect", "name": "Name", "count": 0 }
        } else {
             const app = appstore.data.attributes.app.filter((app) => app.name.includes(props.app))
             console.log(app[0])
             if (app[0]) {
                return app[0]
            }
            console.log('Das Objekt ist nicht leer.');
        }
    });

   function formatNumber(num) {
    if (num >= 0 && num < 1000) {
        return num.toString();
    } else if (num >= 1000 && num < 1000000) {
        const formattedNum = (num / 1000).toFixed(1);
        return `${formattedNum}k`;
    } else {
        return 'N/A';
    }
    }
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
            font-size: 0.8rem;
            font-weight: 600;
            line-height: 0.9rem;
        }
    }
}
</style>


