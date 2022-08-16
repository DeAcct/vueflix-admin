<script lang="ts" setup>
import type { ImageFileName } from "../types/MediaExtension";
import type { CardElementRoot } from "../types/ElementRoot";
import HorizontalList from "./HorizontalList.vue";
import AnimePoster from "./AnimePoster.vue";

const animeListCardProps = defineProps<{
  animeName: string;
  poster: ImageFileName;
  tags?: Array<string>;
  madeBy: Array<string>;
  root: CardElementRoot;
  type: "link" | "presentation";
}>();
</script>

<template>
  <component :is="root" class="AnimeListCard">
    <AnimePoster
      :src="`${animeName}/${poster}`"
      :alt="`${animeName}포스터`"
      root-type="div"
    />
    <div class="AnimeListCard__Text">
      <div class="row-top">
        <component
          :is="type === 'link' ? 'RouterLink' : 'strong'"
          :to="type === 'link' ? `/anime-detail/${animeName}` : undefined"
          class="title"
        >
          <slot name="ani-name"></slot>
        </component>
        <div class="company">
          <component
            :is="type === 'link' ? 'RouterLink' : 'p'"
            :to="
              type === 'link' ? { name: '검색', query: { company } } : undefined
            "
            v-for="company in madeBy"
            :key="company"
          >
            {{ company }}
          </component>
        </div>
      </div>
      <HorizontalList
        v-if="tags"
        root-type="ul"
        class="row-bottom"
        scroll="scroll"
        :wrap="true"
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
  padding: var(--card-padding);
  .AnimePoster {
    height: calc(6rem / 3 * 4);
    width: 6rem;
    border-radius: var(--radius-1);
  }
  &__Text {
    display: flex;
    height: calc(6rem / 3 * 4);
    flex-direction: column;
    justify-content: space-between;
    width: calc(100% - 7rem);

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
        margin: {
          top: 0.15rem;
          bottom: 0.15rem;
        }
        &:not(:last-child) {
          margin-right: 0.3rem;
        }
      }
    }
  }
}

@media (hover: hover) and (pointer: fine) {
  .AnimeListCard {
    &__Text {
      justify-content: flex-start;
    }
    .row-top {
      margin-bottom: 1rem;
    }
  }
}
</style>
