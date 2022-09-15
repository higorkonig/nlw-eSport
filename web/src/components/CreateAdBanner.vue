<script setup lang="ts">

import DialogModal from './DialogModal.vue';

import FormInput from '@/components/Form/FormInput.vue';

import { ref } from 'vue';

const isOpen = ref(false)

function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}


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
        <form class="mt-8 flex flex-col gap-4">
            <div class="flex flex-col gap-2">
                <label for="game" class="font-semibold">Qual o game?</label>
                <form-input id="game" placeholder="Selecione o game que deseja jogar" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="name" class="font-semibold">Seu nome (ou nickname)?</label>
                <form-input id="name" placeholder="Como te chamam no game?" />
            </div>
            <div class="grid grid-cols-2 gap-6">
                <div class="flex flex-col gap-4">
                    <label for="yearsPlaying" class="font-semibold">Joga há quantos anos?</label>
                    <form-input id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                </div>
                <div class="flex flex-col gap-4">
                    <label for="discord" class="font-semibold">Qual seu discord?</label>
                    <form-input id="discord" placeholder="Usuario#0000" />
                </div>
            </div>
            <div class="grid grid-cols-2 gap-6">
                <div class="flex flex-col gap-4">
                    <label for="weekDays">Quando custuma jogar?</label>
                    <div class="flex gap-1">
                        <button class="w-8 h-8 rounded bg-zinc-900 " title="Domingo">D</button>
                        <button class="w-8 h-8 rounded bg-zinc-900 " title="Segunda">S</button>
                        <button class="w-8 h-8 rounded bg-zinc-900 " title="Terça">T</button>
                        <button class="w-8 h-8 rounded bg-zinc-900 " title="Quarta">Q</button>
                        <button class="w-8 h-8 rounded bg-zinc-900 " title="Quinta">Q</button>
                        <button class="w-8 h-8 rounded bg-zinc-900 " title="Sexta">S</button>
                        <button class="w-8 h-8 rounded bg-zinc-900 " title="Sábado">S</button>
                    </div>
                </div>
                <div class="flex flex-col gap-2 flex-1">
                    <label for="hourStart">Qual horario do dia?</label>
                    <div class="grid grid-cols-2 gap-2">
                        <form-input id="hoursStart" type="time" placeholder="De" />
                        <form-input id="hoursEnd" type="time" placeholder="Até" />
                    </div>
                </div>
            </div>

            <div class="mt-2 flex gap-2 text-sm ">
                <form-input type="checkbox" id="useVoiceChannel" />
                Custumo me conectar no chat de voz
            </div>
        </form>

        <footer class="mt-4 flex justify-end gap-4">
            <button class="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 hover:duration-300" 
                @click="closeModal">Cancelar</button>
            <button type="submit"
                class="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 hover:duration-300">
                <ph-game-controller :size="24" /> Encontrar duo
            </button>
        </footer>
    </dialog-modal>

</template>