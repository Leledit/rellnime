import { ImensagemRequest } from "@/app/_interface/forms";
import styles from "../index.module.scss";

interface IProps {
  mensagemRequest: ImensagemRequest;
  onClosed: (reloadComponents: boolean) => void;
}

export default function AdmPopUpAvailableSharesMessages({
  mensagemRequest,
  onClosed,
}: IProps) {
  return (
    <div className={styles.containerMessages}>
      <p style={{ color: mensagemRequest.status === 500 ? "red" : "green" }}>
        {mensagemRequest.message}
      </p>
      <button
        className={styles.share}
        onClick={() => {
          onClosed(true);
        }}
      >
        Ok
      </button>
    </div>
  );
}
