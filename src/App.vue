<script setup lang="ts">
import { ref, Ref, computed, watch } from "vue";
import VueflixNav from "@/components/VueflixNav.vue";
import VueflixAppBar from "@/components/VueflixAppBar.vue";
import { useRoute } from "vue-router";
import { useEventListener } from "./composables/event";

const navOpen: Ref<boolean> = ref(false);
const transformLeft = computed<string | number>(() =>
  navOpen.value ? "100vw" : 0
);

const route = useRoute();
watch(
  () => route.meta.title,
  () => {
    if (typeof route.meta.title === "string") {
      document.title = route.meta.title;
    }
  }
);

const isScroll: Ref<boolean> = ref(false);
useEventListener(window, "scroll", () => {
  isScroll.value = 0 < Math.round(window.scrollY);
});
</script>

<template>
  <VueflixNav :is-open="navOpen" />
  <VueflixAppBar :expanded="!isScroll">
    <template #activity-name>
      {{ route.name }}
    </template>
  </VueflixAppBar>
  <RouterView v-slot="{ Component }">
    <Transition name="slide">
      <component :is="Component" :key="route.name"></component>
    </Transition>
  </RouterView>
</template>

<style lang="scss" scoped>
.VueflixNav {
  position: fixed;
  left: -100vw;
  top: 0;
  transform: translateX(v-bind(transformLeft));
}
.slide {
  &-enter-active,
  &-leave-active {
    transition: opacity 150ms, transform 150ms;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-30%);
  }
}
</style>
