<script lang="ts" setup>
import { computed, Ref, ref } from "vue";
import { useBEMClass } from "../composables/classNames";
import { useCSSMotion } from "../composables/motions";

const textInputProps = defineProps<{
  type: "number" | "text" | "color" | "date" | "password";
  inputValue: string;
}>();
const textInputEmits = defineEmits(["update:inputValue"]);
function emitInputValue(e: Event) {
  textInputEmits("update:inputValue", (e.target as HTMLInputElement).value);
}

const motion = useCSSMotion("150ms", "cubic-bezier(0.85, 0, 0.15, 1)");
const isFilled = computed<boolean>(
  () => textInputProps.inputValue.length !== 0
);
const placeholderClasses = useBEMClass(
  "TextInput__Placeholder",
  "Filled",
  isFilled
);
</script>

<template>
  <label class="TextInput">
    <input
      :type="type"
      class="TextInput__Input"
      @input="emitInputValue"
      :value="inputValue"
    />
    <span :class="placeholderClasses">
      <slot name="label"></slot>
    </span>
  </label>
</template>

<style lang="scss" scoped>
.TextInput {
  cursor: text;
  display: flex;
  align-items: center;
  position: relative;
  height: 4.6rem;
  &__Input {
    border: 1px solid var(--bg-300);
    border-radius: var(--radius-1);
    padding: 0 calc(var(--card-padding) + 0.4rem);
    width: 100%;
    height: 100%;
    font-size: 1.5rem;
    font-weight: 500;
    background-color: var(--bg-100);
    &:focus {
      border: 2px solid var(--theme-500);
      & + .TextInput__Placeholder {
        transform: translateY(-2.3rem);
        color: var(--theme-500);
        font-size: 1.1rem;
      }
    }
  }
  &__Placeholder {
    position: absolute;
    left: var(--card-padding);
    font-size: 1.3rem;
    background-color: var(--bg-100);
    padding: 0 0.4rem;
    transition: v-bind("motion.duration") v-bind("motion.easing");
    &--Filled {
      transform: translateY(-2.3rem);
      font-size: 1.1rem;
    }
  }
}

@media screen and (min-width: 1024px) {
  .TextInput {
    &__Input {
      &:focus {
        & + .TextInput__Placeholder {
          font-size: 1.3rem;
        }
      }
    }
    &__Placeholder {
      font-size: 1.4rem;
      &--Filled {
        font-size: 1.3rem;
      }
    }
  }
}
</style>
