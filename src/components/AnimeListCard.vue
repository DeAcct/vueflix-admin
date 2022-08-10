<script lang="ts" setup>
import { computed, Ref, ref } from "vue";
import type { ImageFileName } from "../types/MediaExtension";
import type { CardElementRoot } from "../types/ElementRoot";
import HorizontalList from "./HorizontalList.vue";
import AnimePoster from "./AnimePoster.vue";

const animeListCardProps = defineProps<{
  animeName: string;
  poster: ImageFileName;
  tags?: Array<string>;
  madeBy: Array<string>;
  rootType: CardElementRoot;
}>();
</script>

<template>
  <component :is="rootType" class="AnimeListCard">
    <AnimePoster
      :src="`${animeName}/${poster}`"
      :alt="`${animeName}포스터`"
      root-type="div"
    />
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
        v-if="tags"
        root-type="ul"
        class="row-bottom"
        scroll="scroll"
      >
        <template #content>
          <li v-for="tag in tags" :key="tag" class="HorizontalList__Item">
            #{{ tag }}
          </li>
        </template>
      </HorizontalList>
    </div>
  </component>
</template>

<style lang="scss" scoped>
.AnimeListCard {
  display: flex;
  align-items: center;
  height: calc(6rem / 3 * 4 + (var(--card-padding) * 2));
  padding: var(--card-padding);
  .AnimePoster {
    width: 6rem;
    height: 100%;
    border-radius: var(--radius-1);
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
    .HorizontalList {
      &__Item {
        min-width: fit-content;
        padding: 0.5rem 0.75rem;
        font-size: 1.2rem;
        background-color: var(--bg-200);
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
