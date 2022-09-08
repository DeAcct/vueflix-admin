import { defineStore } from "pinia";
import { useLocalstorage } from "../composables/localstorage";

export const useA11y = defineStore("a11y", () => {
  // 깜빡이거나 반짝이는 애니메이션에 예민한 사용자를 위해 모션을 끌 수 있도록 한다.
  // 추후 Settings 뷰에서 옵션 제공 예정
  const [reduceMotion, setReduceMotion] = useLocalstorage<boolean>(
    "reduce-motion",
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  function toggleReduceMotion() {
    setReduceMotion(() => !reduceMotion.value);
  }

  return {
    reduceMotion,
    toggleReduceMotion,
  };
});
