import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "@/domain/models/Product";
import styles from "./Card.module.scss";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => (
  <Card className={styles.card}>
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
