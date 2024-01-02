"use client";

import HeaderForms from "@/app/_components/general/form/headerFormes";
import FormInput from "@/app/_components/general/form/input";
import Button from "@/app/_components/general/button";
import AccessByOtherProviders from "@/app/_components/user/accessByOtherProviders";
import FormLink from "@/app/_components/general/link";
import { FormEvent, useState } from "react";
import { handleChancheField, onValidateFieldsEmpty } from "@/app/_utils/formHandling";

interface formFild {
  email: {
    value: string;
    error: boolean;
  };
  password: {
    value: string;
    error: boolean;
  };
}

export default function AuthenticationLogin() {
  const initialValueFormsFilds: formFild = {
    email: {
      error: false,
      value: "",
    },
    password: {
      error: false,
      value: "",
    },
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [formsFilds, setFormsFilds] = useState<formFild>(
    initialValueFormsFilds
  );
  
  const handleLoginEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await onValidateFieldsEmpty(setFormsFilds);
  }

  return (
    <>
      <HeaderForms titleForm="Login" />
      <form onSubmit={(e)=>{handleLoginEvent(e)}}>
        <FormInput
          label="E-mail:"
          name="email"
          type="text"
          onChange={(e) => {
            handleChancheField(e, setFormsFilds, formsFilds);
          }}
          error={formsFilds.email.error}
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
        <FormLink destiny="/authentication/register" text="Esqueceu a senha?" />
        <Button text="Login" type="submit" />
      </form>
      <AccessByOtherProviders parentComponentIdentification="login" />
    </>
  );
}
