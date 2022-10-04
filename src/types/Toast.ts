export type BreadType = "error" | "info" | "success";

export interface Bread {
  type: BreadType;
  text: string;
}
