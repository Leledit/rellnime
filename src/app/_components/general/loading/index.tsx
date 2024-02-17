import { CircularProgress } from "@mui/material";
import styles from "./index.module.scss";
interface IProps {
  width: number;
  height: number;
  loading: boolean;
}

export default function LoadingComponent({ width, height, loading }: IProps) {
  if (loading) {
    return (
      <div className={styles.containerLoading}>
        <CircularProgress
          style={{
            color: "rgba(123, 192, 255, 1)",
            width: width,
            height: height,
          }}
        />
      </div>
    );
  } else {
    return <></>;
  }
}
