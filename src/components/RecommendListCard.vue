<script lang="ts" setup>
import type { CardElementRoot } from "../types/ElementRoot";
const animeListCardProps = defineProps<{
  rootType: CardElementRoot;
  recommendTitle: string;
}>();
</script>

<template>
  <component :is="rootType" class="RecommendListCard inner">
    <ul class="RecommendListCard__Thumbnails">
      <li class="Thumbnail loading-target">
        <img src="" alt="" />
      </li>
      <li class="Thumbnail loading-target">
        <img src="" alt="" />
      </li>
      <li class="Thumbnail loading-target">
        <img src="" alt="" />
      </li>
      <li class="Thumbnail loading-target">
        <img src="" alt="" />
      </li>
    </ul>
    <strong class="RecommendListCard__Title">
      {{ recommendTitle }}
    </strong>
  </component>
</template>

<style lang="scss" scoped>
.RecommendListCard {
  width: 100%;
  border-bottom: 1px solid var(--bg-200);
  padding: {
    top: var(--inner-padding);
    bottom: var(--inner-padding);
  }
  &__Thumbnails {
    width: 100%;
    display: flex;
    margin-bottom: 1rem;
    .Thumbnail {
      width: 6rem;
      height: calc(6rem / 3 * 4);
      border-radius: var(--radius-1);
      &:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }
  &__Title {
    font-size: 1.4rem;
  }
}
</style>
