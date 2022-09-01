<script lang="ts" setup>
import { computed, ref, Ref } from "vue";
import { storeToRefs } from "pinia";
import HamburgerButton from "./HamburgerButton.vue";
import SearchBar from "./SearchBar.vue";
import VueflixNav from "./VueflixNav.vue";
import { useNav } from "../store/nav";
import { useEventListener } from "../composables/event";
import { useCSSMotion } from "../composables/motions";

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

const motion = useCSSMotion("300ms", "cubic-bezier(0.85, 0, 0.15, 1)");
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
    </div>
    <SearchBar v-if="expanded" />
    <VueflixNav />
  </header>
</template>

<style lang="scss" scoped>
.VueflixAppBar {
  width: 100%;
  display: flex;
  height: 7.6rem;
  flex-direction: column;
  justify-content: center;
  background: var(--header-bg);
  backdrop-filter: blur(10px);
  transition: height v-bind("motion.duration") v-bind("motion.easing");

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
    width: 100%;
    height: 4.6rem;
  }
  &--Expanded {
    backdrop-filter: unset;
    height: var(--app-bar-height);
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
    z-index: var(--nav-z-index);
    left: -100%;
    top: 0;
    transition: v-bind("motion.duration") v-bind("motion.easing");
    transform: translateX(v-bind(transformLeft));
  }
}

@media screen and (min-width: 1024px) {
  .VueflixAppBar {
    margin-left: v-bind(navWidth);
    width: calc(100% - v-bind(navWidth));
    flex-direction: row;
    &__ActivityName {
      margin: 0;
    }
    .SearchBar {
      width: 50rem;
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
