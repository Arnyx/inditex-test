import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Product } from "@/domain/models/Product";
import { ProductCard } from "../../Card";

type Props = {
  product: Product;
  isOver: boolean;
};

export const SortableProductCard = ({ product, isOver }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
    opacity: isOver ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ProductCard product={product} />
    </div>
  );
};
