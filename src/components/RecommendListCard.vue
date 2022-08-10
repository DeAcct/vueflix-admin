<script lang="ts" setup>
import type { CardElementRoot } from "../types/ElementRoot";
import { RecommendListDoc } from "../types/RecommendListDoc";
import HorizontalList from "./HorizontalList.vue";
import AnimePoster from "./AnimePoster.vue";
import { computed } from "vue";

const animeListCardProps = defineProps<{
  rootType: CardElementRoot;
  recommendList: RecommendListDoc;
}>();

const listLength = computed<number>(
  () => animeListCardProps.recommendList.list.length
);
</script>

<template>
  <component :is="rootType" class="RecommendListCard">
    <HorizontalList root-type="ul" scroll="none">
      <template #content>
        <AnimePoster
          v-for="recommendPoster in recommendList.list"
          root-type="li"
          :src="`${recommendPoster.aniTitle}/${recommendPoster.episodeThumbnail}`"
          :alt="`${recommendPoster.aniTitle} 포스터`"
        />
        <AnimePoster
          v-for="recommendPoster in recommendList.list"
          root-type="li"
          :src="`${recommendPoster.aniTitle}/${recommendPoster.episodeThumbnail}`"
          :alt="`${recommendPoster.aniTitle} 포스터`"
        />
      </template>
    </HorizontalList>
    <strong class="RecommendListCard__Title">
      {{ recommendList.subject }}
    </strong>
  </component>
</template>

<style lang="scss" scoped>
.RecommendListCard {
  width: 100%;
  border-bottom: 1px solid var(--bg-200);
  padding: var(--card-padding);
  .HorizontalList {
    overflow: hidden;
    margin-bottom: 1.5rem;
    border-radius: 9999px;
    .AnimePoster {
      width: 8rem;
      flex: 0 0 auto;
      border-radius: 9999px;
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
