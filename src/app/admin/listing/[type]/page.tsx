"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Divider } from "@mui/material";
import styles from "./index.module.scss";
import adapterListAllAnime from "@/app/_adapter/anime/listAll";
import ItemList from "@/app/_components/general/itemList";
import adapterListAllFilmes from "@/app/_adapter/films/listAll";
import { checkingAdministratorJwtCredentials } from "@/app/_utils/tolken";
import LoadingComponent from "@/app/_components/general/loading";
import { IItemListing } from "@/app/_interface/returnFromApi";

interface IProps {
  params: {
    type: typeListingSupported;
  };
}

type typeListingSupported = "allAnime" | "allFilms";

export default function PageListingType({ params }: IProps) {
  const [dataListingm, setDataListing] = useState<IItemListing[]>();
  const typeListing: typeListingSupported = params.type;
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    //Validando token jwt
    if (!checkingAdministratorJwtCredentials()) {
      router.push("/authentication/login");
    }

    async function fetchingPageData() {
      let resutlData: IItemListing[] | undefined;
      try {
        switch (typeListing) {
          case "allAnime":
            resutlData = await adapterListAllAnime();
            if (resutlData) {
              setDataListing(resutlData);
            }
            break;
          case "allFilms":
            resutlData = await adapterListAllFilmes();
            if (resutlData) {
              setDataListing(resutlData);
            }
            break;
          default:
            router.push("/admin/");
            break;
        }
        setLoading(false);
      } catch (error) {
        console.log("Problemas ao buscar os dados " + error);
        setLoading(false);
      }
    }

    setTimeout(() => {
      fetchingPageData();
    }, 2000);
  }, [router, typeListing]);

  return (
    <div className={styles.cotainerListing}>
      <div className={styles.listingHeader}>
        <div className={styles.listingContainerTitle}>
          <h2 className={styles.listingHeaderTitle}>
            {returnCorrespondingTitle(typeListing)}
          </h2>
          <Divider style={{ background: "#7BC0FF" }} />
        </div>
        <div className={styles.listingHeaderContainerButton}>
          <button
            className={styles.listingHeaderButton}
            onClick={() => {
              redirectToEditPage(typeListing);
            }}
          >
            Novo
          </button>
        </div>
      </div>

      {!loading ? (
        dataListingm ? (
          <>
            <div className={styles.listingData}>
              {dataListingm.map((item, index) => {
                return (
                  <ItemList
                    key={index}
                    id={item.id}
                    img={item.urlImg}
                    name={item.name}
                    applicationSegment="ADM"
                    isAnime={!("duration" in item) ? true : false}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <div className={styles.containerMessage}>
            <h2 className={styles.messageText}>
              Nenhum registro foi encontrado!!
            </h2>
          </div>
        )
      ) : (
        <div className={styles.containerLoading}>
          <LoadingComponent height={80} width={80} loading={loading} />
        </div>
      )}
    </div>
  );

  function returnCorrespondingTitle(typeListing: typeListingSupported) {
    const titleMapping: { [key: string]: string } = {
      allAnime: "Animes Cadastrados",
      allFilms: "Filmes Cadastrados",
    };

    return titleMapping[typeListing] || "";
  }

  function redirectToEditPage(typeListing: typeListingSupported) {
    const routeMapping: Record<typeListingSupported, string> = {
      allAnime: "/admin/anime/register",
      allFilms: "/admin/films/register",
    };
    router.push(routeMapping[typeListing]);
  }
}
