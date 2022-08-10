<script lang="ts" setup>
import SearchBar from "./SearchBar.vue";
import VueflixNav from "./VueflixNav.vue";
import { computed, ref, Ref } from "vue";
import HamburgerButton from "./HamburgerButton.vue";

const appBarProps = defineProps<{
  expanded: boolean;
}>();
const appBarClasses = computed(() => [
  "inner",
  "VueflixAppBar",
  { "VueflixAppBar--Expanded": appBarProps.expanded },
]);

const navOpened: Ref<boolean> = ref(false);
function toggleNav() {
  navOpened.value = !navOpened.value;
}
function closeNav() {
  navOpened.value = false;
}
const transformLeft = computed<string | number>(() =>
  navOpened.value ? "100vw" : 0
);
</script>

<template>
  <header :class="appBarClasses">
    <div class="row-top">
      <div class="col-left">
        <HamburgerButton @click="toggleNav" :is-open="navOpened" />
        <strong class="VueflixAppBar__ActivityName">
          <slot name="activity-name" />
        </strong>
      </div>
    </div>
    <SearchBar v-if="expanded"></SearchBar>
    <VueflixNav :is-open="navOpened" @address-move="closeNav" />
  </header>
</template>

<style lang="scss" scoped>
.VueflixAppBar {
  width: 100%;
  display: flex;
  height: 6rem;
  flex-direction: column;
  justify-content: center;
  background: var(--header-bg);
  backdrop-filter: blur(10px);
  transition: 150ms ease-out;

  &__ActivityName {
    font-size: 2rem;
    font-weight: 900;
    margin-left: 4.1rem;
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
    .row-top {
      height: 3.6rem;
    }
  }

  .VueflixNav {
    position: fixed;
    z-index: 100;
    left: -100vw;
    top: 0;
    transition: 300ms cubic-bezier(0.85, 0, 0.15, 1);
    transform: translateX(v-bind(transformLeft));
  }
}
</style>
