"use client";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import logo from "../../../../../public/images/smalSoon.png";
import iconMenu from "../../../../../public/images/user/iconMenu.png";
import iconButtonLogin from "../../../../../public/images/user/iconButtonLogin.png";
import iconButtonRegister from "../../../../../public/images/user/iconButtonRegister.png";
import iconButtonProfile from "../../../../../public/images/user/iconButtonProfile.png";
import iconButtonExit from "../../../../../public/images/user/iconButtonExit.png";
import Image from "next/image";
import Link from "next/link";
import {
  destroyTolkenCookie,
  getTolkenCookie,
} from "@/app/_utils/cookies/cookies";
import getUserTypeFromToken from "@/app/_utils/tolken";
import { useRouter } from "next/navigation";
import { Token } from "@mui/icons-material";

export default function UserMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [positionMenuItem, setPositionMenuItem] = useState<string>();
  const [marginBottomMenu, setMarginBottomMenu] = useState<string>();
  const [loggedInUser, setLoggedInUser] = useState<boolean>(false);
  const [processingTolkien, setProcessingTolkien] = useState<boolean>(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setPositionMenuItem("140px");
    } else {
      setPositionMenuItem("-100%");
    }
    if (!isOpen) {
      setMarginBottomMenu("400px");
    } else {
      setMarginBottomMenu("0px");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsOpen(true);
        setPositionMenuItem("0px");
      } else {
        setIsOpen(false);
        setPositionMenuItem("-100%");
        setMarginBottomMenu("0px");
      }
    };

    window.addEventListener("resize", handleResize);

    if (window.innerWidth > 992) {
      setIsOpen(true);
      setPositionMenuItem("0px");
    } else {
      setMarginBottomMenu("0px");
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const tolken = getTolkenCookie();
    const infoUser: any = getUserTypeFromToken(tolken);

    if (infoUser) {
      if (infoUser.papel !== "user") {
        router.push("/admin");
      } else {
        setLoggedInUser(true);
      }
    }

    setProcessingTolkien(false);
  }, [router]);

  return (
    <>
      <div
        className={styles.containerMenu}
        style={{ marginBottom: marginBottomMenu }}
      >
        <div className={styles.alignmentContainer}>
          <div className={styles.containerLogo}>
            <Link href={"/home"}>
              <Image src={logo} alt="Logo do projeto" className={styles.logo} />
            </Link>
          </div>
          <div className={styles.containerMenu}>
            <Image
              src={iconMenu}
              alt="Icone do menu"
              className={styles.iconeMenu}
              onClick={toggleMenu}
            />
            <div
              className={styles.containerItens}
              style={{ top: positionMenuItem }}
            >
              <div className={styles.containerLinks}>
                <Link href={"/home/listing?all=animes"} className={styles.item}>
                  Animes
                </Link>
                <Link href={"/home/listing?all=filmes"} className={styles.item}>
                  Filmes
                </Link>
                <Link href={"/home/gender/"} className={styles.item}>
                  Generos
                </Link>
              </div>
              <div className={styles.containerButtons}>
                {!processingTolkien ? (
                  !loggedInUser ? (
                    <>
                      <Link href={"/authentication/login"}>
                        <Image
                          src={iconButtonLogin}
                          alt="Icone que representa o login"
                          className={styles.iconLogin}
                          onClick={toggleMenu}
                        />
                      </Link>
                      <hr className={styles.divider} />
                      <Link href={"/authentication/register"}>
                        <Image
                          src={iconButtonRegister}
                          alt="Icone que representa o registro"
                          className={styles.iconRegister}
                          onClick={toggleMenu}
                        />
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href={"/home/profile"}>
                        <Image
                          src={iconButtonProfile}
                          alt="Icone que representa o registro"
                          className={styles.iconRegister}
                          onClick={toggleMenu}
                        />
                      </Link>
                      <hr className={styles.divider} />
                      <Image
                        src={iconButtonExit}
                        alt="Icone que representa o registro"
                        className={styles.iconRegister}
                        onClick={logOutOfTheApplication}
                      />
                    </>
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function logOutOfTheApplication() {
    destroyTolkenCookie();
    window.location.href = "/home/";
  }
}
