import type { ReactNode } from "react";
import { create } from "zustand";

type Snackbar = {
  message: string | ReactNode;
  type?: "success" | "error" | "info";
  closeTime?: number;
};

type SnackbarStore = {
  queue: Array<Snackbar>;
  addSnackbar: (snackbar: Snackbar) => void;
  removeSnackbar: () => void;
};

export const useSnackbarStore = create<SnackbarStore>((set) => ({
  queue: [],
  addSnackbar: (snackbar) =>
    set((state) => ({ queue: [...state.queue, snackbar] })),
  removeSnackbar: () => set((state) => ({ queue: state.queue.slice(1) })),
}));
