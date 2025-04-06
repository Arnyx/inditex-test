import { type Template, TemplateAlignment } from "@/domain/models/Template";
import styles from "../styles.module.scss";
import { MAX_PRODUCTS_ROW_LENGTH } from "@/config/constants";
import { DraftProductRow } from "@/presentation/grid-editor/models/DraftProductRow";
import { useMemo } from "react";

type Props = {
  draggedRow: DraftProductRow | null;
  rowId: string;
  products: DraftProductRow["products"];
  isOver: boolean;
  templates?: Array<Template>;
  templateId?: string;
};

export const useProductRowStyles = ({
  draggedRow,
  rowId,
  products,
  isOver,
  templates,
  templateId,
}: Props) => {
  const selectedTemplate = useMemo(() => {
    return templates?.find((template) => template.id === templateId);
  }, [templates, templateId]);

  const isSourceRow = draggedRow?.id === rowId;
  const isBlocked = products.length === MAX_PRODUCTS_ROW_LENGTH;

  const alignmentMap = {
    [TemplateAlignment.Left]: "flex-start",
    [TemplateAlignment.Center]: "center",
    [TemplateAlignment.Right]: "flex-end",
  };

  const justifyContent =
    alignmentMap[selectedTemplate?.alignment ?? TemplateAlignment.Left];

  const classNames = [
    styles.row,
    draggedRow ? styles["row--dragging"] : "",
    isSourceRow ? styles["row--active"] : "",
    isOver ? styles["row--over"] : "",
    isBlocked ? styles["row--blocked"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return { justifyContent, classNames };
};
