export interface GridRow {
  id: string;
  templateId: string;
  productIds: Array<string>;
}

export type Grid = Array<GridRow>;
