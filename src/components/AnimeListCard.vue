<script lang="ts" setup>
import { computed, Ref, ref } from "vue";
import { useStorageMedia } from "../composables/firebase.js";
import type { ImageFileName } from "../types/MediaExtension";
import type { CardElementRoot } from "../types/ElementRoot";
import HorizontalList from "./HorizontalList.vue";

const animeListCardProps = defineProps<{
  animeName: string;
  poster: ImageFileName;
  tags?: Array<string>;
  madeBy: Array<string>;
  rootType: CardElementRoot;
}>();

const { imgURL } = useStorageMedia(
  `${animeListCardProps.animeName}/${animeListCardProps.poster}`
);
const imgLoaded: Ref<boolean> = ref(false);
function onImgLoad() {
  imgLoaded.value = true;
}
const thumbnailClasses = computed(() => [
  "loading-target",
  "AnimeListCard__Thumbnail",
  { "AnimeListCard__Thumbnail--Loaded": imgLoaded.value },
]);
</script>

<template>
  <component :is="rootType" class="AnimeListCard">
    <div :class="[...thumbnailClasses, 'loading-target']">
      <img :src="imgURL" :alt="`${animeName}포스터`" @load="onImgLoad" />
    </div>
    <div class="AnimeListCard__Text">
      <div class="row-top">
        <strong class="title">
          <slot name="ani-name"></slot>
        </strong>
        <p class="company">
          <template v-for="company in madeBy" :key="company">
            {{ company }}
          </template>
        </p>
      </div>
      <HorizontalList
        :data="tags"
        v-if="tags"
        root-type="ul"
        class="row-bottom"
      />
    </div>
  </component>
</template>

<style lang="scss" scoped>
.AnimeListCard {
  display: flex;
  align-items: center;
  height: calc(6rem / 3 * 4 + (var(--card-padding) * 2));
  padding: var(--card-padding);
  &__Thumbnail {
    width: 6rem;
    height: 100%;
    margin-right: 1rem;
    border-radius: var(--radius-1);
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
  &__Text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(100% - 7rem);
    height: 100%;
    .title {
      display: block;
      margin-bottom: 1rem;
      font-weight: 700;
      font-size: 1.4rem;
    }
    .company {
      font-size: 1.2rem;
    }
  }
}
</style>
