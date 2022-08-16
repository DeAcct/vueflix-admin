import { ref, Ref } from "vue";

export function useDebounce(fn: Function, delay: number) {
  const debounceTimer: Ref<number | null> = ref(null);
  return function (...args: any[]) {
    if (debounceTimer.value) {
      clearTimeout(debounceTimer.value);
    }
    debounceTimer.value = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
