<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import CardAds from '@/components/CardAds.vue';
import DialogModal from '@/components/DialogModal.vue';
import axios from 'axios';

const { params, query } = useRoute();
const { go } = useRouter();

const ads = ref<Ad[]>([]);
const discord = ref<string>('');
const bannerUrl = query.bannerUrl as string;

const isOpen = ref(false)

function backPage() {
    go(-1);
}

function closeModal() {
    isOpen.value = false
}
function openModal(id: string) {
    axios.get(`http://localhost:3333/ads/${id}/discord`)
        .then(response => {
            discord.value = response.data.discord;
        });

    isOpen.value = true
}

onMounted(async () => {
    axios.get(`http://localhost:3333/games/${params.id}/ads`)
        .then(response => {
            ads.value = response.data;
        }).catch(err => console.log(err));
});
</script>

<template>
    <div class="max-w-[1344px] mx-auto flex flex-col items-center my-20">
        <div>
            <button class="text-white flex items-center gap-2 mb-2 hover:text-violet-500 hover:duration-300"
                @click="backPage()">
                <ph-arrow-u-up-left :size="32" /> voltar
            </button>
        </div>
        <div class="relative rounded-lg overflow-hidden">
            <img :src="bannerUrl" alt="">
            <div class="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <strong class="font-bold text-white text-center text-2xl block">{{ query.title }}</strong>
                <span class="text-zinc-300 text-center block">{{ ads.length }} anúncios</span>
            </div>
        </div>
        <div class="grid grid-cols-4 gap-6 mt-5">
            <div v-if="ads.length == 0" class="col-span-4 mt-10">
                <h1 class="text-white text-3xl font-black text-center">Sem anúncios</h1>
            </div>
            <template v-for="ad in ads" :key="ad.id" v-else>
                <card-ads :name="ad.name" :years-playing="ad.yearsPlaying" :week-days="ad.weekDays"
                    :hours-start="ad.hourStart" :hours-end="ad.hourEnd" :use-voice-channel="ad.useVoiceChannel"
                    @conecte-player="openModal(ad.id)" />
            </template>
        </div>
        <dialog-modal :is-open="isOpen" @close-modal="closeModal" dialog-title="">
            <div class="flex justify-end">
                <button @click="closeModal">
                    <ph-x :size="24" class="text-zinc-500" />
                </button>
            </div>
            <div class="flex flex-col items-center">
                <ph-check-circle :size="64" class="text-green-500" />
                <span class="mt-6 mb-4 text-3xl font-black"> Let's play!</span>
                <span class="text-1xl text-zinc-400"> Agora é só começar a jogar!</span>
                <div class="text-center mt-5 mb-5">
                    <span class="mb-5 text-base font-semibold block">Adicione no Discord</span>
                    <span class="text-1xl rounded-lg text-white py-4 px-24 bg-zinc-900">{{discord}}</span>
                </div>
            </div>
        </dialog-modal>
    </div>
</template>