"use client";
import HeaderForms from "@/app/_components/general/form/headerFormes";
import styles from "./index.module.scss";
import FormInput from "@/app/_components/general/form/input";
import Button from "@/app/_components/general/button";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  handleChancheField,
  onValidateFieldsEmpty,
} from "@/app/_utils/formHandling";
import FormLoading from "@/app/_components/general/form/loading";

interface formFild {
  email: {
    value: string;
    error: boolean;
  };
}

export default function PasswordRecovery() {
  const initialValueFormsFilds: formFild = {
    email: {
      value: "",
      error: false,
    },
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [formsFilds, setFormsFilds] = useState<formFild>(
    initialValueFormsFilds
  );
  const router = useRouter();

  return (
    <>
      <HeaderForms
        titleForm="Recuperação de senha"
        customStylesTitle={{ fontSize: "28px" }}
      />
      <form
        onSubmit={(e) => {
          handlePasswordRecoveryEvent(e);
        }}
      >
        <h2 className={styles.descripForm}>
          Para recuperar sua senha, por favor informe seu Email. ao pressionar o
          botão ‘enviar’, será enviado um e-mail, com passos necessários para
          você alterar sua senha.  
        </h2>
        <FormInput
          label="E-mail:"
          name="email"
          type="email"
          error={formsFilds.email.error}
          onChange={(e) => {
            handleChancheField(e, setFormsFilds, formsFilds);
          }}
        />
        <FormLoading loading={loading} />
        <Button text="Recuperar" type="submit" />
      </form>
    </>
  );

  async function handlePasswordRecoveryEvent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    await onValidateFieldsEmpty(setFormsFilds);

    if (!Object.values(formsFilds).some((field) => field.error)) {
      setTimeout(() => {
        router.push("/");
        setLoading(false);
      }, 2000);

    }else{
      setLoading(false);
    }

  };
}
