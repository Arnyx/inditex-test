import type { ProductRow } from "@/domain/models/ProductRow";

export type DraftProductRow = Omit<ProductRow, "templateId"> & {
  templateId?: string;
};
