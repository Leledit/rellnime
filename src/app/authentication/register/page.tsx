"use client";
import HeaderForms from "@/app/_components/general/form/headerFormes";
import AccessByOtherProviders from "@/app/_components/user/accessByOtherProviders";
import FormInput from "@/app/_components/general/form/input";
import Button from "@/app/_components/general/button";
import FormLink from "@/app/_components/general/link";
import { FormEvent, useState } from "react";
import { handleChancheField, onValidateFieldsEmpty } from "@/app/_utils/formHandling";

interface formFild {
  email: {
    value: string;
    error: boolean;
  };
  name: {
    value: string;
    error: boolean;
  };
  password: {
    value: string;
    error: boolean;
  };
  confirmPassword: {
    value: string;
    error: boolean;
  };
}

export default function AuthenticationLogin() {
  const initialValueFormsFilds: formFild = {
    email: {
      value: "",
      error: false,
    },
    name: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    },
    confirmPassword: {
      value: "",
      error: false,
    },
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [formsFilds, setFormsFilds] = useState<formFild>(
    initialValueFormsFilds
  );

  const handleRegisterEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await onValidateFieldsEmpty(setFormsFilds);
    
  }

  return (
    <>
      <HeaderForms titleForm="Cadastro" />
      <form>
        <FormInput
          label="E-mail:"
          name="email"
          type="email"
          onChange={(e) => {
            handleChancheField(e, setFormsFilds, formsFilds);
          }}
          error={formsFilds.email.error}
        />
        <FormInput
          label="Name:"
          name="name"
          type="text"
          onChange={(e) => {
            handleChancheField(e, setFormsFilds, formsFilds);
          }}
          error={formsFilds.name.error}
        />
        <FormInput
          label="Senha:"
          name="password"
          type="password"
          onChange={(e) => {
            handleChancheField(e, setFormsFilds, formsFilds);
          }}
          error={formsFilds.password.error}
        />
        <FormInput
          label="Confirmar senha:"
          name="confirmPassword"
          type="password"
          onChange={(e) => {
            handleChancheField(e, setFormsFilds, formsFilds);
          }}
          error={formsFilds.confirmPassword.error}
        />
        <FormLink destiny="/authentication/login" text="Ja possui conta?" />
        <Button text="Cadastrar" type="submit" />
      </form>
      <AccessByOtherProviders parentComponentIdentification="login" />
    </>
  );
}
