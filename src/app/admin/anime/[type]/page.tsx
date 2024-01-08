"use client";
import HeaderForms from "@/app/_components/general/form/headerFormes";
import styles from "./index.module.scss";
import {
  handleChancheField,
  handleChancheFieldFile,
  onValidateFieldsEmpty,
} from "@/app/_utils/formHandling";
import FormInput from "@/app/_components/general/form/input";
import { FormEvent, useState } from "react";
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

interface formFild {
  name: {
    value: string;
    error: boolean;
  };
  watched: {
    value: string;
    error: boolean;
  };
  qtdEpisodes: {
    value: string;
    error: boolean;
  };
  releaseYear: {
    value: string;
    error: boolean;
  };
  note: {
    value: string;
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
      value: "",
    },
    qtdEpisodes: {
      error: false,
      value: "",
    },
    releaseYear: {
      error: false,
      value: "",
    },
    note: {
      error: false,
      value: "",
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

  const [loading, setLoading] = useState<boolean>(false);
  const [mensagemRequest, setMensagemRequest] = useState<ImensagemRequest>({
    status: 0,
    message: "",
  });
  const [formsFilds, setFormsFilds] = useState<formFild>(
    initialValueFormsFilds
  );
  const accessToken = getTolkenCookie();
  const [modePage,setModePage] = useState()

  const handleRegisterEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await onValidateFieldsEmpty(setFormsFilds);

    if (!Object.values(formsFilds).some((field) => field.error)) {
      const compressedImage: any = await compressImage(formsFilds.img.value);
      const base64Image = await convertBlobToBase64(compressedImage);

      const resultRequest = await adapterAnimeRegister(
        {
          name: formsFilds.name.value,
          watched: formsFilds.watched.value,
          qtdEpisodes: parseInt(formsFilds.qtdEpisodes.value),
          releaseYear: parseInt(formsFilds.releaseYear.value),
          note: parseInt(formsFilds.note.value),
          status: formsFilds.status.value,
          nextSeason: formsFilds.nextSeason.value,
          previousSeason: formsFilds.previousSeason.value,
          synopsis: formsFilds.synopsis.value,
          img: base64Image,
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

      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className={styles.containerForm}>
      <div className={styles.breathingSpace}>
        <HeaderForms
          titleForm="Cadastro de anime"
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
              name="watched"
              value={[formsFilds.watched.value]}
              error={formsFilds.watched.error}
              onChange={(e) => {
                handleChancheField(e, setFormsFilds, formsFilds);
              }}
              options={["Sim", "Não"]}
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
}
