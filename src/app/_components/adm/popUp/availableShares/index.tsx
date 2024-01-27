"use client";
import { ImensagemRequest } from "@/app/_interface/forms";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { MouseEvent, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./index.module.scss";
import { IGenre } from "@/app/_interface/dataBd";
import AdapterGenresDelete from "@/app/_adapter/genres/delete";
import { getTolkenCookie } from "@/app/_utils/cookies/cookies";
import FormLoading from "@/app/_components/general/form/loading";
import FormMessage from "@/app/_components/general/form/message";

interface IProps {
  open: boolean;
  onClosed: (reloadComponents:boolean) => void;
  genre: IGenre;
}

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    width: "700px",
  },
}));

type ModalState = "options" | "deletionConfirmation" | "edition" | "messages";

export default function AdmPopUpAvailableShares({
  open,
  onClosed,
  genre,
}: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [modalState, setModalState] = useState<ModalState>("options");
  const [fildGenre, setFildGenre] = useState<string>("");
  const [mensagemRequest, setMensagemRequest] = useState<ImensagemRequest>({
    message: "",
    status: 0,
  });

  const accessToken = getTolkenCookie();

  const renderPopUp = () => {
    switch (modalState) {
      case "options":
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
        break;
      case "deletionConfirmation":
        return (
          <div className={styles.containerDeletion}>
            <h2 className={styles.deletionTitle}>
              Deseja realmente excluir esse genero?
            </h2>
            <div className={styles.containerShares}>
              <button
                className={styles.share}
                onClick={() => {
                  handleTheDeleteAction();
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
        break;
      case "edition":
        return (
          <form className={styles.containerForm}>
            <label className={styles.formLabel}>Nome :</label>
            <div
              className={styles.containerAlign}
              style={{ marginBottom: "20px" }}
            >
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
        break;
      case "messages":
        return <div className={styles.containerMessages}>
          {/*mensagemRequest */}
          <p
            style={{ color: mensagemRequest.status === 500 ? "red" : "green" }}
          >
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
        </div>;
        break;
    }
  };

  return (
    <CustomDialog open={open}>
      <DialogTitle className={styles.dialogTitle}>
        {returnPopUpTitle()}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => {
          onClosed(false);
          setModalState("options");
        }}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <div>{renderPopUp()}</div>
      </DialogContent>
    </CustomDialog>
  );

  function handleEditAction(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log("editando um genero");
  }

  async function handleTheDeleteAction() {
    const resultRequest = await AdapterGenresDelete(genre.id, accessToken);

    if (resultRequest === 500) {
      setMensagemRequest({
        status: 500,
        message: "Problemas ao fazer a exclusão do genero!",
      });
    } else {
      setMensagemRequest({
        status: 200,
        message: resultRequest.details,
      });
      setModalState("messages");
    }
  }

  function returnPopUpTitle() {
    switch (modalState) {
      case "options":
        return "Ações disponiveis";
        break;
      case "edition":
        return "Editando genero";
        break;
      case "deletionConfirmation":
        return "Exclusão de genero";
        break;
      case "messages":
        return "Status da ação";
        break;
    }
  }
}
