<script lang="ts" setup>
import SearchBar from "./SearchBar.vue";
import VueflixNav from "./VueflixNav.vue";
import { computed, ref, Ref } from "vue";
import HamburgerButton from "./HamburgerButton.vue";
import { useEventListener } from "../composables/event";

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

const navOpened: Ref<boolean> = ref(device.value === "pc");
function toggleNav() {
  navOpened.value = !navOpened.value;
}
function closeNav() {
  navOpened.value = false;
}
const transformLeft = computed<string | number>(() =>
  navOpened.value ? "100%" : 0
);

useEventListener(window, "resize", () => {
  navOpened.value = device.value === "pc";
  if (window.innerWidth > 1024) {
    device.value = "pc";
  } else if (window.innerWidth > 768) {
    device.value = "tablet";
  } else {
    device.value = "mobile";
  }
});
</script>

<template>
  <header :class="appBarClasses">
    <div class="row-top">
      <div class="col-left">
        <HamburgerButton
          @click="toggleNav"
          :is-open="navOpened"
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
    <SearchBar v-if="expanded && device === 'mobile'"></SearchBar>
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
  &__SearchBarOpener {
    width: 3.6rem;
    height: 3.6rem;
    padding: 0.6rem;
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
    .col-right {
      width: 50rem;
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
    left: -100%;
    top: 0;
    transition: transform 300ms cubic-bezier(0.85, 0, 0.15, 1);
    transform: translateX(v-bind(transformLeft));
  }
}

@media screen and (min-width: 1024px) {
  .VueflixAppBar {
    margin-left: 25rem;
    width: calc(100% - 25rem);
    &__ActivityName {
      margin: 0;
    }
    .VueflixNav {
      left: 0;
      transform: none;
    }
  }
}
</style>
