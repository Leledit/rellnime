import styles from "./index.module.scss";
import logo from "../../../../../public/images/soon.png";
import Image from "next/image";
import Link from "next/link";

export default function UserFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.containerLinks}>
        <div className={styles.containerLogo}>
          <Image src={logo} alt="Logo da aplicação" className={styles.logo} />
          <div className={styles.containerOption}>
            <Link href={"/home/listing?all=animes"} className={styles.option}>
              Animes
            </Link>
            <Link href={"/home/listing?all=filmes"} className={styles.option}>
              Filmes
            </Link>
            <Link href={"/home/"} className={styles.option}>
                  Generos
            </Link>
          </div>
        </div>
        <div className={styles.containerAuthentication}>
          <Link href={"/authentication/login"} className={styles.option}>
            Login
          </Link>
          <hr className={styles.divider} />
          <Link href={"/authentication/register"} className={styles.option}>
            Cadastro
          </Link>
        </div>
      </div>
      <div className={styles.contaienerCopy}>
        <p className={styles.copy}>
          © 2023 Rellnime. Todos os direitos reservados. O conteúdo deste site é
          protegido por direitos autorais
        </p>
      </div>
    </footer>
  );
}
