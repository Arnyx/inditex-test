import type { Product } from "./Product";

export interface ProductRow {
  id: string;
  templateId: string;
  products: Array<Product>;
}
