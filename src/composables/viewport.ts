import { onMounted, ref, Ref } from "vue";
import { useEventListener } from "./event";

/**
 * window.innerWidth, window.innerHeight를 기반으로 계산한 뷰포트길이를 반환하는 함수
 * @param convertOrigin vw단위 또는 vh단위의 길이
 * @returns px단위의 길이
 */
type ViewportUnits = `${number}vw` | `${number}vh`;
export function useViewportUnit(convertOrigin: ViewportUnits) {
  const result: Ref<string> = ref("1px");
  const unit = convertOrigin.slice(-2);
  function setViewport() {
    result.value = converter(
      unit === "vw" ? window.innerWidth : window.innerHeight
    );
  }
  const converter = (origin: number) =>
    `${(origin * Number(convertOrigin.slice(0, -2))) / 100}px`;

  onMounted(() => {
    setViewport();
  });
  useEventListener(window, "resize", setViewport);

  return result;
}
