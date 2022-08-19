import { ref, Ref, watch } from "vue";

export function useLocalstorage<T>(
  key: string,
  initialState: T
): [Ref<T>, Function] {
  console.log(initialState, localStorage.getItem(key) || "");
  const state: Ref<T> = ref(
    localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key) || "")
      : initialState
  );

  function setState(value: T) {
    state.value = value;
  }

  watch(state, () => {
    localStorage.setItem(key, JSON.stringify(state.value));
  });

  return [state, setState];
}