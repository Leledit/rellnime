"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { ImensagemRequest } from "@/app/_interface/forms";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import styles from "./index.module.scss";
import { IGenre } from "@/app/_interface/returnFromApi";
import AdmPopUpAvailableSharesOptions from "./options";
import { AvailableSharesModalState } from "@/app/_interface/components";
import AdmPopUpAvailableSharesDeletionsConfirmation from "./deletionConfirmation";
import AdmPopUpAvailableSharesMessages from "./messages";
import AdmPopUpAvailableSharesEdition from "./edition";

interface IProps {
  open: boolean;
  onClosed: (reloadComponents: boolean) => void;
  genre: IGenre;
}

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    width: "700px",
  },
}));

export default function AdmPopUpAvailableShares({
  open,
  onClosed,
  genre,
}: IProps) {
  const [modalState, setModalState] =
    useState<AvailableSharesModalState>("options");

  const [mensagemRequest, setMensagemRequest] = useState<ImensagemRequest>({
    message: "",
    status: 0,
  });

  const renderPopUp = () => {
    switch (modalState) {
      case "options":
        return <AdmPopUpAvailableSharesOptions setModalState={setModalState} />;
        break;
      case "deletionConfirmation":
        return (
          <AdmPopUpAvailableSharesDeletionsConfirmation
            idGenre={genre.id}
            setMensagemRequest={setMensagemRequest}
            setModalState={setModalState}
          />
        );
        break;
      case "edition":
        return (
          <AdmPopUpAvailableSharesEdition
            setModalState={setModalState}
            genre={genre}
            setMensagemRequest={setMensagemRequest}
          />
        );
        break;
      case "messages":
        return (
          <AdmPopUpAvailableSharesMessages
            mensagemRequest={mensagemRequest}
            onClosed={onClosed}
          />
        );
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
