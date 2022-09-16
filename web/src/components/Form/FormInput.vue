<script setup lang="ts">
import { ref } from 'vue';


const emit = defineEmits(['input']);
const value = ref();
function handleInput(event: Event) {
    emit('input', value);
}
</script>
<template>
    <input class="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500" v-model="value" @input="handleInput">
</template>