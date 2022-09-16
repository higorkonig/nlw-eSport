<script setup lang="ts">
import { ref, watch } from 'vue'

import {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'

const props = defineProps({
    games: {
        type: Array<Game>,
        required: true
    },
})
const emit = defineEmits(['update:selectedGame']);

const selectedGame = ref(props.games[0]);

watch(selectedGame, (newValue, oldValue) => {
    emit('update:selectedGame', newValue);
})
</script>

<template>
    <Listbox v-model="selectedGame">
        <div class="relative mt-1">
            <ListboxButton
                class="relative w-full cursor-pointer rounded-lg bg-zinc-900 py-3 px-4 text-sm text-left shadow-md focus:outline-none sm:text-sm">
                <span class="block truncate">{{ selectedGame.title }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <ph-arrow-down :size="20" class="text-gray-400" />
                </span>
            </ListboxButton>

            <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ListboxOptions
                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-zinc-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm scrollbar-thin scrollbar-thumb-rounded  scrollbar-thumb-violet-600 scrollbar-track-zinc-900">
                    <ListboxOption v-slot="{ active, selected }" v-for="game in games" :key="game.id" :value="game"
                        as="template">
                        <li :class="[
                          active ? 'bg-violet-600 text-white' : 'text-white',
                          'relative cursor-pointer select-none py-2 pl-10 pr-4',
                        ]">
                            <span :class="[
                              selected ? 'font-medium' : 'font-normal',
                              'block truncate',
                            ]">{{ game.title }}</span>
                            <span v-if="selected"
                                class="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-900">
                                <ph-check :size="20" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>
  
  