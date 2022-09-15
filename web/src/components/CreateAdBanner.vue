<script setup lang="ts">

import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue';

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
            <button class="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3"
                @click="openModal">
                <ph-magnifying-glass-plus :size="24" />Publicar anúncio
            </button>
        </div>
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>
            <div class="fixed inset-0 overflow-y-auto bg-black/60 ">
                <div class="flex min-h-full items-center justify-center p-6 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="min-w-min transform overflow-hidden rounded-2xl bg-[#2A2634] px-10 py-8 text-left align-middle shadow-xl transition-all text-white">
                            <DialogTitle as="h3" class="text-3xl font-black ">
                                Publique seu anúncio
                            </DialogTitle>
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
                                <button class="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600" @click="closeModal">Cancelar</button>
                                <button type="submit"
                                    class="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600">
                                    <ph-game-controller :size="24" /> Encontrar duo
                                </button>
                            </footer>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>