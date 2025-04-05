import { Template } from "@/domain/models/Template";
import { InditexRepositoryImpl } from "@/infraestructure/repositories/InditexRepositoryImpl";
import { useQuery } from "@tanstack/react-query";

export const useTemplates = (repository: InditexRepositoryImpl) => {
  return useQuery<Array<Template>>({
    queryKey: ["templates"],
    queryFn: () => repository.getTemplates(),
  });
};
