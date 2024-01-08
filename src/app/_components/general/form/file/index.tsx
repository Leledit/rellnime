import styles from "./index.module.scss";
import imgInputFile from "../../../../../../public/images/adm/form/inputFile.png";
import Image from "next/image";

interface props {
  label: string;
  name: string;
  onChange: (e: any) => void;
  error: any;
  customClassComponent?: any;
}

export default function FormFile({
  label,
  name,
  onChange,
  error,
  customClassComponent,
}: props) {
  return (
    <div className={styles.containerFile + " " + customClassComponent}>
      <label className={styles.label}>{label}</label>
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
      {error ? (
        <p className={styles.msgErroInput}>Este campo é obrigatorio</p>
      ) : (
        <></>
      )}
    </div>
  );
}
