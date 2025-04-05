import { Snackbar as MuiSnackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbarStore } from "../store/snackbarStore";

const DURATION = 3000;
const ANIMATION_DURATION = 300;

export const Snackbar = () => {
  const { queue, removeSnackbar } = useSnackbarStore();
  const [open, setOpen] = useState(false);
  const current = queue[0];

  useEffect(() => {
    if (current) setOpen(true);
  }, [current]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => removeSnackbar(), ANIMATION_DURATION);
  };

  if (!current) return null;

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={current.closeTime ?? DURATION}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={current.type || "info"}
        sx={{ width: "100%" }}
      >
        {current.message}
      </Alert>
    </MuiSnackbar>
  );
};
