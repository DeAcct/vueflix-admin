<script lang="ts" setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useA11y } from "../store/accessibility";

const hamburgerButtonProps = defineProps<{
  isOpen: boolean;
}>();
const hamburgerButtonClasses = computed(() => [
  "HamburgerButton",
  { "HamburgerButton--Opened": hamburgerButtonProps.isOpen },
]);

const a11yStore = useA11y();
const { reduceMotion } = storeToRefs(a11yStore);
const transition = computed<{ time: string; easing: string }>(() =>
  reduceMotion.value
    ? { time: "none", easing: "" }
    : { time: "150ms", easing: "cubic-bezier(0.85, 0, 0.15, 1)" }
);
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
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 50%;
  .line {
    width: 1.8rem;
    height: 0.2rem;
    background-color: var(--bg-900);
    transition: v-bind("transition.time") v-bind("transition.easing");
  }
  &--Opened {
    justify-content: center;
    top: 2rem;
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
