import type { ComputedRef, Ref } from "vue";

export type BlockElement = `${string}__${string}`;
export type BlockElementModifier = `${string}__${string}--${string}`;
export type VueBoolean = boolean | ComputedRef<boolean> | Ref<boolean>;
export interface BEMConditionObject {
  [key: string | BlockElementModifier]: VueBoolean;
}
