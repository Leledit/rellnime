"use client";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import styles from "../index.module.scss";
import { AvailableSharesModalState } from "@/app/_interface/components";
import { IGenre } from "@/app/_interface/dataBd";
import adapterGenresChanging from "@/app/_adapter/genres/changing";
import { getTolkenCookie } from "@/app/_utils/cookies/cookies";
import { ImensagemRequest } from "@/app/_interface/forms";

interface IProps {
  setModalState: Dispatch<SetStateAction<AvailableSharesModalState>>;
  setMensagemRequest: Dispatch<SetStateAction<ImensagemRequest>>;
  genre: IGenre;
}

export default function AdmPopUpAvailableSharesEdition({
  setModalState,
  setMensagemRequest,
  genre,
}: IProps) {
  const [fildGenre, setFildGenre] = useState<string>(genre.name);
  const [validationMessages, setValidationMessages] = useState<string>();
  const accessToken = getTolkenCookie();
  return (
    <form className={styles.containerForm}>
      <label className={styles.formLabel}>Nome :</label>
      <div className={styles.containerAlign} style={{ marginBottom: "20px" }}>
        <input
          type="search"
          className={styles.input}
          name="search"
          onChange={(e) => {
            setFildGenre(e.target.value);
          }}
          value={fildGenre}
        />
      </div>
      <p className={styles.validationMessages}>{validationMessages}</p>
      <div className={styles.containerShares}>
        <button
          className={styles.share}
          onClick={() => {
            setModalState("options");
          }}
        >
          Cancelar
        </button>
        <button
          className={styles.share}
          onClick={(e) => {
            handleEditAction(e);
          }}
        >
          Editar
        </button>
      </div>
    </form>
  );

  async function handleEditAction(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (fildGenre !== "" && fildGenre.length > 0) {
      setValidationMessages("");
      const resultRequest = await adapterGenresChanging(
        { id: genre.id, name: fildGenre },
        accessToken
      );

      if (resultRequest === 500) {
        setMensagemRequest({
          status: 500,
          message: "Problemas ao fazer a edição do genero!",
        });
      } else {
        setMensagemRequest({
          status: 200,
          message: resultRequest.details,
        });
        setModalState("messages");
      }
    } else {
      setValidationMessages("O campo nome não pode estar vazio");
    }
  }
}
