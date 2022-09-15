
<script setup lang="ts">
import { onMounted, ref } from 'vue';

import GameBanner from '@/components/GameBanner.vue';
import CreateAdBanner from '@/components/CreateAdBanner.vue';

import logoImg from '/logo.svg';

const games = ref<Game[]>([]);

onMounted(async () => {
  fetch('http://localhost:3333/games')
    .then((response) => response.json())
    .then((data) => {
      games.value = data;
    }).catch(err => console.log(err));
});
</script>

<template>
  <div class="max-w-[1344px] mx-auto flex flex-col items-center my-20">
    <img :src="logoImg" alt="">
    <h1 class="text-6xl text-white font-black mt-20">Seu
      <span class="bg-nlw-gradient text-transparent bg-clip-text">duo</span> está aqui
    </h1>
    <div class="grid grid-cols-6 gap-6 mt-16">
      <template v-for="game in games" :key="game.id">
        <game-banner :banner-url="game.bannerUrl" :title="game.title" :count="game._count.ads" :id-game="game.id"/>
      </template>
    </div>
    <create-ad-banner />
  </div>
</template>
