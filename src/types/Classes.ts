export interface OptionClass {
  [key: string]: boolean;
}

export type OptionalClassItem = string | OptionClass;

export type BlockElement = `${string}__${string}`;
export type Block = string;

export type BEM = Array<BlockElement | Block | OptionClass>;
