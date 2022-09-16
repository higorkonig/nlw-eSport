
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import GameBanner from '@/components/GameBanner.vue';
import CreateAdBanner from '@/components/CreateAdBanner.vue';

import logoImg from '/logo.svg';
import 'vue3-carousel/dist/carousel.css';

const games = ref<Game[]>([]);
const settings = {
  itemsToShow: 4.5,
  snapAlign: 'center',
}

onMounted(async () => {
  axios.get('http://localhost:3333/games')
    .then(response => {
      games.value = response.data;
    }).catch(err => console.log(err));
});
</script>

<template>
  <div class="max-w-[1344px] mx-auto flex flex-col items-center my-20">
    <img :src="logoImg" alt="">
    <h1 class="text-6xl text-white font-black mt-10 mb-5">Seu
      <span class="bg-nlw-gradient text-transparent bg-clip-text">duo</span> está aqui
    </h1>
    <carousel :settings="settings" :wrap-around="true" :autoplay="3000">
      <slide v-for="(game, index) in games" :key="game.id">
        <game-banner class="carousel__item" :banner-url="game.bannerUrl" :title="game.title" :count="game._count.ads"
          :id-game="game.id" />
      </slide>
      <template #addons>
        <navigation />
      </template>
    </carousel>
    <create-ad-banner />
  </div>
</template>
<style>

</style>
