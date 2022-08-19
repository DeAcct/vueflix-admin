import type { Ref } from "vue";

export interface OptionClass {
  [key: string]: boolean;
}

export type OptionalClassItem = string | OptionClass;

export type BlockElement = `${string}__${string}`;
export type Block = string;

export type BEM = Ref<Array<BlockElement | Block | OptionClass>>;
