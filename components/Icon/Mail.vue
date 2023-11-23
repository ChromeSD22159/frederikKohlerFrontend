<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" :class="classList">
       <path d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Zm8-7L4 8v10h16V8l-8 5Zm0-2l8-5H4l8 5ZM4 8V6v12V8Z"/>
    </svg>
</template>

<script setup lang="ts">
    defineProps({
        classList: { type: String, default: 'w-6 h-6 fill-white text-center mx-auto' }
    })
</script>