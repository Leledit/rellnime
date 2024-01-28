import styles from "./index.module.scss";
import Image from "next/image";
import imgInputFile from "../../../../../../public/images/adm/form/inputFile.png";

interface props {
  label: string;
  name: string;
  value: any;
  onChange: (e: any) => void;
  error: any;
  customClassComponent?: any;
}

export default function FormFile({
  label,
  name,
  value,
  onChange,
  error,
  customClassComponent,
}: props) {
  return (
    <div className={styles.containerFile + " " + customClassComponent}>
      <label className={styles.label}>{label}</label>
      <div>
        <label htmlFor="inputFile">
          <Image
            src={imgInputFile}
            alt="Imagem meramente ilustrativa"
            className={styles.imgInputFile}
          />
        </label>
        <input
          id="inputFile"
          type="file"
          name={name}
          onChange={onChange}
          className={styles.inputFile}
        />
      </div>
      {value !== "" ? (
        <p className={styles.messageImgLoaded}>Imagem Carreagda com sucesso!</p>
      ) : (
        <></>
      )}
      {error ? (
        <p className={styles.msgErroInput}>Este campo é obrigatorio</p>
      ) : (
        <></>
      )}
    </div>
  );
}
