import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Box, Fab } from "@mui/material";
import styles from "./styles.module.scss";

type Props = {
  isMinZoom: boolean;
  isMaxZoom: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
};

export const GridEditorActions = ({
  isMinZoom,
  isMaxZoom,
  onZoomIn,
  onZoomOut,
  onReset,
}: Props) => {
  return (
    <Box className={styles.actions}>
      <Fab
        color="secondary"
        aria-label="add"
        onClick={onZoomOut}
        disabled={isMinZoom}
      >
        <ZoomOutIcon />
      </Fab>
      <Fab
        color="secondary"
        aria-label="add"
        onClick={onZoomIn}
        disabled={isMaxZoom}
      >
        <ZoomInIcon />
      </Fab>
      <Fab color="secondary" aria-label="add" onClick={onReset}>
        <RestartAltIcon />
      </Fab>
    </Box>
  );
};
