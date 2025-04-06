import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { Product } from "@/domain/models/Product";
import styles from "./Card.module.scss";

type Props = {
  product: Product;
  hasDragOverlay?: boolean;
  currentZoom: number;
};

export const ProductCard = ({
  product,
  hasDragOverlay,
  currentZoom,
}: Props) => {
  const overlayClassName = hasDragOverlay
    ? styles["card--overlay"]
    : styles.card;
  const smallZoomClassName =
    currentZoom < 0.5 ? styles["card--small-zoom"] : styles.card;

  return (
    <Card
      className={`${styles.card} ${overlayClassName} ${smallZoomClassName}`}
      variant="outlined"
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        className={styles.card__image}
      />
      <CardContent className={styles.card__content}>
        <Typography className={styles.card__name}>{product.name}</Typography>
        <Typography className={styles.card__price}>
          {product.price.toFixed(2)} EUR
        </Typography>
      </CardContent>
    </Card>
  );
};
