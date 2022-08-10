<script lang="ts" setup>
import { ImageFileName } from "../types/MediaExtension";
import { useStorageMedia } from "../composables/firebase";
import { computed, Ref, ref } from "vue";
import { CardElementRoot } from "../types/ElementRoot";

const animePosterProps = defineProps<{
  src: `${string}${ImageFileName}`;
  alt: string;
  rootType: CardElementRoot;
}>();

const { imgURL: fireSrc } = useStorageMedia(animePosterProps.src);

const imgLoaded: Ref<boolean> = ref(false);
function onImgLoad() {
  imgLoaded.value = true;
}
const animePosterClasses = computed(() => [
  "loading-target",
  "AnimePoster",
  { "AnimePoster--Loaded": imgLoaded.value },
]);
</script>

<template>
  <component :is="rootType" :class="animePosterClasses">
    <img :src="fireSrc" :alt="alt" @load="onImgLoad" />
  </component>
</template>

<style lang="scss" scoped>
.AnimePoster {
  margin-right: 1rem;
  overflow: hidden;
  img {
    opacity: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 150ms ease-out;
  }
  &--Loaded {
    img {
      opacity: 1;
    }
  }
}
</style>
