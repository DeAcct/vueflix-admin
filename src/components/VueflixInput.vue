<script lang="ts" setup>
defineProps<{
  modelValue: string;
  type: "text" | "password" | "number" | "date";
}>();
const vueflixInputEmits = defineEmits(["update:modelValue"]);
function setModelValue(e: Event) {
  vueflixInputEmits("update:modelValue", (e.target as HTMLInputElement).value);
}
</script>

<template>
  <label class="VueflixInput">
    <span class="VueflixInput__Placeholder">
      <slot name="label" />
    </span>
    <input
      :value="modelValue"
      :type="type"
      @input="setModelValue"
      class="VueflixInput__Field"
    />
  </label>
</template>

<style lang="scss" scoped>
.VueflixInput {
  position: relative;
  display: flex;
  align-items: center;
  &__Placeholder {
    position: absolute;
    left: var(--card-padding);
  }
  &__Field {
    display: flex;
    align-items: center;
    width: 100%;
    height: 4.6rem;
    padding: 0 var(--card-padding);
    background-color: transparent;
  }
}
</style>
