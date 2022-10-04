<script setup lang="ts">
import { ref, Ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import VueflixAppBar from "@/components/VueflixAppBar.vue";
import AuthProvider from "@/components/AuthProvider.vue";
import { useNav } from "./store/nav";
import { useEventListener } from "./composables/event";
import { useCSSMotion } from "./composables/motions";
import ToastStack from "./components/ToastStack.vue";

const route = useRoute();
watch(
  () => route.path,
  () => {
    if (typeof route.meta.title === "string") {
      document.title = route.meta.title;
    }
  }
);

const navStore = useNav();
const { isNavOpen } = storeToRefs(navStore);
const navWidth = computed<string>(() => (isNavOpen.value ? "25rem" : "7.6rem"));

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

const transition = useCSSMotion("300ms", "cubic-bezier(0.85, 0, 0.15, 1)");
console.clear();
</script>

<template>
  <AuthProvider>
    <VueflixAppBar :expanded="!isExpanded" v-if="route.meta.header">
      <template #activity-name>
        {{ route.params.title ? route.params.title : route.name }}
      </template>
    </VueflixAppBar>
    <RouterView v-slot="{ Component }" class="RouterView">
      <Transition name="fade">
        <component :is="Component" :key="route.name"></component>
      </Transition>
    </RouterView>
    <ToastStack />
  </AuthProvider>
</template>

<style lang="scss" scoped>
.VueflixAppBar {
  position: fixed;
  z-index: var(--app-bar-z-index);
}
.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity v-bind("transition.duration")
      v-bind("transition.easing");
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
.RouterView {
  padding: var(--app-bar-height) var(--inner-padding) 0;
  background-color: var(--bg-100);
}
.ToastStack {
  position: fixed;
  bottom: var(--card-padding);
  right: var(--card-padding);
}

@media screen and (min-width: 1024px) {
  .RouterView {
    display: flex;
    justify-content: center;
    width: calc(100% - v-bind(navWidth));
    margin-left: v-bind(navWidth);
    transition: v-bind("transition.duration") v-bind("transition.easing");
  }
}
</style>
