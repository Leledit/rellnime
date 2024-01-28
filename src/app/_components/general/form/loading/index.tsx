import { CircularProgress } from "@mui/material";
import styles from "./index.module.scss";

interface props {
  loading: boolean;
}

export default function FormLoading({ loading }: props) {
  if (!loading) {
    return <></>;
  }

  return (
    <div className={styles.containerLoading}>
      <CircularProgress sx={{ color: "rgb(123, 192, 255)" }} />
    </div>
  );
}
