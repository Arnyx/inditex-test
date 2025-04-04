import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "@/domain/models/Product";
import styles from "./Card.module.scss";
import { useDraggable } from "@dnd-kit/core";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: product.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={styles.card}
      elevation={0}
      variant="outlined"
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        className={styles.card__image}
      />
      <CardContent className={styles.card__content}>
        <Typography>{product.name}</Typography>
        <Typography>{product.price.toFixed(2)} EUR</Typography>
      </CardContent>
    </Card>
  );
};
