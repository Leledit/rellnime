"use client";
import { TextField } from "@mui/material";
import { ChangeEvent } from "react";
import styles from './index.module.scss';
import styled, { CSSProperties } from "styled-components";

const CustomizedTextField = styled(TextField)({
  "&.css-1u3bzj6-MuiFormControl-root-MuiTextField-root": {
    label: {
      color: "rgba(0, 0, 0, 0.6)",
      fontSize: "20px",
    },
    background: "rgba(123, 192, 255, 0.4)",
  },
  ":after": {
    borderColor: "rgba(123, 192, 255, 1)",
  },
});

interface props {
  label: string;
  name: string;
  type: "text" | "email" | "password" | "number"| "file";
  onChange: (e: any) => void;
  error: any;
  customClassComponent?: any,
  value?:any
}

export default function FormInput({
  label,
  name,
  type,
  onChange,
  error,
  customClassComponent,
  value
}: props) {
  return (
    <div className={customClassComponent} style={{width:'100%'}}>
      <CustomizedTextField
        name={name}
        label={label}
        variant="filled"
        type={type}
        error={error}
        value={value}
        className={styles.stylesInput}
        onChange={(e) => {
          onChange(e);
        }}
      />
      {error ? <p className={styles.msgErroInput}>Este campo é obrigatorio</p> : <></>}
    </div>
  );
}
