import { computed, ComputedRef, Ref, reactive } from "vue";

type VueBoolean = boolean | ComputedRef<boolean> | Ref<boolean>;
interface BEMConditionObject {
  [key: string]: VueBoolean;
}
export function useClassNames(
  blockOrElement: string,
  modifier: string,
  condition: VueBoolean
) {
  const bemConditionObject: BEMConditionObject = reactive({});
  return computed<[string, BEMConditionObject]>(() => {
    bemConditionObject[`${blockOrElement}--${modifier}`] = condition;
    return [blockOrElement, bemConditionObject];
  });
}
