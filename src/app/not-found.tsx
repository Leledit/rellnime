import Image from "next/image";
import styles from "../../public/css/notFound.module.scss";
import img404 from "../../public/images/Pag404.png";

export default function Page404() {
  return (
    <div className={styles.page404}>
      <div className={styles.containerInfo}>
        <h2 className={styles.infoTitle}>Pagina não encontrada</h2>
        <Image className={styles.infoImage} src={img404} alt="Imagem 404" />
      </div>
    </div>
  );
}
