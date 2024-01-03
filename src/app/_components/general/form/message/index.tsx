import { ImensagemRequest } from "@/app/_interface/forms";
import styles from "./index.module.scss";

interface Iprops {
  mensagemRequest: ImensagemRequest;
}

export default function FormMessage({ mensagemRequest }: Iprops) {
  if (mensagemRequest.status === 0) {
    return <></>;
  }

  let colorText;

  if (mensagemRequest.status === 500) {
    colorText = "rgba(188,15,15,1)";
  } else {
    colorText = "rgba(0,154,28,1)";
  }

  return <p className={styles.messageForm} style={{color:colorText}}>{mensagemRequest.message}</p>;
}
