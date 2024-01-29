"use client";
import { useState } from "react";
import styles from "./index.module.scss";
import logo from "../../../../../public/images/smalSoon.png";
import iconMenu from "../../../../../public/images/user/iconMenu.png";
import iconButtonLogin from "../../../../../public/images/user/iconButtonLogin.png";
import iconButtonRegister from "../../../../../public/images/user/iconButtonRegister.png";
import Image from "next/image";
import Link from "next/link";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className={styles.containerMenu}>
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
          {isOpen ? (
            <div className={styles.containerItens}>
              <Link href={"#"} className={styles.item}>
                Animes
              </Link>
              <Link href={"#"} className={styles.item}>
                Filmes
              </Link>
              <div className={styles.containerButtons}>
                <Link href={"#"}>
                  <Image
                    src={iconButtonLogin}
                    alt="Icone que representa o login"
                    className={styles.iconLogin}
                    onClick={toggleMenu}
                  />
                </Link>
                <hr className={styles.divider} />
                <Link href={"#"}>
                  <Image
                    src={iconButtonRegister}
                    alt="Icone que representa o registro"
                    className={styles.iconRegister}
                    onClick={toggleMenu}
                  />
                </Link>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        </div>
      </div>
    </>
  );
}

/*
<input id={styles.menuToggle} type="checkbox" />
          <label className={styles.menuButtonLabel} htmlFor="menu-toggle">
            <div className={styles.menuButton}></div>
          </label>
          <ul className={styles.menu}>
            <li className={styles.menuOption}>One</li>
            <li className={styles.menuOption}>Two</li>
            <li className={styles.menuOption}>Three</li>
            <li className={styles.menuOption}>Four</li>
            <li className={styles.menuOption}>Five</li>
          </ul>
 */
