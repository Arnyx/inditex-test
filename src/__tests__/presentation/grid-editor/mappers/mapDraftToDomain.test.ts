import { mapDraftToDomain } from "@/presentation/grid-editor/mappers/mapDraftToDomain";
import { DraftProductRow } from "@/presentation/grid-editor/models/DraftProductRow";

describe("mapDraftToDomain", () => {
  it("maps DraftProductRow to ProductRow correctly", () => {
    const draftRows: DraftProductRow[] = [
      {
        id: "row-1",
        templateId: "template-1",
        products: [
          { id: "p1", name: "Product 1", price: 10, image: "image1.jpg" },
          { id: "p2", name: "Product 2", price: 20, image: "image2.jpg" },
        ],
      },
    ];

    const result = mapDraftToDomain(draftRows);

    expect(result).toEqual([
      {
        id: "row-1",
        templateId: "template-1",
        products: ["p1", "p2"],
      },
    ]);
  });

  it("throws if a row does not have a templateId", () => {
    const draftRows: DraftProductRow[] = [
      {
        id: "row-2",
        templateId: undefined,
        products: [
          { id: "p3", name: "Product 3", price: 30, image: "image3.jpg" },
        ],
      },
    ];

    expect(() => mapDraftToDomain(draftRows)).toThrowError(
      "Row row-2 has no templateId"
    );
  });
});
