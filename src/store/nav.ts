import { defineStore } from "pinia";
import { computed, Ref, ref } from "vue";

export const useNav = defineStore("nav", () => {
  const isNavOpen: Ref<boolean> = ref(false);
  function toggleNav() {
    isNavOpen.value = !isNavOpen.value;
  }
  function openNav() {
    isNavOpen.value = true;
  }
  function closeNav() {
    isNavOpen.value = false;
  }

  const navWidth = computed<string>(() =>
    isNavOpen.value ? "25rem" : "7.6rem"
  );

  return { isNavOpen, toggleNav, openNav, closeNav, navWidth };
});
