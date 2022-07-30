<script lang="ts" setup>
import { useBEMClassNames } from "../composables/classNames";
import SearchBar from "./SearchBar.vue";

const appBarProps = defineProps<{
  expanded: boolean;
}>();

const appBarClasses = useBEMClassNames(
  "VueflixAppBar",
  "expanded",
  appBarProps.expanded
);
</script>

<template>
  <header :class="[...appBarClasses, 'inner']">
    <strong class="VueflixAppBar__ActivityName">
      <slot name="activity-name" />
    </strong>
    <SearchBar></SearchBar>
  </header>
</template>

<style lang="scss" scoped>
.VueflixAppBar {
  display: flex;
  height: 6rem;
  flex-direction: column;
  justify-content: center;
  background: var(--header-bg);
  backdrop-filter: blur(10px);
  transition: height 150ms ease-out;

  &__ActivityName {
    font-size: 2rem;
  }

  &--expanded {
    backdrop-filter: unset;
    height: 12rem;

    padding: {
      top: 2rem;
      bottom: 2rem;
    }
    justify-content: space-between;
    background: radial-gradient(
      farthest-corner at 0% 0%,
      var(--theme-100),
      transparent 60%
    );
  }
}
</style>
