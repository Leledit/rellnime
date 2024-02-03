"use client";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import logo from "../../../../../public/images/smalSoon.png";
import iconMenu from "../../../../../public/images/user/iconMenu.png";
import iconButtonLogin from "../../../../../public/images/user/iconButtonLogin.png";
import iconButtonRegister from "../../../../../public/images/user/iconButtonRegister.png";
import Image from "next/image";
import Link from "next/link";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [positionMenuItem, setPositionMenuItem] = useState<string>();
  const [marginBottomMenu, setMarginBottomMenu] = useState<string>();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setPositionMenuItem("140px");
    } else {
      setPositionMenuItem("-100%");
    }
    if (!isOpen) {
      setMarginBottomMenu("300px");
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

  return (
    <>
      <div
        className={styles.containerMenu}
        style={{ marginBottom: marginBottomMenu }}
      >
        <div className={styles.alignmentContainer}>
          <div className={styles.containerLogo}>
            <Image src={logo} alt="Logo do projeto" className={styles.logo} />
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
              <div>
                <Link href={""} className={styles.item}>
                  Animes
                </Link>
                <Link href={""} className={styles.item}>
                  Filmes
                </Link>
              </div>
              <div className={styles.containerButtons}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
