<script setup lang="ts">
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue';

defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    dialogTitle: {
        type: String,
        required: false
    }
})
const emit = defineEmits(['closeModal']);

function closeModal() {
    emit('closeModal', true);
}
</script>

<template>
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
                                {{ dialogTitle }}
                            </DialogTitle>
                            <slot />
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>