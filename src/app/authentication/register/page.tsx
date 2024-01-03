"use client";
import HeaderForms from "@/app/_components/general/form/headerFormes";
import AccessByOtherProviders from "@/app/_components/user/accessByOtherProviders";
import FormInput from "@/app/_components/general/form/input";
import Button from "@/app/_components/general/button";
import FormLink from "@/app/_components/general/link";
import { FormEvent, useState } from "react";
import {
  handleChancheField,
  onValidateFieldsEmpty,
} from "@/app/_utils/formHandling";
import adapterAuthenticationRegister from "@/app/_adapter/authentication/register";
import { ImensagemRequest } from "@/app/_interface/forms";
import { setTolkenCookie } from "@/app/_utils/cookies/cookies";
import { useRouter } from "next/navigation";
import FormMessage from "@/app/_components/general/form/message";
import FormLoading from "@/app/_components/general/form/loading";

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
  const router = useRouter();

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
  const [mensagemRequest, setMensagemRequest] = useState<ImensagemRequest>({
    status: 0,
    message: "",
  });
  const [formsFilds, setFormsFilds] = useState<formFild>(
    initialValueFormsFilds
  );

  const handleRegisterEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await onValidateFieldsEmpty(setFormsFilds);

    if (!Object.values(formsFilds).some((field) => field.error)) {
      if (checkPasswordMatch()) {
        const resultRequest = await adapterAuthenticationRegister({
          email: formsFilds.email.value,
          name: formsFilds.name.value,
          password: formsFilds.password.value,
        });

        if (resultRequest === 500) {
          setMensagemRequest({
            message: "Problemas ao realizar o cadastro",
            status: 500,
          });
        } else {
          setMensagemRequest({
            message: "Cadastro efetuado com sucesso",
            status: 200,
          });
        }

        //Cadastrando o tolken do usuario
        setTolkenCookie(resultRequest.tolken);
        //redireciona o usuario apos o cadastro

        router.push("/");
      } else {
        setMensagemRequest({
          message: "Senhas não corespondentes!",
          status: 500,
        });
      }

      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const checkPasswordMatch = () => {
    if (formsFilds.password.value === formsFilds.confirmPassword.value) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <HeaderForms titleForm="Cadastro" />
      <form
        onSubmit={(e) => {
          handleRegisterEvent(e);
        }}
      >
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
        <FormLoading loading={loading} />
        <FormMessage mensagemRequest={mensagemRequest} />
        <Button text="Cadastrar" type="submit" />
      </form>
      <AccessByOtherProviders parentComponentIdentification="login" />
    </>
  );
}
