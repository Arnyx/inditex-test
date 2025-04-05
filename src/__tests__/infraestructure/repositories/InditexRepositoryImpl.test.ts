import { describe, it, expect, vi, beforeEach } from "vitest";
import { InditexRepositoryImpl } from "@/infraestructure/repositories/InditexRepositoryImpl";
import type { InditexDatasource } from "@/domain/datasources/InditexDatasource";
import type { Grid } from "@/domain/models/Grid";
import { Template, TemplateAlignment } from "@/domain/models/Template";

describe("InditexRepositoryImpl", () => {
  const mockDatasource: InditexDatasource = {
    getProductsByIds: vi.fn(),
    getTemplates: vi.fn(),
    saveGrid: vi.fn(),
  };

  const repository = new InditexRepositoryImpl(mockDatasource);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call getProductsByIds on datasource", async () => {
    const fakeProducts = [
      { id: "product_1", name: "Product", price: 5, image: "" },
    ];
    vi.mocked(mockDatasource.getProductsByIds).mockResolvedValue(fakeProducts);

    const result = await repository.getProductsByIds(["product_1"]);

    expect(mockDatasource.getProductsByIds).toHaveBeenCalledWith(["product_1"]);
    expect(result).toEqual(fakeProducts);
  });

  it("should call getTemplates on datasource", async () => {
    const fakeTemplates: Array<Template> = [
      { id: "template_1", name: "Template", alignment: TemplateAlignment.Left },
    ];
    vi.mocked(mockDatasource.getTemplates).mockResolvedValue(fakeTemplates);

    const result = await repository.getTemplates();

    expect(mockDatasource.getTemplates).toHaveBeenCalled();
    expect(result).toEqual(fakeTemplates);
  });

  it("should call saveGrid on datasource", async () => {
    const mockGrid: Grid = [
      {
        id: "row-0",
        templateId: "template_1",
        products: [],
      },
    ];

    await repository.saveGrid(mockGrid);

    expect(mockDatasource.saveGrid).toHaveBeenCalledWith(mockGrid);
  });
});
