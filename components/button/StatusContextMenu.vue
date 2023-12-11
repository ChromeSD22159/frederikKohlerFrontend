<template>
   <div>
        <div class="context-button" @click="toggleContextMenu">
            <slot name="btn" />

            <div class="context-menu" :class="{ 'active': isActive,}">
                <p><slot name="titel" /></p>
                <NuxtLink to="https://status.frederikkohler.de" target="_blank" class="whitespace-nowrap">
                   <slot name="context" />
                </NuxtLink>
            </div>
        </div>
   </div>
</template>


<script setup>
const isActive = ref(false)

const toggleContextMenu = () => {
    isActive.value = !isActive.value
}
</script>


<style scoped lang="scss">
.context-button {
    color: black;
    position: relative;
    user-select: none;
}

.context-menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    transition: all 0.3s linear;
    top: 0.8rem;
    right: 0px;
    z-index: 5;
    width: min-content;
    visibility:hidden;
    opacity:0;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(5px);
    border-radius: 0.5rem;
    &.active {
        visibility:visible;
        opacity:1;
    }

    p {
        font-size: 0.7rem;
        font-weight: 600;
        color: rgb(213, 213, 213);
        padding: 0.3rem 0.6rem;
        user-select: none;
        margin: 0;
    }

    a {
        color: rgb(213, 213, 213);
        font-size: 0.6rem;
        font-weight: 400;
        letter-spacing: 0.02rem;
        padding: 0.3rem 0.6rem;
        user-select: none;
        transition: all 0.150s linear;
        &:hover {
            background: rgba(255,255,255,0.10);
        }
        &:active {
            background: rgba(255,255,255,0.15);
        }
        &:first-child{
            border-radius: 0.5rem 0.5rem 0 0;
        }
        &:last-child {
            border-radius: 0 0 0.5rem 0.5rem;
        }
    }
}
</style>