<script setup lang="ts">
import { ref, Ref, computed, watch } from "vue";
import VueflixAppBar from "@/components/VueflixAppBar.vue";
import { useRoute } from "vue-router";
import { useEventListener } from "./composables/event";
import { useNav } from "./store/nav";
import { storeToRefs } from "pinia";
import { useA11y } from "./store/accessibility";

const route = useRoute();
watch(
  () => route.meta.title,
  () => {
    if (typeof route.meta.title === "string") {
      document.title = route.meta.title;
    }
  }
);

const navStore = useNav();
const { isNavOpen } = storeToRefs(navStore);
const navWidth = computed<string>(() =>
  isNavOpen.value ? "25rem" : "calc(3.6rem + var(--card-padding) * 2)"
);

const isExpanded: Ref<boolean> = ref(false);
const beforeScroll: Ref<number> = ref(Math.floor(window.scrollY));
useEventListener(window, "scroll", () => {
  const newScroll = Math.floor(window.scrollY);
  if (newScroll === 0) {
    isExpanded.value = 0 < Math.floor(window.scrollY);
  } else {
    isExpanded.value = newScroll > beforeScroll.value;
  }
  beforeScroll.value = Math.floor(window.scrollY);
});
const routerViewClasses = computed(() => [
  "RouterView",
  { "RouterView--HeaderExpanded": isExpanded.value },
]);

const a11yStore = useA11y();
const { reduceMotion } = storeToRefs(a11yStore);
const transition = computed<{ time: string; easing: string }>(() =>
  reduceMotion.value
    ? { time: "none", easing: "" }
    : { time: "150ms", easing: "cubic-bezier(0.85, 0, 0.15, 1)" }
);

console.clear();
</script>

<template>
  <VueflixAppBar :expanded="!isExpanded">
    <template #activity-name>
      {{ route.name }}
    </template>
  </VueflixAppBar>
  <RouterView v-slot="{ Component }" :class="routerViewClasses">
    <Transition name="fade">
      <component :is="Component" :key="route.name"></component>
    </Transition>
  </RouterView>
</template>

<style lang="scss" scoped>
.VueflixAppBar {
  position: fixed;
  z-index: 90;
}
.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity v-bind("transition.time") v-bind("transition.easing");
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
.RouterView {
  padding: var(--header-height) var(--inner-padding) 0;
}

@media screen and (min-width: 1024px) {
  .RouterView {
    display: flex;
    justify-content: center;
    width: calc(100% - v-bind(navWidth));
    margin-left: v-bind(navWidth);
    transition: v-bind("transition.time") v-bind("transition.easing");
  }
}
</style>
