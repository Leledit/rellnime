import { Dispatch, SetStateAction } from "react";
import styles from "../index.module.scss";
import { AvailableSharesModalState } from "@/app/_interface/components";

interface IProps {
  setModalState: Dispatch<SetStateAction<AvailableSharesModalState>>;
}

export default function AdmPopUpAvailableSharesOptions({
  setModalState,
}: IProps) {
  return (
    <div className={styles.containerShares}>
      <div
        className={styles.share}
        onClick={() => {
          setModalState("deletionConfirmation");
        }}
      >
        Remover
      </div>
      <div
        className={styles.share}
        onClick={() => {
          setModalState("edition");
        }}
      >
        Editar
      </div>
    </div>
  );
}
