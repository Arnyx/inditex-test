import type { Grid } from "../models/Grid";
import type { Product } from "../models/Product";
import type { Template } from "../models/Template";

export interface InditexRepository {
  getProductsByIds: (ids: Array<string>) => Promise<Array<Product>>;
  getTemplates: () => Promise<Array<Template>>;
  saveGrid: (grid: Grid) => Promise<void>;
}
