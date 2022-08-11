<script lang="ts" setup>
import { ref, Ref, onMounted } from "vue";
import { useEventListener } from "../composables/event";
import type { ListElementRoot } from "../types/ElementRoot.js";

interface HorizontalListProps {
  rootType: ListElementRoot;
  scroll: "scroll" | "shade" | "none";
}
const horizontalListProps = defineProps<HorizontalListProps>();

type ListElement = HTMLUListElement | HTMLDivElement;
const scrollState: Ref<string> = ref("LeftEnd");
const $root: Ref<ListElement | null> = ref(null);

onMounted(() => {
  if ($root.value) {
    const target = $root.value;
    const containScrollWidth = Math.floor(target.scrollWidth);
    const width = Math.floor(target.offsetWidth);
    if (horizontalListProps.scroll === "none" || width >= containScrollWidth) {
      scrollState.value = "None";
    } else if (horizontalListProps.scroll === "shade") {
      scrollState.value = "Shade";
    }
  }
});
function setScrollState(e: Event) {
  const target = e.currentTarget as ListElement;
  const scrollLeft = Math.floor(target.scrollLeft);
  const width = Math.floor(target.offsetWidth);
  const containScrollWidth = Math.floor(target.scrollWidth);
  if (horizontalListProps.scroll === "scroll") {
    if (scrollLeft === 0) {
      scrollState.value = "LeftEnd";
    } else if (scrollLeft + width === containScrollWidth) {
      scrollState.value = "RightEnd";
    } else {
      scrollState.value = "Mid";
    }
  } else if (horizontalListProps.scroll === "shade") {
    scrollState.value = "Shade";
  } else {
    scrollState.value = "None";
  }
}

useEventListener(window, "resize", setScrollState);
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
      <slot name="content"></slot>
    </component>
  </div>
</template>

<style lang="scss" scoped>
.HorizontalList {
  position: relative;
  &__Body {
    overflow-x: scroll;
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
    &--Shade {
      overflow-x: hidden;
      &::after {
        opacity: 1;
      }
    }
    &--None {
      overflow-x: hidden;
    }
  }
}
@media screen and (min-width: 768px) {
  .HorizontalList {
    &__Body {
      &::after,
      &::before {
        content: none;
      }
    }
  }
}
</style>
