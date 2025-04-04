import { Box, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

type Props = {
  onClick: () => void;
};

export const AddRowPlaceholder = ({ onClick }: Props) => {
  return (
    <Box className={styles.placeholder} onClick={onClick}>
      <AddCircleTwoToneIcon className={styles.placeholder__icon} />
      <Typography variant="body1" className={styles.placeholder__text}>
        Add new row
      </Typography>
    </Box>
  );
};
