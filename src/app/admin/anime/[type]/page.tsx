"use client";
import HeaderForms from "@/app/_components/general/form/headerFormes";
import styles from "./index.module.scss";
import { onValidateFieldsEmpty } from "@/app/_utils/formHandling";
import FormInput from "@/app/_components/general/form/input";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import FormSelect from "@/app/_components/general/form/select";
import FormTextArea from "@/app/_components/general/form/textArea";
import FormFile from "@/app/_components/general/form/file";
import Button from "@/app/_components/general/button";
import { ImensagemRequest } from "@/app/_interface/forms";
import { getTolkenCookie } from "@/app/_utils/cookies/cookies";
import adapterAnimeRegister from "@/app/_adapter/anime/register";
import {
  compressImage,
  convertBlobToBase64,
} from "@/app/_utils/manipulatingImage";
import FormLoading from "@/app/_components/general/form/loading";
import FormMessage from "@/app/_components/general/form/message";
import adapterListOneAnime from "@/app/_adapter/anime/listOne";
import { useRouter } from "next/navigation";
import { IEntitieAnime } from "@/app/_interface/dataBd";
import adapterAnimeChanging from "@/app/_adapter/anime/changing";

interface formFild {
  name: {
    value: string;
    error: boolean;
  };
  watched: {
    value: boolean;
    error: boolean;
  };
  qtdEpisodes: {
    value: number;
    error: boolean;
  };
  releaseYear: {
    value: number;
    error: boolean;
  };
  note: {
    value: number;
    error: boolean;
  };
  status: {
    value: string;
    error: boolean;
  };
  nextSeason: {
    value: string;
    error: boolean;
  };
  previousSeason: {
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

export default function AnimeForm({ params, searchParams }: IProps) {
  const initialValueFormsFilds: formFild = {
    name: {
      error: false,
      value: "",
    },
    watched: {
      error: false,
      value: true,
    },
    qtdEpisodes: {
      error: false,
      value: 0,
    },
    releaseYear: {
      error: false,
      value: 0,
    },
    note: {
      error: false,
      value: 0,
    },
    status: {
      error: false,
      value: "",
    },
    nextSeason: {
      error: false,
      value: "",
    },
    previousSeason: {
      error: false,
      value: "",
    },
    synopsis: {
      error: false,
      value: "",
    },
    img: {
      error: false,
      value: "",
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
    if (params.type === "editing" && searchParams) {
      lookingForInformationAboutAnAnime(searchParams.id as string);
    }
  }, []);

  async function handlingFormSubmissionEvent(e: FormEvent<HTMLFormElement>)  {
    e.preventDefault();
    setLoading(true);

    await onValidateFieldsEmpty(setFormsFilds);

    if (!Object.values(formsFilds).some((field) => field.error)) {
      if (params.type === "editing") {
        //Editando um anime
        await editingAnAlreadyRegisteredAnime();
      } else {
        //Cadastrando um novo anime
        await registerNewRecordInTheDatabase();
      }

      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  async function editingAnAlreadyRegisteredAnime() {
    if (searchParams) {
      const resultRequest = await adapterAnimeChanging(
        {
          name: formsFilds.name.value,
          watched: formsFilds.watched.value,
          qtdEpisodes: formsFilds.qtdEpisodes.value,
          releaseYear: formsFilds.releaseYear.value,
          note: formsFilds.note.value,
          status: formsFilds.status.value,
          nextSeason: formsFilds.nextSeason.value,
          previousSeason: formsFilds.previousSeason.value,
          synopsis: formsFilds.synopsis.value,
          img: await returnImageThatMustBeSent(),
        },
        accessToken,
        searchParams.id as string
      );

      if (resultRequest === 400) {
        setMensagemRequest({
          message: "Problemas ao editar o anime",
          status: 500,
        });
      }

      if (resultRequest.message) {
        setMensagemRequest({ message: resultRequest.message, status: 200 });

        //Limpando os campos do formulario
        setFormsFilds(initialValueFormsFilds);
      }
    }
  }

  async function registerNewRecordInTheDatabase() {
    const resultRequest = await adapterAnimeRegister(
      {
        name: formsFilds.name.value,
        watched: formsFilds.watched.value,
        qtdEpisodes: formsFilds.qtdEpisodes.value,
        releaseYear: formsFilds.releaseYear.value,
        note: formsFilds.note.value,
        status: formsFilds.status.value,
        nextSeason: formsFilds.nextSeason.value,
        previousSeason: formsFilds.previousSeason.value,
        synopsis: formsFilds.synopsis.value,
        img: await returnImageThatMustBeSent(),
      },
      accessToken
    );

    if (resultRequest === 409) {
      setMensagemRequest({
        message: "Existe outro anime no sistema com este nome",
        status: 500,
      });
    }

    if (resultRequest === 400) {
      setMensagemRequest({
        message: "Problemas ao cadastrar o anime",
        status: 500,
      });
    }

    if (resultRequest === 401) {
      //Criar ação adicional aqui(tipo deslogar a pessoa se necessario)
      setMensagemRequest({
        message: "Tolken expirado!, faça login novamente!",
        status: 500,
      });
    }

    if (resultRequest.message) {
      setMensagemRequest({ message: resultRequest.message, status: 200 });

      //Limpando os campos do formulario
      setFormsFilds(initialValueFormsFilds);
    }
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

  return (
    <div className={styles.containerForm}>
      <div className={styles.breathingSpace}>
        <HeaderForms
          titleForm={params.type==='editing'?"Edição de anime":"Cadastro de anime"}
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
              name="watched"
              value={[`${formsFilds.watched.value}`]}
              error={formsFilds.watched.error}
              onChange={(e) => {
                handleChancheField(e, setFormsFilds, formsFilds);
              }}
              options={["true", "false"]}
            />
          </div>
          <div className={styles.aliginFourFilds}>
            <FormInput
              label="Episodios:"
              name="qtdEpisodes"
              type="number"
              value={formsFilds.qtdEpisodes.value}
              onChange={(e) => {
                handleChancheField(e, setFormsFilds, formsFilds);
              }}
              error={formsFilds.qtdEpisodes.error}
              customClassComponent={styles.marginRight}
            />
            <FormInput
              label="Lançamento:"
              name="releaseYear"
              type="number"
              value={formsFilds.releaseYear.value}
              onChange={(e) => {
                handleChancheField(e, setFormsFilds, formsFilds);
              }}
              error={formsFilds.releaseYear.error}
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
            <FormSelect
              label="Status:"
              name="status"
              value={[formsFilds.status.value]}
              error={formsFilds.status.error}
              onChange={(e) => {
                handleChancheField(e, setFormsFilds, formsFilds);
              }}
              options={["Completo", "Em lançamento", "Adiado", "Aberto"]}
            />
          </div>
          <div className={styles.aliginTwoFilds}>
            <FormInput
              label="Proxima temporada:"
              name="nextSeason"
              type="text"
              value={formsFilds.nextSeason.value}
              onChange={(e) => {
                handleChancheField(e, setFormsFilds, formsFilds);
              }}
              error={formsFilds.nextSeason.error}
              customClassComponent={styles.marginRight}
            />
            <FormInput
              label="Temporada anterior:"
              name="previousSeason"
              type="text"
              value={formsFilds.previousSeason.value}
              onChange={(e) => {
                handleChancheField(e, setFormsFilds, formsFilds);
              }}
              error={formsFilds.previousSeason.error}
              customClassComponent={styles.marginLeft}
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
  );

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
    if (
      field === "nextSeason" ||
      field === "previousSeason" ||
      field === "synopsis"
    ) {
      return value.length < 1 ? true : false;
    }

    if (field === "watched" || field === "status") {
      return value.length === 0 ? true : false;
    }

    if (
      field === "qtdEpisodes" ||
      field === "releaseYear" ||
      field === "note"
    ) {
      if (parseInt(value) === 0 || parseInt(value) < 0) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

  async function lookingForInformationAboutAnAnime(idAnime: string) {
    const dataAnime: IEntitieAnime = await adapterListOneAnime(idAnime);

    if (dataAnime) {
      setFormsFilds({
        name: {
          error: false,
          value: dataAnime.name,
        },
        watched: {
          error: false,
          value: dataAnime.watched,
        },
        note: {
          error: false,
          value: dataAnime.note,
        },
        nextSeason: {
          error: false,
          value: dataAnime.nextSeason,
        },
        previousSeason: {
          error: false,
          value: dataAnime.previousSeason,
        },
        qtdEpisodes: {
          error: false,
          value: dataAnime.qtdEpisodes,
        },
        releaseYear: {
          error: false,
          value: dataAnime.releaseYear,
        },
        status: {
          error: false,
          value: dataAnime.status,
        },
        synopsis: {
          error: false,
          value: dataAnime.synopsis,
        },
        img: {
          error: false,
          value: dataAnime.urlImg,
        },
      });
    } else {
      router.push("/admin/");
    }
  }
}
