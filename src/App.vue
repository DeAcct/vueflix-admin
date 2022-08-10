<script setup lang="ts">
import { ref, Ref, computed, watch } from "vue";
import VueflixAppBar from "@/components/VueflixAppBar.vue";
import { useRoute } from "vue-router";
import { useEventListener } from "./composables/event";

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
const routerViewClasses = computed(() => [
  "RouterView",
  { "RouterView--HeaderExpanded": !isScroll.value },
]);
console.clear();
</script>

<template>
  <VueflixAppBar :expanded="!isScroll">
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
    transition: opacity 150ms;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
.RouterView {
  padding-top: 14rem;
}
</style>
