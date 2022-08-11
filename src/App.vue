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
    transition: opacity 150ms;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
.RouterView {
  padding: 14rem var(--inner-padding) 0;
}

@media screen and (min-width: 1024px) {
  .RouterView {
    display: flex;
    justify-content: center;
    width: calc(100% - var(--nav-width));
    margin-left: calc(var(--nav-width));
  }
}
</style>
