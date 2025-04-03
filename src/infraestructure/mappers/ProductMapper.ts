import type { Product } from "@/domain/models/Product";
import type { ProductDTO } from "../dtos/ProductDTO";

export class ProductMapper {
  static toDomain(dto: ProductDTO): Product {
    return {
      id: dto.id,
      name: dto.name,
      price: dto.price,
      image: dto.image,
    };
  }

  static fromJson(dtos: ProductDTO[]): Product[] {
    return dtos.map(this.toDomain);
  }
}
