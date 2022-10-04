<script lang="ts" setup>
import { computed, toRef } from "vue";
import type { BreadType } from "../types/Toast";
const toastItemProps = defineProps<{
  type: BreadType;
}>();

const toastType = computed<string>(() => `var(--${toastItemProps.type})`);
</script>

<template>
  <li class="ToastItem">
    <slot name="text" />
  </li>
</template>

<style lang="scss" scoped>
.ToastItem {
  background-color: v-bind(toastType);
  padding: var(--toast-padding);
  border-radius: var(--radius-2);
  font-size: 1.5rem;
}
</style>
