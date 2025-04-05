import { Box, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

type Props = {
  onClick: () => void;
};

export const AddRowPlaceholder = ({ onClick }: Props) => {
  return (
    <Box className={styles.placeholder}>
      <Box className={styles.placeholder__wrapper} onClick={onClick}>
        <AddCircleOutlineOutlinedIcon className={styles.placeholder__icon} />
        <Typography className={styles.placeholder__text}>
          Add new row
        </Typography>
      </Box>
    </Box>
  );
};
