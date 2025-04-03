import type { Template } from "./Template";
import type { Product } from "./Product";

export interface GridRow {
  id: string;
  template: Template;
  products: Array<Product>;
}

export type Grid = Array<GridRow>;
