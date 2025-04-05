import { ProductMapper } from "../mappers/ProductMapper";
import { TemplateMapper } from "../mappers/TemplateMapper";
import productsData from "@/config/mock-data/products.json";
import templatesData from "@/config/mock-data/templates.json";
import type { Grid } from "@/domain/models/Grid";
import type { InditexDatasource } from "@/domain/datasources/InditexDatasource";
import type { Product } from "@/domain/models/Product";
import type { Template } from "@/domain/models/Template";

export class MockInditexDatasource implements InditexDatasource {
  async getProductsByIds(ids: Array<string> | null): Promise<Array<Product>> {
    await new Promise((res) => setTimeout(res, 2000));
    const products = ids
      ? productsData.filter((p) => ids.includes(p.id))
      : productsData;

    return ProductMapper.fromJson(products);
  }

  async getTemplates(): Promise<Array<Template>> {
    return TemplateMapper.fromJson(templatesData);
  }

  async saveGrid(grid: Grid): Promise<void> {
    console.log(grid);
    return;
  }
}
