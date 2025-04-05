import type { Product } from "@/domain/models/Product";

export interface DraftProductRow {
  id: string;
  templateId?: string;
  products: Array<Product>;
}
