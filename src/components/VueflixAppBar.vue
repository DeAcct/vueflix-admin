<script lang="ts" setup>
import { useBEMClassNames } from "../composables/classNames";
import SearchBar from "./SearchBar.vue";

const appBarProps = defineProps<{
  expanded: boolean;
}>();

const appBarClasses = useBEMClassNames(
  "VueflixAppBar",
  "Expanded",
  appBarProps.expanded
);
</script>

<template>
  <header :class="[...appBarClasses, 'inner']">
    <div class="row-top">
      <div class="col-left">
        <button class="VueflixAppBar__HamburgerBtn">
          <span class="blind">사이드 메뉴 열기</span>
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </button>
        <strong class="VueflixAppBar__ActivityName">
          <slot name="activity-name" />
        </strong>
      </div>
    </div>
    <SearchBar v-if="expanded"></SearchBar>
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

  &__HamburgerBtn {
    width: 3.6rem;
    height: 3.6rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-right: 0.5rem;
    .line {
      width: 1.8rem;
      height: 0.2rem;
      background-color: var(--bg-900);
    }
  }

  .row-top {
    display: flex;
    align-items: center;
    .col-left {
      display: flex;
      align-items: center;
    }
  }
  &--Expanded {
    backdrop-filter: unset;
    height: 14rem;

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
