import HeaderForms from "@/app/_components/general/form/headerFormes";
import styles from "./index.module.scss";
import Button from "@/app/_components/general/button";

export default function EmailSent() {
  return (
    <>
      <HeaderForms titleForm="Email enviado!" />
      <h2 className={styles.descripForm}>
        Parabéns! Os passos para a recuperação de senha foram enviados para o
        seu e-mail.
      </h2>
      <Button text="Voltar para o site" type="button" destiny="/"  />
    </>
  );
}
