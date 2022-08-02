<script lang="ts" setup>
import { Ref, ref } from "vue";
import { useBEMClassNames } from "../composables/classNames.js";
import { useStorageMedia } from "../composables/firebase.js";
import type { ImageFileName } from "../types/MediaExtension";

type ListElementRoot = "div" | "li";

const animeListCardProps = defineProps<{
  animeName: string;
  poster: ImageFileName;
  tags?: Array<string>;
  madeBy: Array<string>;
  rootType: ListElementRoot;
}>();

const { imgURL } = useStorageMedia(
  `${animeListCardProps.animeName}/${animeListCardProps.poster}`
);
const imgLoaded: Ref<boolean> = ref(false);
function onImgLoad() {
  imgLoaded.value = true;
}
const thumbnailClasses = useBEMClassNames(
  "AnimeListCard__Thumbnail",
  "Loaded",
  imgLoaded
);
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
      <div class="row-bottom" v-if="tags">
        <ul class="tags">
          <li v-for="tag in tags" class="tag">
            {{ tag }}
          </li>
        </ul>
      </div>
    </div>
  </component>
</template>

<style lang="scss" scoped>
.AnimeListCard {
  display: flex;
  align-items: center;
  height: calc(6rem / 3 * 4 + 2rem);
  padding: 1rem 0;
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
    .tags {
      width: 100%;
      overflow-y: scroll;
      display: flex;
      border-radius: 9999px;
      .tag {
        min-width: fit-content;
        padding: 0.5rem 0.75rem;
        font-size: 1.2rem;
        background-color: var(--bg-300);
        border-radius: 9999px;
        font-weight: 500;
        &:not(:last-child) {
          margin-right: 0.3rem;
        }
      }
    }
  }
}
</style>
