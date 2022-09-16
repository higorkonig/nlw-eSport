<script setup lang="ts">
import { ref } from 'vue';


const props = defineProps({
    value: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
});

const emit = defineEmits(['update:value']);

const weekDays = ref<number[]>([])

function selectDay(day: number) {
    const daySelected = weekDays.value.indexOf(day)
    if (daySelected === -1) {
        weekDays.value.push(day);
    } else {
        weekDays.value.splice(daySelected, 1);
    }
    emit('update:value', day);
}

function checkDay(day: number) {
    return weekDays.value.indexOf(day) !== -1;
}

</script>
<template>
    <button type="button" class="w-8 h-8 rounded bg-zinc-900" :class="{'bg-violet-600': checkDay(value)}"
        @click="selectDay(value)" :title="title">{{label}}</button>
</template>