import { TemplateMapper } from "@/infraestructure/mappers/TemplateMapper";
import type { TemplateDTO } from "@/infraestructure/dtos/TemplateDTO";
import { Template, TemplateAlignment } from "@/domain/models/Template";

describe("TemplateMapper", () => {
  const mockDto: TemplateDTO = {
    id: "template-1",
    name: "Grid Layout",
    alignment: "LEFT",
  };

  const mockDomain: Template = {
    id: "template-1",
    name: "Grid Layout",
    alignment: TemplateAlignment.Left,
  };

  it("should map a valid TemplateDTO to Template", () => {
    const result = TemplateMapper.toDomain(mockDto);
    expect(result).toEqual(mockDomain);
  });

  it("should map an array of TemplateDTOs to Templates", () => {
    const result = TemplateMapper.fromJson([mockDto, mockDto]);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(mockDomain);
  });

  it("should throw an error for invalid alignment", () => {
    const invalidDto: TemplateDTO = {
      ...mockDto,
      alignment: "invalidAlignment" as TemplateAlignment,
    };

    expect(() => TemplateMapper.toDomain(invalidDto)).toThrowError();
  });
});
