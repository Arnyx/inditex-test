import { ProductRow } from "@/domain/models/ProductRow";
import { InditexRepositoryImpl } from "@/infraestructure/repositories/InditexRepositoryImpl";
import { useSnackbarStore } from "@/presentation/shared/store/snackbarStore";
import { useMutation } from "@tanstack/react-query";
import { mapDraftToDomain } from "../mappers/toDomainGrid";
import { DraftProductRow } from "../models/DraftProductRow";

export const useSaveGrid = (
  rows: DraftProductRow[],
  repository: InditexRepositoryImpl
) => {
  const { addSnackbar } = useSnackbarStore();

  const { mutate: save, isPending: isSaving } = useMutation({
    mutationFn: (grid: ProductRow[]) => repository.saveGrid(grid),
    onSuccess: () => {
      addSnackbar({ message: "Grid saved successfully", type: "success" });
    },
    onError: (error) => {
      addSnackbar({
        message: error.message || "Error saving grid",
        type: "error",
      });
    },
  });

  const handleSave = () => {
    if (rows.some((row) => !row.templateId)) {
      addSnackbar({
        message: "All rows must have a template",
        type: "error",
      });
      return;
    }

    if (rows.some((row) => row.products.length === 0)) {
      addSnackbar({
        message: "All rows must have at least one product",
        type: "error",
      });
      return;
    }

    save(mapDraftToDomain(rows));
  };

  return { handleSave, isSaving };
};
