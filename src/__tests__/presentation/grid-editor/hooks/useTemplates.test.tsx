import { type Template, TemplateAlignment } from "@/domain/models/Template";
import { InditexRepositoryImpl } from "@/infraestructure/repositories/InditexRepositoryImpl";
import { useTemplates } from "@/presentation/grid-editor/hooks/useTemplates";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useTemplates", () => {
  it("fetches templates using the repository", async () => {
    const mockTemplates: Template[] = [
      { id: "1", name: "Template A", alignment: TemplateAlignment.Left },
      { id: "2", name: "Template B", alignment: TemplateAlignment.Right },
    ];

    const mockRepository = {
      getTemplates: vi.fn().mockResolvedValue(mockTemplates),
    } as unknown as InditexRepositoryImpl;

    const { result } = renderHook(() => useTemplates(mockRepository), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockRepository.getTemplates).toHaveBeenCalled();
    expect(result.current.data).toEqual(mockTemplates);
  });
});
