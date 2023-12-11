<template>
    <div class="flex items-center gap-3 appstoreBadge">

        <span class="text-2xl fk-colored-text"><strong class="counter">0</strong></span>

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

    let AnimationCount = 0

    const AnimationDuration = 700
    const AnimationInterval =100

    const { data: appstore } = useFetch('https://api.frederikkohler.de/api/app-store-connect?populate=*')

    const foundApp = computed(() => {
        if (!appstore.value || !appstore.value.data.attributes.app) {
            return { name: "", download: "0" };
        }

        const app = appstore.value.data.attributes.app.find(app => app.name.includes(props.app));

        return app || { name: "", download: "0" };
    });

    let counterStartValue;

    const updateCounter = (num, durationCount, intervalCount) => {
        const K = 1000;
        const M = K * K;
        const B = M * K;
        const T = B * K;

        const formatDownloadCount = downloads => {
            if (downloads < K) return downloads.toString();
            if (downloads < M) return (downloads / K).toFixed(1) + 'k';
            if (downloads < B) return (downloads / M).toFixed(0) + 'Mio';
            if (downloads < T) return (downloads / B).toFixed(0) + 'Mrd';
            return '1t+';
        };

        const startValue = '1'.repeat(num.toString().length);
        const parsedStartValue = parseInt(startValue);

        counterStartValue.innerHTML = formatDownloadCount(startValue);

        const countUp = () => {
            const randomNumber = Math.floor(Math.random() * (num - parsedStartValue + 1) + parsedStartValue);
            counterStartValue.innerHTML = formatDownloadCount(randomNumber);
        };

        let interval = setInterval(countUp, intervalCount);

        setTimeout(() => {
            clearInterval(interval);
            counterStartValue.innerHTML = formatDownloadCount(num);
        }, durationCount);
    }

    onMounted(() => {
        counterStartValue = document.querySelector(".counter");

        const appstoreBadgeObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && AnimationCount === 0) {
                    updateCounter(foundApp.value.count, AnimationDuration, AnimationInterval);
                    AnimationCount++
                }
            });
        }, { rootMargin: "0px" });

        const appstoreBadges = document.querySelectorAll(".appstoreBadge");
        appstoreBadges.forEach(appstoreBadge => appstoreBadgeObserver.observe(appstoreBadge));
    });

    onUnmounted(() => AnimationCount = 0)
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