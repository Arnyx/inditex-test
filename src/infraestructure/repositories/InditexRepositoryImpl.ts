import type { InditexDatasource } from "@/domain/datasources/InditexDatasource";
import type { Product } from "@/domain/models/Product";
import type { Template } from "@/domain/models/Template";
import type { Grid } from "@/domain/models/Grid";
import type { InditexRepository } from "@/domain/repositories/Inditex";

export class InditexRepositoryImpl implements InditexRepository {
  constructor(private readonly datasource: InditexDatasource) {}

  async getProductsByIds(ids: Array<string> | null): Promise<Product[]> {
    return this.datasource.getProductsByIds(ids);
  }

  async getTemplates(): Promise<Template[]> {
    return this.datasource.getTemplates();
  }

  async saveGrid(grid: Grid): Promise<void> {
    return this.datasource.saveGrid(grid);
  }
}
