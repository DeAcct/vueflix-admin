<script lang="ts" setup>
import { ImageFileName } from "../types/MediaExtension";
import { useStorageMedia } from "../composables/firebase";
import { Ref, ref } from "vue";
import { CardElementRoot } from "../types/ElementRoot";
import { useBEMClass } from "../composables/classNames";
import { useCSSMotion } from "../composables/motions";

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

const animePosterClass = useBEMClass("AnimePoster", "Loaded", imgLoaded);
const motion = useCSSMotion("500ms", "cubic-bezier(0.85, 0, 0.15, 1)");
</script>

<template>
  <component :is="rootType" :class="[...animePosterClass, 'loading-target']">
    <img :src="fireSrc" :alt="alt" @load="onImgLoad" />
  </component>
</template>

<style lang="scss" scoped>
.AnimePoster {
  margin-right: 1rem;
  overflow: hidden;
  animation-duration: v-bind("motion.duration");
  img {
    opacity: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity v-bind("motion.duration") v-bind("motion.easing");
  }
  &--Loaded {
    animation: none;
    img {
      opacity: 1;
    }
  }
}
</style>
