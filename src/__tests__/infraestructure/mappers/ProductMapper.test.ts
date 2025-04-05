import { ProductMapper } from "@/infraestructure/mappers/ProductMapper";
import type { ProductDTO } from "@/infraestructure/dtos/ProductDTO";
import { Product } from "@/domain/models/Product";

describe("ProductMapper", () => {
  const mockDto: ProductDTO = {
    id: "123",
    name: "Test Product",
    price: 19.99,
    image: "test.jpg",
  };

  const mockDomain: Product = {
    id: "123",
    name: "Test Product",
    price: 19.99,
    image: "test.jpg",
  };

  it("should map a single ProductDTO to Product", () => {
    const result = ProductMapper.toDomain(mockDto);

    expect(result).toEqual(mockDomain);
  });

  it("should map an array of ProductDTOs to Products", () => {
    const result = ProductMapper.fromJson([mockDto, mockDto]);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(mockDto);
  });
});
