<script lang="ts" setup>
import type { CardElementRoot } from "../types/ElementRoot";
import type { RecommendListDoc } from "../types/RecommendListDoc";
import HorizontalList from "./HorizontalList.vue";
import AnimePoster from "./AnimePoster.vue";

defineProps<{
  root: CardElementRoot;
  recommendList: RecommendListDoc;
}>();
</script>

<template>
  <component :is="root" class="RecommendListCard">
    <HorizontalList root-type="ul" scroll="scroll" :wrap="false">
      <template #content>
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
      height: 4rem;
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
