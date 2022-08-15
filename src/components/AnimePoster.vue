<script lang="ts" setup>
import { ImageFileName } from "../types/MediaExtension";
import { useStorageMedia } from "../composables/firebase";
import { computed, Ref, ref } from "vue";
import { CardElementRoot } from "../types/ElementRoot";
import { storeToRefs } from "pinia";
import { useA11y } from "../store/accessibility";

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

const a11yStore = useA11y();
const { reduceMotion } = storeToRefs(a11yStore);
const transition = computed<{ time: string; easing: string }>(() =>
  reduceMotion.value
    ? { time: "none", easing: "" }
    : { time: "150ms", easing: "cubic-bezier(0.85, 0, 0.15, 1)" }
);
const animation = computed<string | number>(() =>
  reduceMotion.value ? 0 : "500ms"
);
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
  animation-duration: v-bind(animation);
  img {
    opacity: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity v-bind("transition.time") v-bind("transition.easing");
  }
  &--Loaded {
    animation: none;
    img {
      opacity: 1;
    }
  }
}
</style>
