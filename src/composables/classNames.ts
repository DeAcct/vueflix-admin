import { computed, ComputedRef, Ref, reactive } from "vue";

type VueBoolean = boolean | ComputedRef<boolean> | Ref<boolean>;

type BlockElement = `${string}__${string}`;
type BlockElementModifier = `${string}__${string}--${string}`;
interface BEMConditionObject {
  [key: string | BlockElementModifier]: VueBoolean;
}
export function useBEMClassNames(
  blockOrElement: string | BlockElement,
  modifier: string,
  condition: VueBoolean
) {
  const bemConditionObject: BEMConditionObject = reactive({});
  return computed<[string, BEMConditionObject]>(() => {
    bemConditionObject[`${blockOrElement}--${modifier}`] = condition;
    return [blockOrElement, bemConditionObject];
  });
}

interface ConditionObject {
  [key: string]: VueBoolean;
}
export function useClassNames(
  optionalClassName: string,
  condition: VueBoolean
) {
  const conditionObject: ConditionObject = reactive({});
  return computed<ConditionObject>(() => {
    conditionObject[optionalClassName] = condition;
    return conditionObject;
  });
}
