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
    },
    idGame: {
        type: String,
        required: true
    }
});
</script>
<template>
    <router-link :to="{name: 'list.ads', params: { id: idGame }, query: { title: title, bannerUrl: bannerUrl }}"
        class="relative rounded-lg overflow-hidden hover:scale-105 hover:duration-300">
        <img :src="bannerUrl" alt="">
        <div class="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong class="font-bold text-white block">{{ title }}</strong>
            <span class="text-zinc-300 block">{{ count }} anúncios</span>
        </div>
    </router-link>
</template>