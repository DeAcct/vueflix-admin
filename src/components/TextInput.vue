<script lang="ts" setup>
defineProps<{
  type: "number" | "text" | "color" | "date";
}>();
</script>

<template>
  <label class="TextInput">
    <slot name="label"></slot>
    <input :type="type" />
  </label>
</template>
