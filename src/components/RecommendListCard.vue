<script lang="ts" setup>
import type { CardElementRoot } from "../types/ElementRoot";
const animeListCardProps = defineProps<{
  rootType: CardElementRoot;
}>();
</script>

<template>
  <component :is="rootType"></component>
</template>
