import { reactive, computed, Ref, ComputedRef } from "vue";
import type { Block, BlockElement, BEM, OptionClass } from "../types/Classes";

/** 제공한 조건에 따라 BEM형태의 배열을 반환합니다.
 * @param base  반환에 사용할 BlockElement 또는 Block형태의 클래스명
 * @param m  반환에 사용할 Modifier
 * @param condition  반환에 사용할 상태값
 * @param negative  condition값에 부정 연산을 취하여 사용하고 싶다면 true
 * @returns {BEM}  BEM형태의 ComputedRef가 반환합니다.
 */
export function useBEMClass(
  base: BlockElement | Block,
  m: string,
  condition: Ref<boolean> | ComputedRef<boolean>,
  negative?: boolean
): ComputedRef<BEM> {
  const optionClass = reactive<OptionClass>({});
  return computed<BEM>(() => {
    optionClass[`${base}${m ? `--${m}` : ""}`] = negative
      ? !condition.value
      : condition.value;
    return [base, optionClass];
  });
}

/** 제공한 조건에 따라 OptionClass형태의 객체를 반환합니다.
 * @param className  반환할 클래스명
 * @param condition  반환에 사용할 상태값
 * @param negative  ondition값에 부정 연산을 취하여 사용하고 싶다면 true
 * @returns {OptionClass}  OptionClass형태의 ComputedRef가 반환됩니다.
 */
export function useOptionClass(
  className: string,
  condition: Ref<boolean> | ComputedRef<boolean>,
  negative?: boolean
): ComputedRef<OptionClass> {
  const optionClass = reactive<OptionClass>({});
  return computed<OptionClass>(() => {
    optionClass[className] = negative ? !condition.value : condition.value;
    return optionClass;
  });
}
