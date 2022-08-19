<script lang="ts" setup>
import { toRef } from "vue";
import { useBEMClass } from "../composables/classNames";
import { useCSSMotion } from "../composables/motions";

const hamburgerButtonProps = defineProps<{
  isOpen: boolean;
}>();
const hamburgerButtonClass = useBEMClass(
  "HamburgerButton",
  "Opened",
  toRef(hamburgerButtonProps, "isOpen")
);

const motion = useCSSMotion("300ms", "cubic-bezier(0.85, 0, 0.15, 1)");
</script>

<template>
  <button :class="hamburgerButtonClass">
    <span class="blind">사이드 메뉴 {{ isOpen ? "닫기" : "열기" }}</span>
    <span class="line line--left"></span>
    <span class="line line--mid"></span>
    <span class="line line--right"></span>
  </button>
</template>

<style lang="scss" scoped>
.HamburgerButton {
  position: fixed;
  z-index: var(--hamburger-button-z-index);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 50%;
  border: 1px solid transparent;
  transition: v-bind("motion.duration") v-bind("motion.easing");
  .line {
    width: 1.8rem;
    height: 0.2rem;
    background-color: var(--bg-900);
    border-radius: 9999px;
    transition: v-bind("motion.duration") v-bind("motion.easing");
  }
  &--Opened {
    justify-content: center;
    top: 2rem;
    z-index: calc(var(--nav-z-index) + 1);
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
  &:focus {
    border-color: var(--theme-500);
  }
  &:active {
    background-color: var(--theme-200);
  }
}
</style>
