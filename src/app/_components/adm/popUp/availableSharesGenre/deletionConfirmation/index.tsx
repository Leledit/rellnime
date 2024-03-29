import { Dispatch, SetStateAction } from "react";
import styles from "../index.module.scss";
import AdapterGenresDelete from "@/app/_adapter/genres/delete";
import { AvailableSharesModalState } from "@/app/_interface/components";
import { getTolkenCookie } from "@/app/_utils/cookies/cookies";
import { ImensagemRequest } from "@/app/_interface/forms";
import { IMessageReturn } from "@/app/_interface/returnFromApi";

interface IProps {
  setModalState: Dispatch<SetStateAction<AvailableSharesModalState>>;
  idGenre: string;
  setMensagemRequest: Dispatch<SetStateAction<ImensagemRequest>>;
}

export default function AdmPopUpAvailableSharesDeletionsConfirmation({
  setModalState,
  idGenre,
  setMensagemRequest,
}: IProps) {
  const accessToken = getTolkenCookie();
  return (
    <div className={styles.containerDeletion}>
      <h2 className={styles.deletionTitle}>
        Deseja realmente excluir esse genero?
      </h2>
      <div className={styles.containerShares}>
        <button
          className={styles.share}
          onClick={() => {
            handleTheDeleteAction(idGenre);
          }}
        >
          Sim
        </button>
        <button
          className={styles.share}
          onClick={() => {
            setModalState("options");
          }}
        >
          Não
        </button>
      </div>
    </div>
  );

  async function handleTheDeleteAction(idGenre: string) {
    const resultRequest: IMessageReturn | undefined = await AdapterGenresDelete(
      idGenre,
      accessToken
    );

    if (!resultRequest) {
      setMensagemRequest({
        status: 500,
        message: "Problemas ao fazer a exclusão do genero!",
      });
    } else if (resultRequest.message) {
      setMensagemRequest({
        status: 200,
        message: resultRequest.details,
      });
      setModalState("messages");
    } else {
      setMensagemRequest({
        status: 500,
        message: resultRequest.details,
      });
    }
  }
}
