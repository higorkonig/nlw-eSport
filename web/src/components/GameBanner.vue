<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    bannerUrl: {
        type: String,
        required: true
    }
});
</script>
<template>
    <a href="#" class="relative rounded-lg overflow-hidden">
        <img :src="bannerUrl" alt="">
        <div class="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong class="font-bold text-white block">{{ title }}</strong>
            <span class="text-zinc-300 block">{{ count }} anúncios</span>
        </div>
    </a>
</template>