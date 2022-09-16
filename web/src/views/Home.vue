
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";

import GameBanner from '@/components/GameBanner.vue';
import CreateAdBanner from '@/components/CreateAdBanner.vue';

import logoImg from '/logo.svg';

const modules = [Autoplay, Navigation];

const games = ref<Game[]>([]);

function getGames() {
  axios.get('https://api2.immagino.dev/games')
    .then(response => {
      games.value = response.data;
    }).catch(err => console.log(err));
}
onMounted(async () => {
  getGames();
});
</script>

<template>
  <div class="max-w-[1344px] mx-auto flex flex-col items-center my-20">
    <img :src="logoImg" alt="">
    <h1 class="text-6xl text-white font-black mt-10 mb-5">Seu
      <span class="bg-nlw-gradient text-transparent bg-clip-text">duo</span> está aqui
    </h1>
    <swiper :spaceBetween="30" :loop="true" :slidesPerView="5" :loopFillGroupWithBlank="true" :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }" :pagination="{
      clickable: true,
    }" :modules="modules" class="grid grid-cols-6 gap-6 mt-16">
      <swiper-slide v-for="(game, index) in games" :key="game.id">
        <game-banner :banner-url="game.bannerUrl" :title="game.title" :count="game._count.ads" :id-game="game.id" />
      </swiper-slide>
    </swiper>
    <create-ad-banner @update:games="getGames" />
  </div>
</template>
<style>

</style>
