<script lang="ts" setup>
import SearchBar from "./SearchBar.vue";
import VueflixNav from "./VueflixNav.vue";
import { computed, ref, Ref } from "vue";
import HamburgerButton from "./HamburgerButton.vue";
import { useEventListener } from "../composables/event";
import { useNav } from "../store/nav";
import { storeToRefs } from "pinia";
import { useA11y } from "../store/accessibility";

const appBarProps = defineProps<{
  expanded: boolean;
}>();
const appBarClasses = computed(() => [
  "inner",
  "VueflixAppBar",
  { "VueflixAppBar--Expanded": appBarProps.expanded },
]);

const device: Ref<string> = ref(
  window.innerWidth > 768
    ? window.innerWidth > 1024
      ? "pc"
      : "tablet"
    : "mobile"
);

const navStore = useNav();
const { isNavOpen, navWidth } = storeToRefs(navStore);
const transformLeft = computed<string | number>(() =>
  isNavOpen.value ? "100%" : 0
);
function toggleNav() {
  navStore.toggleNav();
}

useEventListener(window, "resize", () => {
  isNavOpen.value = device.value === "pc";
  if (window.innerWidth > 1024) {
    device.value = "pc";
  } else if (window.innerWidth > 768) {
    device.value = "tablet";
  } else {
    device.value = "mobile";
  }
});

const a11yStore = useA11y();
const { reduceMotion } = storeToRefs(a11yStore);
const transition = computed<{ time: string; easing: string }>(() =>
  reduceMotion.value
    ? { time: "none", easing: "" }
    : { time: "150ms", easing: "cubic-bezier(0.85, 0, 0.15, 1)" }
);
</script>

<template>
  <header :class="appBarClasses">
    <div class="row-top">
      <div class="col-left">
        <HamburgerButton
          @click="toggleNav"
          :is-open="isNavOpen"
          v-if="device !== 'pc'"
        />
        <strong class="VueflixAppBar__ActivityName">
          <slot name="activity-name" />
        </strong>
      </div>
      <div class="col-right">
        <SearchBar v-if="device !== 'mobile'" />
      </div>
    </div>
    <SearchBar v-if="expanded && device === 'mobile'" />
    <VueflixNav />
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
  transition: v-bind("transition.time") v-bind("transition.easing");

  &__ActivityName {
    font-size: 2rem;
    font-weight: 900;
    margin-left: 4.1rem;
  }

  .HamburgerButton {
    width: 3.6rem;
    height: 3.6rem;
  }

  .row-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .col-left {
      display: flex;
      align-items: center;
    }
  }
  .SearchBar {
    height: 4.6rem;
  }
  &--Expanded {
    backdrop-filter: unset;
    height: var(--header-height);
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
    left: -100%;
    top: 0;
    transition: v-bind("transition.time") v-bind("transition.easing");
    transform: translateX(v-bind(transformLeft));
  }
}

@media screen and (min-width: 1024px) {
  .VueflixAppBar {
    margin-left: v-bind(navWidth);
    width: calc(100% - v-bind(navWidth));
    &__ActivityName {
      margin: 0;
    }
    .VueflixNav {
      left: 0;
      transform: none;
    }
    .row-top {
      margin-bottom: 0;
      align-items: unset;
      .col-left {
        height: 3.6rem;
      }
      .col-right {
        width: 50rem;
      }
    }
  }
}
</style>
