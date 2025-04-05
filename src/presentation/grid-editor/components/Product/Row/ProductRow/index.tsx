import { Template } from "@/domain/models/Template";
import { DraftProductRow } from "@/presentation/grid-editor/models/DraftProductRow";
import { useDroppable } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import { HTMLAttributes, useMemo } from "react";
import { SortableProductCard } from "../../Card/SortableProductCard";
import { ProductRowActions } from "./Actions";
import { useProductRowStyles } from "./hooks/useProductRowStyles";
import styles from "./styles.module.scss";

type Props = {
  row: DraftProductRow;
  draggedRow: DraftProductRow | null;
  overProductId: string | null;
  dragHandleProps?: HTMLAttributes<HTMLElement>;
  currentZoom: number;
  templates?: Array<Template>;
  onDelete: (id: string) => void;
  onTemplateChange: (rowId: string, templateId: string) => void;
};

export const ProductRow = ({
  row: { id, products, templateId },
  draggedRow,
  overProductId,
  dragHandleProps,
  currentZoom,
  templates,
  onDelete,
  onTemplateChange,
}: Props) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  const selectedTemplate = useMemo(() => {
    return templates?.find((template) => template.id === templateId);
  }, [templates, templateId]);

  const { justifyContent, classNames } = useProductRowStyles({
    draggedRow,
    rowId: id,
    products,
    isOver,
    selectedTemplate,
  });

  return (
    <Box style={{ justifyContent }} className={classNames} ref={setNodeRef}>
      <ProductRowActions
        id={id}
        selectedTemplateId={templateId}
        showDeleteButton={!products.length}
        dragHandleProps={dragHandleProps}
        templates={templates}
        onDelete={onDelete}
        onTemplateChange={onTemplateChange}
      />

      <Box component="ul" className={styles.row__list}>
        <SortableContext
          items={products.map((p) => p.id)}
          strategy={horizontalListSortingStrategy}
        >
          {products.map((product) => (
            <Box component="li" key={product.id}>
              <SortableProductCard
                product={product}
                isOver={overProductId === product.id}
                currentZoom={currentZoom}
              />
            </Box>
          ))}
        </SortableContext>
      </Box>
    </Box>
  );
};
