"use client";
import { TextField } from "@mui/material";
import styled from "styled-components";

const CustomizedTextField = styled(TextField)({
  "&.css-1u3bzj6-MuiFormControl-root-MuiTextField-root": {
    label: {
      color: "rgba(0,0,0,1)",
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
  type: "text" | "email" | "password";
}

export default function FormInput({ label, name, type }: props) {
  return (
    <CustomizedTextField
      name={name}
      label={label}
      variant="filled"
      type={type}
      style={{
        width: "100%",
        marginBottom: "35px",
      }}
    />
  );
}
