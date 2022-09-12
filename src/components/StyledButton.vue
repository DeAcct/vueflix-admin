<script lang="ts" setup>
import { toRef } from "vue";
import { useBEMClass } from "../composables/classNames";

const buttonProps = defineProps<{
  icon: boolean;
  iconPosition?: "left" | "right";
  root: "RouterLink" | "a" | "button";
}>();
const buttonClasses = useBEMClass(
  "StyledButton",
  "ContainIcon",
  toRef(buttonProps, "icon")
);
</script>

<template>
  <component :is="root" type="button" :class="buttonClasses">
    <i class="StyledButton__Icon" v-if="iconPosition === 'left'">
      <slot name="Icon" />
    </i>
    <span class="StyledButton__Text">
      <slot name="Text" />
    </span>
    <i class="StyledButton__Icon" v-if="iconPosition === 'right'">
      <slot name="Icon" />
    </i>
  </component>
</template>

<style lang="scss" scoped>
.StyledButton {
  width: fit-content;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-self: flex-end;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  background-color: var(--theme-500);

  &__Text {
    color: currentColor;
    font-size: 1.5rem;
    font-weight: 500;
  }
  &--ContainIcon {
    justify-content: space-between;
    *:last-child {
      width: 1.8rem;
      height: 1.8rem;
      margin-left: 3rem;
    }
  }
}
</style>
