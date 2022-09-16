<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { Switch } from '@headlessui/vue'
import DialogModal from './DialogModal.vue';
import FormInput from '@/components/Form/FormInput.vue';
import SelectInput from './Form/SelectInput.vue';
import CheckInput from './Form/CheckInput.vue';

import { useToast } from "vue-toastification";

const toast = useToast();

const isOpen = ref(false)

const games = ref<Game[]>([]);

const name = ref();
const yearsPlaying = ref();
const discord = ref();
const hourStart = ref();
const hourEnd = ref();
const gameSelected = ref<Game>();
const weekDays = ref<number[]>([])
const useVoiceChannel = ref(false);

function closeModal() {
    weekDays.value = []
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}

function updateWeek(week: number) {
    const daySelected = weekDays.value.indexOf(week)
    if (daySelected === -1) {
        weekDays.value.push(week);
    } else {
        weekDays.value.splice(daySelected, 1);
    }
}

function updateGame(game: Game) {
    gameSelected.value = game;
}

function validateData(data: any) {
    if (!gameSelected.value) {
        toast.error('Jogo é obrigatório');
        return false;
    }
    if (!name.value) {
        toast.error('Nome é obrigatório');
        return false;
    }
    if (!yearsPlaying.value) {
        toast.error('Anos de experiência é obrigatório');
        return false;
    }
    if (!discord.value) {
        toast.error('Discord é obrigatório');
        return false;
    }
    if (weekDays.value.length === 0) {
        toast.error('Dias da semana é obrigatório');
        return false;
    }
    if (!hourStart.value) {
        toast.error('Horário de início é obrigatório');
        return false;
    }
    if (!hourEnd.value) {
        toast.error('Horário de término é obrigatório');
        return false;
    }

    return true;
}

async function getGames() {
    const response = await axios.get('http://localhost:3333/games');
    games.value = response.data;
    gameSelected.value = response.data[0];

}
async function onSubmit() {
    const data = {
        name: name.value,
        yearsPlaying: Number(yearsPlaying.value),
        discord: discord.value,
        hourStart: hourStart.value,
        hourEnd: hourEnd.value,
        gameSelected: gameSelected.value?.id,
        weekDays: weekDays.value,
        useVoiceChannel: useVoiceChannel.value
    }

    if (!validateData(data)) {
        return;
    }
    try {
        const response = axios.post(`http://api2.immagino.dev/games/${gameSelected.value?.id}/ads`, data);
        closeModal();
        toast.success("Anúncio criado com sucesso", {
            timeout: 3000
        });
    } catch (error) {
        toast.error("Ops, parece que aconteceu algum problema interno :S", {
            timeout: 3000
        });
        console.log(error)
    }
}

onMounted(async () => {
    getGames();
});

</script>

<template>
    <div class="pt-1 bg-nlw-gradient self-stretch rounded-lg  mt-8 overflow-hidden">
        <div class="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
            <div>
                <strong class="text-2xl text-white font-black block">Não encontrou seu duo</strong>
                <span class="text-zinc-400 block">Publique anúncio para encontrar novos players</span>
            </div>
            <button
                class="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white  rounded flex items-center gap-3 hover:duration-300"
                @click="openModal">
                <ph-magnifying-glass-plus :size="24" class="" />Publicar anúncio
            </button>
        </div>
    </div>

    <dialog-modal :is-open="isOpen" @close-modal="closeModal" dialog-title="Publique seu anúncio">
        <form class="mt-8 flex flex-col gap-4" @submit.prevent="onSubmit()">
            <div class="flex flex-col gap-2">
                <label for="game" class="font-semibold">Qual o game?</label>
                <select-input :games="games" @update:selected-game="updateGame" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="name" class="font-semibold">Seu nome (ou nickname)?</label>
                <form-input id="name" v-model="name" placeholder="Como te chamam no game?" />
            </div>
            <div class="grid grid-cols-2 gap-6">
                <div class="flex flex-col gap-4">
                    <label for="yearsPlaying" class="font-semibold">Joga há quantos anos?</label>
                    <form-input id="yearsPlaying" type="number" v-model="yearsPlaying"
                        placeholder="Tudo bem ser ZERO" />
                </div>
                <div class="flex flex-col gap-4">
                    <label for="discord" class="font-semibold">Qual seu discord?</label>
                    <form-input id="discord" v-model="discord" placeholder="Usuario#0000" />
                </div>
            </div>
            <div class="grid grid-cols-2 gap-6">
                <div class="flex flex-col gap-4">
                    <label for="weekDays">Quando custuma jogar?</label>
                    <div class="flex gap-1">
                        <check-input :value="0" title="Domingo" label="D" @update:value="updateWeek" />
                        <check-input :value="1" title="Segunda" label="S" @update:value="updateWeek" />
                        <check-input :value="2" title="Terça" label="T" @update:value="updateWeek" />
                        <check-input :value="3" title="Quarta" label="Q" @update:value="updateWeek" />
                        <check-input :value="4" title="Quinta" label="Q" @update:value="updateWeek" />
                        <check-input :value="5" title="Sexta" label="S" @update:value="updateWeek" />
                        <check-input :value="6" title="Sábado" label="S" @update:value="updateWeek" />
                    </div>
                </div>
                <div class="flex flex-col gap-2 flex-1">
                    <label>Qual horario do dia?</label>
                    <div class="grid grid-cols-2 gap-2">
                        <form-input type="time" v-model="hourStart" placeholder="De" />
                        <form-input type="time" v-model="hourEnd" placeholder="Até" />
                    </div>
                </div>
            </div>

            <div class="mt-2 flex gap-2 text-sm items-center">
                <Switch v-model="useVoiceChannel" :class="useVoiceChannel ? 'bg-emerald-400' : 'bg-zinc-900'"
                    class="relative inline-flex h-6 w-11 items-center rounded-full">
                    <span class="sr-only">Custumo me conectar no chat de voz</span>
                    <span :class="useVoiceChannel ? 'translate-x-6' : 'translate-x-1'"
                        class="inline-block h-4 w-4 transform rounded-full bg-white transition" />
                </Switch><span>Custumo me conectar no chat de voz</span>
            </div>
            <footer class="mt-5 flex justify-end gap-4">
                <button type="button"
                    class="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 hover:duration-300"
                    @click="closeModal">Cancelar</button>
                <button type="submit"
                    class="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 hover:duration-300">
                    <ph-game-controller :size="24" /> Encontrar duo
                </button>
            </footer>
        </form>
    </dialog-modal>

</template>