<script lang="ts" setup>
import { ref, Ref, onMounted } from "vue";
import type { ListElementRoot } from "../types/ElementRoot.js";
const horizontalListProps = defineProps<{
  rootType: ListElementRoot;
  data: Array<string>;
}>();

type ListElement = HTMLUListElement | HTMLDivElement;
const scrollState: Ref<string> = ref("LeftEnd");
const $root: Ref<ListElement | null> = ref(null);

onMounted(() => {
  if ($root.value) {
    const target = $root.value;
    const containScrollWidth = Math.floor(target.scrollWidth);
    const width = Math.floor(target.offsetWidth);
    if (width >= containScrollWidth) {
      scrollState.value = "None";
      return;
    }
  }
});
function setScrollState(e: Event) {
  const target = e.currentTarget as ListElement;
  const scrollLeft = Math.floor(target.scrollLeft);
  const width = Math.floor(target.offsetWidth);
  const containScrollWidth = Math.floor(target.scrollWidth);
  if (scrollLeft === 0) {
    scrollState.value = "LeftEnd";
  } else if (scrollLeft + width === containScrollWidth) {
    scrollState.value = "RightEnd";
  } else {
    scrollState.value = "Mid";
  }
}
</script>

<template>
  <div class="HorizontalList">
    <component
      :is="rootType"
      :class="['HorizontalList__Body', `HorizontalList__Body--${scrollState}`]"
      @scroll="setScrollState"
      @touchstart="setScrollState"
      ref="$root"
    >
      <component
        :is="rootType === 'ul' ? 'li' : 'div'"
        v-for="item in data"
        :key="item"
        class="HorizontalList__Item"
      >
        #{{ item }}
      </component>
    </component>
  </div>
</template>

<style lang="scss" scoped>
.HorizontalList {
  position: relative;
  &__Body {
    overflow-y: scroll;
    display: flex;

    &::after,
    &::before {
      content: "";
      width: 2rem;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: 10;
      opacity: 0;
    }
    &::before {
      background: var(--overflow-gradient-left);
      left: 0;
    }
    &::after {
      background: var(--overflow-gradient-right);
      right: 0;
    }
    &--LeftEnd::after {
      opacity: 1;
    }
    &--Mid {
      &::after,
      &::before {
        opacity: 1;
      }
    }
    &--RightEnd::before {
      opacity: 1;
    }
  }
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
</style>
