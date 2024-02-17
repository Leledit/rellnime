"use client";

import HeaderForms from "@/app/_components/general/form/headerFormes";
import FormInput from "@/app/_components/general/form/input";
import Button from "@/app/_components/general/button";
import FormLink from "@/app/_components/general/link";
import { FormEvent, useState } from "react";
import {
  handleChancheField,
  onValidateFieldsEmpty,
} from "@/app/_utils/formHandling";
import FormLoading from "@/app/_components/general/form/loading";
import adapterAuthenticationLogin from "@/app/_adapter/authentication/login";
import { ImensagemRequest } from "@/app/_interface/forms";
import FormMessage from "@/app/_components/general/form/message";
import { setTolkenCookie } from "@/app/_utils/cookies/cookies";
import getUserTypeFromToken from "@/app/_utils/tolken";
import { useRouter } from "next/navigation";
import { IAuthentication } from "@/app/_interface/returnFromApi";

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
  const router = useRouter();

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
  const [mensagemRequest, setMensagemRequest] = useState<ImensagemRequest>({
    status: 0,
    message: "",
  });
  const [formsFilds, setFormsFilds] = useState<formFild>(
    initialValueFormsFilds
  );

  return (
    <>
      <HeaderForms titleForm="Login" />
      <form
        onSubmit={(e) => {
          handleLoginEvent(e);
        }}
      >
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
        <FormLink destiny="/authentication/register" text="Não possui conta?" />
        <FormLoading loading={loading} />
        <FormMessage mensagemRequest={mensagemRequest} />
        <Button text="Login" type="submit" />
      </form>
    </>
  );

  async function handleLoginEvent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    await onValidateFieldsEmpty(setFormsFilds);

    if (!Object.values(formsFilds).some((field) => field.error)) {
      const resultRequest: IAuthentication | undefined =
        await adapterAuthenticationLogin({
          email: formsFilds.email.value,
          password: formsFilds.password.value,
        });

      if (!resultRequest) {
        setMensagemRequest({ message: "Usuario não encontrado!", status: 500 });
      } else if (resultRequest.tolken && resultRequest.message) {
        setMensagemRequest({
          message: resultRequest.message,
          status: 200,
        });

        //Cadastrando o tolken do usuario
        setTolkenCookie(resultRequest.tolken);
        //Verificando o tipo de usuairio e redirecionando
        const typeUser: any = getUserTypeFromToken(resultRequest.tolken);

        if (typeUser.papel === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        setMensagemRequest({
          message: resultRequest.message || "",
          status: 500,
        });
      }

      setLoading(false);
    } else {
      setLoading(false);
    }
  }
}
