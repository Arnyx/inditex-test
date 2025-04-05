import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ExtensionIcon from "@mui/icons-material/Extension";
import { Box, IconButton, Popover } from "@mui/material";
import { HTMLAttributes, useState } from "react";
import { TemplateSelection } from "../TemplateSelection";
import styles from "./styles.module.scss";
import { Template } from "@/domain/models/Template";

type Props = {
  id: string;
  showDeleteButton: boolean;
  dragHandleProps?: HTMLAttributes<HTMLElement>;
  templates?: Array<Template>;
  selectedTemplateId?: string;
  onDelete: (id: string) => void;
  onTemplateChange: (rowId: string, templateId: string) => void;
};

export const ProductRowActions = ({
  id,
  showDeleteButton,
  dragHandleProps,
  templates,
  selectedTemplateId,
  onDelete,
  onTemplateChange,
}: Props) => {
  const [templateAnchorEl, setTemplateAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const handleTemplatePopoverOpen = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setTemplateAnchorEl(event.currentTarget);
  };

  const handleTemplatePopoverClose = () => {
    setTemplateAnchorEl(null);
  };

  const templatePopoverOpen = Boolean(templateAnchorEl);
  const templatePopoverId = templatePopoverOpen
    ? "template-popover"
    : undefined;

  return (
    <>
      <Box className={styles.actions}>
        {showDeleteButton && (
          <IconButton
            className={styles.actions__button}
            onClick={() => onDelete(id)}
          >
            <DeleteOutlineIcon />
          </IconButton>
        )}
        <IconButton
          aria-describedby={templatePopoverId}
          className={styles.actions__button}
          onClick={handleTemplatePopoverOpen}
        >
          <ExtensionIcon />
        </IconButton>
        <span {...dragHandleProps}>
          <IconButton
            className={`${styles.actions__button} ${styles["actions__button--drag"]}`}
            disableRipple
            disableFocusRipple
          >
            <DragIndicatorIcon fontSize="small" />
          </IconButton>
        </span>
      </Box>

      <Popover
        id={templatePopoverId}
        open={templatePopoverOpen}
        anchorEl={templateAnchorEl}
        onClose={handleTemplatePopoverClose}
      >
        <TemplateSelection
          id={id}
          templates={templates}
          selectedTemplateId={selectedTemplateId}
          onTemplateChange={onTemplateChange}
        />
      </Popover>
    </>
  );
};
