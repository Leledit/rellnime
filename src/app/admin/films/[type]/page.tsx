"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./index.module.scss";
import { ImensagemRequest } from "@/app/_interface/forms";
import { getTolkenCookie } from "@/app/_utils/cookies/cookies";
import HeaderForms from "@/app/_components/general/form/headerFormes";
import FormInput from "@/app/_components/general/form/input";
import FormSelect from "@/app/_components/general/form/select";
import FormTextArea from "@/app/_components/general/form/textArea";
import FormFile from "@/app/_components/general/form/file";
import Button from "@/app/_components/general/button";
import FormLoading from "@/app/_components/general/form/loading";
import FormMessage from "@/app/_components/general/form/message";
import { onValidateFieldsEmpty } from "@/app/_utils/formHandling";
import adapterFilmsRegister from "@/app/_adapter/films/register";
import { returnImageThatMustBeSent } from "@/app/_utils/images/preparingToSendToApi";
import adapterListOneFilme from "@/app/_adapter/films/listOne";
import { IEntitieFilme, IMessageReturn } from "@/app/_interface/returnFromApi";
import adapterFilmsChanging from "@/app/_adapter/films/changing";
import { checkingAdministratorJwtCredentials } from "@/app/_utils/tolken";

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

  useEffect(() => {
    //Validando token jwt
    if (!checkingAdministratorJwtCredentials()) {
      router.push("/authentication/login");
    }
    if (params.type === "editing" && searchParams) {
      lookingForInformationAboutFilm(searchParams.id as string);
    }

    async function lookingForInformationAboutFilm(idFilm: string) {
      const dataFilm: IEntitieFilme | undefined = await adapterListOneFilme(
        idFilm
      );

      if (dataFilm) {
        setFormsFilds({
          name: {
            value: dataFilm.name,
            error: false,
          },
          duration: {
            value: dataFilm.duration,
            error: false,
          },
          launch: {
            value: dataFilm.releaseYear.toString(),
            error: false,
          },
          note: {
            value: dataFilm.note.toString(),
            error: false,
          },
          synopsis: {
            value: dataFilm.synopsis,
            error: false,
          },
          visa: {
            value: `${dataFilm.visa}`,
            error: false,
          },
          img: {
            value: dataFilm.urlImg,
            error: false,
          },
        });
      } else {
        router.push("/admin/");
      }
    }
  }, [params.type, router, searchParams]);

  return (
    <>
      <div className={styles.containerForm}>
        <div className={styles.breathingSpace}>
          <HeaderForms
            titleForm={
              params.type === "editing"
                ? "Edição de filme"
                : "Cadastro de filme"
            }
            customStylesTitle={{ fontSize: "36px" }}
          />
          <form
            onSubmit={(e) => {
              handlingFormSubmissionEvent(e);
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
                type="text"
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

  async function handlingFormSubmissionEvent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    await onValidateFieldsEmpty(setFormsFilds);

    if (!Object.values(formsFilds).some((field) => field.error)) {
      if (params.type === "editing") {
        //Editando um filme
        await editingAnAlreadyRegisteredAnime();
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
    const resultRequest: IMessageReturn | undefined =
      await adapterFilmsRegister(
        {
          name: formsFilds.name.value,
          visa: formsFilds.visa.value,
          duration: formsFilds.visa.value,
          note: formsFilds.note.value,
          synopsis: formsFilds.synopsis.value,
          releaseYear: parseInt(formsFilds.launch.value),
          img: await returnImageThatMustBeSent(formsFilds.img.value),
        },
        accessToken
      );

    if (!resultRequest) {
      setMensagemRequest({
        message: "Problemas ao cadastrar o filme",
        status: 500,
      });
    } else if (resultRequest.message) {
      setMensagemRequest({ message: resultRequest.message, status: 200 });

      //Limpando os campos do formulario
      setFormsFilds(initialValueFormsFilds);
    } else {
      setMensagemRequest({ message: resultRequest.details, status: 200 });
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

  async function editingAnAlreadyRegisteredAnime() {
    if (searchParams) {
      const resultRequest: IMessageReturn | undefined =
        await adapterFilmsChanging(
          {
            name: formsFilds.name.value,
            visa: formsFilds.visa.value,
            duration: formsFilds.visa.value,
            note: formsFilds.note.value,
            synopsis: formsFilds.synopsis.value,
            releaseYear: parseInt(formsFilds.launch.value),
            img: await returnImageThatMustBeSent(formsFilds.img.value),
          },
          accessToken,
          searchParams.id as string
        );

      if (!resultRequest) {
        setMensagemRequest({
          message: "Problemas ao editar o filme",
          status: 500,
        });
      } else if (resultRequest.message) {
        setMensagemRequest({ message: resultRequest.message, status: 200 });

        //Limpando os campos do formulario
        setFormsFilds(initialValueFormsFilds);
      } else {
        setMensagemRequest({ message: resultRequest.details, status: 500 });
      }
    }
  }
}
