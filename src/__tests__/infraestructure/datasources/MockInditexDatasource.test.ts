import { MockInditexDatasource } from "@/infraestructure/datasources/MockInditexDatasource";

vi.mock("@/config/mock-data/products.json", () => ({
  default: [
    { id: "1", name: "Product 1", price: 100 },
    { id: "2", name: "Product 2", price: 200 },
  ],
}));
vi.mock("@/config/mock-data/templates.json", () => ({
  default: [
    {
      id: "template_1",
      name: "Left Aligned",
      alignment: "LEFT",
    },
  ],
}));

describe("MockInditexDatasource", () => {
  const datasource = new MockInditexDatasource();

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns products by ids", async () => {
    const promise = datasource.getProductsByIds(["1"]);
    vi.advanceTimersByTime(2000);
    const products = await promise;

    expect(products).toHaveLength(1);
    expect(products[0].id).toBe("1");
  });

  it("returns all products if no ids", async () => {
    const promise = datasource.getProductsByIds(null);
    vi.advanceTimersByTime(2000);
    const products = await promise;

    expect(products.length).toBe(2);
  });

  it("returns templates", async () => {
    const result = await datasource.getTemplates();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("template_1");
  });
});
