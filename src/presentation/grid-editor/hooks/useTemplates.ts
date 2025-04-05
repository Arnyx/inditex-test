import { Template } from "@/domain/models/Template";
import { createInditexRepository } from "@/infraestructure/factories/inditexRepositoryFactory";
import { useQuery } from "@tanstack/react-query";

const repository = createInditexRepository();

export const useTemplates = () => {
  return useQuery<Array<Template>>({
    queryKey: ["templates"],
    queryFn: () => repository.getTemplates(),
  });
};
