"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import { Divider, Drawer, Tooltip } from "@mui/material";
import styles from "./index.module.scss";
import smallsoon from "../../../../../public/images/smalSoon.png";
import ExitIcon from "@/app/_ui/exit";

export default function AdmMenu() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const router = useRouter();

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpenMenu(!openMenu);
  };

  const HandleApplicationExitEvent = () => {
    //Fazer evento de sair da aplicação
    console.log("saindo da aplicação");
    closeMenu();
  };

  const handleRedirectionToTheHomePage = () => {
    router.push("/admin");
    closeMenu();
  };

  function closeMenu() {
    setOpenMenu(false);
  }

  return (
    <>
      <div
        className={styles.admMenu}
        onClick={() => {
          setOpenMenu(true);
        }}
      >
        <div className={styles.internalSpace}>
          <Image
            className={styles.admMenuSoon}
            src={smallsoon}
            alt="Logo do projeto"
          />
          <h2 className={styles.admMenuTitle}>Pagina administrativa</h2>
        </div>
      </div>
      <Drawer anchor={"left"} open={openMenu} onClose={toggleDrawer}>
        <div className={styles.drawerMenu}>
          <div className={styles.menuHeader}>
            <h2 className={styles.menuHeaderTitle}>Recursos disponiveis</h2>
            <Divider />
            <div className={styles.menuHeaderContainerIcons}>
              <Tooltip
                title="Voltar para a home"
                onClick={() => handleRedirectionToTheHomePage()}
              >
                <HomeIcon className={styles.menuHeaderIconHome} />
              </Tooltip>
              <Tooltip title="Sair da aplicação">
                <div
                  className={styles.menuHeaderIconExit}
                  onClick={() => {
                    HandleApplicationExitEvent();
                  }}
                >
                  {ExitIcon("red", "45", "45")}
                </div>
              </Tooltip>
            </div>
          </div>
          <div className={styles.menuBody}>
            <div className={styles.blockOptions}>
              <h3 className={styles.blockOptionsTitle}>Animes</h3>
              <Link
                href="/admin/anime/register"
                className={styles.blockOption}
                onClick={closeMenu}
              >
                Cadastrar
              </Link>
              <Link
                href="/admin/listing/allAnime"
                className={styles.blockOption}
                onClick={closeMenu}
              >
                Lista completa
              </Link>
            </div>
          </div>
          <Divider />
          <div className={styles.menuBody}>
            <div className={styles.blockOptions}>
              <h3 className={styles.blockOptionsTitle}>Filmes</h3>
              <Link
                href="/admin/films/register"
                className={styles.blockOption}
                onClick={closeMenu}
              >
                Cadastrar
              </Link>
              <Link
                href="/admin/listing/allFilms"
                className={styles.blockOption}
                onClick={closeMenu}
              >
                Lista completa
              </Link>
            </div>
          </div>
          <Divider />
          <div className={styles.menuBody}>
            <div className={styles.blockOptions}>
              <h3 className={styles.blockOptionsTitle}>Generos</h3>
              <Link
                href="/admin/genres"
                className={styles.blockOption}
                onClick={closeMenu}
              >
                Generos disponiveis
              </Link>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
