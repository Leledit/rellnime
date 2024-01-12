"use client";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import styles from "./index.module.scss";
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';
import { FormEvent } from "react";
//import iconMagnifyingGlass from '../../../../../../public/images/adm/form/iconMagnifyingGlass.png';

interface props {
  open: boolean;
  onClosed: () => void;
}

export default function AdmPopUpAddGenre({ open, onClosed }: props) {
  const CustomDialog = styled(Dialog)(({ theme }) => ({
    /*'& .MuiDialogContent-root': {
        width:'700px',
     
    }*/
    '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper':{

        width:'700px',
    }
  }));

  const handleAddGenderEvent = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Fazer procedimento de adicionar
    console.log("Adicionando genero a um item!!");
  }

  return (
    <>
      <CustomDialog open={open}>
        <DialogTitle className={styles.dialogTitle}>
          Adicionar genero
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClosed}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
            <form className={styles.containerForm} onSubmit={(e)=>{handleAddGenderEvent(e)}}>
                <label className={styles.formLabel}>Pesquisar :</label>
                <div className={styles.containerAlign}>
                    <input type="search" className={styles.input} />
                    <button type="submit" className={styles.button}/>
                </div>
            </form>  
        </DialogContent>
      </CustomDialog>
    </>
  );
}
