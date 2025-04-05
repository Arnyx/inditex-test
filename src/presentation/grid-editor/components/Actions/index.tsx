import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { Box, Fab } from "@mui/material";
import styles from "./styles.module.scss";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

type Props = {
  isMinZoom: boolean;
  isMaxZoom: boolean;
  isSaving: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onSave: () => void;
};

export const GridEditorActions = ({
  isMinZoom,
  isMaxZoom,
  isSaving,
  onZoomIn,
  onZoomOut,
  onSave,
}: Props) => {
  return (
    <Box className={styles.actions}>
      <Fab
        color="secondary"
        size="medium"
        aria-label="add"
        onClick={onZoomOut}
        disabled={isMinZoom}
      >
        <ZoomOutIcon />
      </Fab>
      <Fab
        color="secondary"
        size="medium"
        aria-label="add"
        onClick={onZoomIn}
        disabled={isMaxZoom}
      >
        <ZoomInIcon />
      </Fab>
      <Fab color="success" size="medium" disabled={isSaving} onClick={onSave}>
        <SaveOutlinedIcon />
      </Fab>
    </Box>
  );
};
