import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";

vi.mock("@/presentation/shared/store/snackbarStore", () => ({
  useSnackbarStore: () => ({
    addSnackbar: vi.fn(),
  }),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  const testQueryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>,
    options
  );
};

export { renderWithProviders };
