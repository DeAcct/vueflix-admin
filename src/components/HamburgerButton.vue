<script lang="ts" setup>
import { computed } from "vue";

const hamburgerButtonProps = defineProps<{
  isOpen: boolean;
}>();
const hamburgerButtonClasses = computed(() => [
  "HamburgerButton",
  { "HamburgerButton--Opened": hamburgerButtonProps.isOpen },
]);
</script>

<template>
  <button :class="hamburgerButtonClasses">
    <span class="blind">사이드 메뉴 {{ isOpen ? "닫기" : "열기" }}</span>
    <span class="line line--left"></span>
    <span class="line line--mid"></span>
    <span class="line line--right"></span>
  </button>
</template>

<style lang="scss" scoped>
.HamburgerButton {
  position: fixed;
  z-index: 120;
  width: 3.6rem;
  height: 3.6rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .line {
    width: 1.8rem;
    height: 0.2rem;
    background-color: var(--bg-900);
    transition: 150ms ease-out;
  }
  &--Opened {
    justify-content: center;
    .line {
      position: absolute;
      &--left {
        transform: rotate(45deg);
      }
      &--mid {
        opacity: 0;
      }
      &--right {
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
