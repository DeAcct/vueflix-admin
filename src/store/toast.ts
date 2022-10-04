import { defineStore } from "pinia";
import { Ref, ref, computed } from "vue";
import type { Bread, BreadType } from "../types/Toast";

/**
 * 여러 개의 토스트 알림을 Set 자료구조로 저장.
 * 꺼낼 때는 Array로.
 *
 * Set의 item은 Bread, Array의 item은 Toast라 부르자.
 */

export const useToast = defineStore("toast", () => {
  const breads: Ref<Set<Bread>> = ref(new Set());

  function bakeBread(type: BreadType, text: string, time: number) {
    breads.value.add({ type, text });
    setTimeout(() => {
      throwBread(text);
      console.log(`${text}삭제됨`);
    }, time);
  }
  function throwBread(text: string) {
    breads.value = new Set(toasts.value.filter((bread) => bread.text !== text));
  }

  const toasts = computed<Array<Bread>>(() => [...breads.value]);

  return {
    breads,
    toasts,
    bakeBread,
    throwBread,
  };
});
