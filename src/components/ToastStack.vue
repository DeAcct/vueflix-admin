<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useToast } from "../store/toast";
import ToastItem from "./ToastItem.vue";

const toastStore = useToast();
const { toasts } = storeToRefs(toastStore);
</script>

<template>
  <TransitionGroup name="Toast" tag="ul" class="ToastStack">
    <ToastItem v-for="toast in toasts" :type="toast.type" :key="toast.text">
      <template #text>{{ toast.text }}</template>
    </ToastItem>
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.ToastStack {
  display: flex;
  flex-direction: column;
}

.Toast-enter-active,
.Toast-leave-active {
  transition: all 0.5s ease;
}
.Toast-enter-from,
.Toast-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
