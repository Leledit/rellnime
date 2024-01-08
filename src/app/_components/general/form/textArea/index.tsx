import styles from "./index.module.scss";

interface props {
  label: string;
  name: string;
  onChange: (e: any) => void;
  error: any;
  customClassComponent?: any;
  value?:any,
}

export default function FormTextArea({
  label,
  name,
  onChange,
  error,
  customClassComponent,
  value
}: props) {
  return (
    <div className={styles.containerTextArea + " " + customClassComponent}>
      <label className={styles.label}>{label}</label>
      <textarea className={styles.textArea} onChange={onChange} name={name}  value={value}/>
      {error ? (
        <p className={styles.msgErroInput}>Este campo é obrigatorio</p>
      ) : (
        <></>
      )}
    </div>
  );
}
