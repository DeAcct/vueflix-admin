import { EasingFunction } from "csstype";
import { storeToRefs } from "pinia";
import { computed, ComputedRef } from "vue";
import { useA11y } from "../store/accessibility";

type Duration = `${number}s` | `${number}ms`;

interface Motion {
  duration: Duration | "none";
  easing: EasingFunction | null;
}
/** prefers-reduced-motion 관련하여 제공된 duration, easing을 기반으로 트렌지션을 반환하는 함수
 * @param duration 트렌지션을 재생할 시간
 * @param easing 트렌지션에 적용할 easing-function
 * @returns prefers-reduced-motion이 적용된 ComputedRef를 반환한다.
 */
export function useCSSMotion(
  duration: Duration,
  easing: EasingFunction
): ComputedRef<Motion> {
  const a11yStore = useA11y();
  const { reduceMotion } = storeToRefs(a11yStore);
  const motion = computed<Motion>(() =>
    reduceMotion.value
      ? { duration: "none", easing: null }
      : { duration, easing }
  );
  return motion;
}
