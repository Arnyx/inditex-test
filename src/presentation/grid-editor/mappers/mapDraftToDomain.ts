import type { DraftProductRow } from "../models/DraftProductRow";
import type { ProductRow } from "@/domain/models/ProductRow";

export const mapDraftToDomain = (
  draftRows: Array<DraftProductRow>
): Array<ProductRow> => {
  return draftRows.map(({ id, templateId, products }) => {
    if (!templateId) throw new Error(`Row ${id} has no templateId`);
    return { id, templateId, products: products.map((product) => product.id) };
  });
};
