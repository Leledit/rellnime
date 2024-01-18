"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ImensagemRequest } from "@/app/_interface/forms";
import { getTolkenCookie } from "@/app/_utils/cookies/cookies";
import styles from "./index.module.scss";
import HeaderForms from "@/app/_components/general/form/headerFormes";
import FormInput from "@/app/_components/general/form/input";
import FormSelect from "@/app/_components/general/form/select";
import FormTextArea from "@/app/_components/general/form/textArea";
import FormFile from "@/app/_components/general/form/file";
import Button from "@/app/_components/general/button";
import FormLoading from "@/app/_components/general/form/loading";
import FormMessage from "@/app/_components/general/form/message";
import { onValidateFieldsEmpty } from "@/app/_utils/formHandling";
import { compressImage, convertBlobToBase64 } from "@/app/_utils/manipulatingImage";

interface formFild {
  name: {
    value: string;
    error: boolean;
  };
  visa: {
    value: string;
    error: boolean;
  };
  duration: {
    value: string;
    error: boolean;
  };
  launch: {
    value: string;
    error: boolean;
  };
  note: {
    value: string;
    error: boolean;
  };
  synopsis: {
    value: string;
    error: boolean;
  };
  img: {
    value: any;
    error: boolean;
  };
}

interface IProps {
  params: {
    type: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function FilmeForm({ params, searchParams }: IProps) {
  const initialValueFormsFilds: formFild = {
    name: {
      value: "",
      error: false,
    },
    visa: {
      value: "",
      error: false,
    },
    duration: {
      value: "",
      error: false,
    },
    launch: {
      value: "",
      error: false,
    },
    note: {
      value: "",
      error: false,
    },
    synopsis: {
      value: "",
      error: false,
    },
    img: {
      value: "",
      error: false,
    },
  };

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [mensagemRequest, setMensagemRequest] = useState<ImensagemRequest>({
    status: 0,
    message: "",
  });
  const [formsFilds, setFormsFilds] = useState<formFild>(
    initialValueFormsFilds
  );
  const accessToken = getTolkenCookie();
interface IProps {
  params: {
    type: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}
  return (
    <>
      <div className={styles.containerForm}>
        <div className={styles.breathingSpace}>
          <HeaderForms
            titleForm="Cadastro de filme"
            customStylesTitle={{ fontSize: "36px" }}
          />
          <form
            onSubmit={(e) => {
              handleRegisterEvent(e);
            }}
          >
            <div className={styles.aliginTwoFilds}>
              <FormInput
                label="Nome:"
                name="name"
                type="text"
                value={formsFilds.name.value}
                onChange={(e) => {
                  handleChancheField(e, setFormsFilds, formsFilds);
                }}
                error={formsFilds.name.error}
                customClassComponent={styles.filledName}
              />
              <FormSelect
                label="Visto:"
                name="visa"
                value={[`${formsFilds.visa.value}`]}
                error={formsFilds.visa.error}
                onChange={(e) => {
                  handleChancheField(e, setFormsFilds, formsFilds);
                }}
                options={["true", "false"]}
              />
            </div>
            <div className={styles.aliginThreeFilds}>
              <FormInput
                label="Duração:"
                name="duration"
                type="number"
                value={formsFilds.duration.value}
                onChange={(e) => {
                  handleChancheField(e, setFormsFilds, formsFilds);
                }}
                error={formsFilds.duration.error}
                customClassComponent={styles.marginRight}
              />
              <FormInput
                label="Lançamento:"
                name="launch"
                type="number"
                value={formsFilds.launch.value}
                onChange={(e) => {
                  handleChancheField(e, setFormsFilds, formsFilds);
                }}
                error={formsFilds.launch.error}
                customClassComponent={styles.marginRight}
              />
              <FormInput
                label="Nota:"
                name="note"
                type="number"
                value={formsFilds.note.value}
                onChange={(e) => {
                  handleChancheField(e, setFormsFilds, formsFilds);
                }}
                error={formsFilds.note.error}
                customClassComponent={styles.marginRight}
              />
            </div>
            <FormTextArea
              label="Sinops:"
              name="synopsis"
              error={formsFilds.synopsis.error}
              value={formsFilds.synopsis.value}
              onChange={(e) => {
                handleChancheField(e, setFormsFilds, formsFilds);
              }}
            />
            <div className={styles.uploadAndButton}>
              <FormFile
                label="Imagem:"
                name="img"
                value={formsFilds.img.value}
                onChange={(e) => {
                  handleChancheFieldFile(e, setFormsFilds, formsFilds);
                }}
                error={formsFilds.img.error}
                customClassComponent={styles.marginRight}
              />
              <Button
                text="Enviar"
                type="submit"
                customClassComponent={styles.button}
              />
            </div>
            <FormLoading loading={loading} />
            <FormMessage mensagemRequest={mensagemRequest} />
          </form>
        </div>
      </div>
    </>
  );

  async function handleRegisterEvent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    await onValidateFieldsEmpty(setFormsFilds);

    if (!Object.values(formsFilds).some((field) => field.error)) {
      if (params.type === "editing") {
        //Editando um filme
      
      } else {
        //Cadastrando um novo filme
        await registerNewRecordInTheDatabase();
      }

      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  async function registerNewRecordInTheDatabase() {

    console.log(await returnImageThatMustBeSent())

  }

  async function returnImageThatMustBeSent() {
    if (formsFilds.img.value instanceof File) {
      const compressedImage: any = await compressImage(formsFilds.img.value);
      const base64Image = await convertBlobToBase64(compressedImage);
      return base64Image;
    } else {
      return formsFilds.img.value;
    }
  }

  function handleChancheField(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFormsFilds: any,
    formsFilds: any
  ) {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    setFormsFilds({
      ...formsFilds,
      [targetName]: {
        value: targetValue,
        error: onValidateError(targetValue, targetName),
      },
    });
  }

  function handleChancheFieldFile(
    e: ChangeEvent<HTMLInputElement>,
    setFormsFilds: any,
    formsFilds: any
  ) {
    const targetName = e.target.name;

    if (e.target.files) {
      const targetValue = e.target.files[0];

      setFormsFilds({
        ...formsFilds,
        [targetName]: {
          value: targetValue,
          error: targetValue ? true : false,
        },
      });
    }
  }

  function onValidateError(value: string, field: string) {
    if (field === "synopsis" || field === "duration" || field === "name") {
      return value.length < 1 ? true : false;
    }

    if (field === "visa") {
      return value.length === 0 ? true : false;
    }

    if (field === "launch" || field === "note") {
      if (parseInt(value) === 0 || parseInt(value) < 0) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

  async function lookingForInformationAboutFilm(idAnime: string) {

  }
}
