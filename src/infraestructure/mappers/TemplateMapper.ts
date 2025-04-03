import { TemplateAlignment } from "@/domain/models/Template";
import type { Template } from "@/domain/models/Template";
import type { TemplateDTO } from "../dtos/TemplateDTO";

export class TemplateMapper {
  static toDomain(dto: TemplateDTO): Template {
    if (!this.isValidAlignment(dto.alignment)) {
      throw new Error(`Invalid alignment: ${dto.alignment}`);
    }

    return {
      id: dto.id,
      name: dto.name,
      alignment: dto.alignment as TemplateAlignment,
    };
  }

  static fromJson(json: Array<TemplateDTO>): Array<Template> {
    return json.map(this.toDomain);
  }

  private static isValidAlignment(value: unknown): value is TemplateAlignment {
    return Object.values(TemplateAlignment).includes(
      value as TemplateAlignment
    );
  }
}
