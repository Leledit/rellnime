import HeaderForms from "@/app/_components/general/form/headerFormes";
import AccessByOtherProviders from "@/app/_components/user/accessByOtherProviders";
import FormInput from "@/app/_components/general/form/input";
import Button from "@/app/_components/general/button";
import FormLink from "@/app/_components/general/link";

export default function AuthenticationLogin() {
  return (
    <>
      <HeaderForms titleForm="Cadastro" />
      <form>
        <FormInput label="E-mail:" name="email" type="email" />
        <FormInput label="Name:" name="name" type="text" />
        <FormInput label="Senha:" name="password" type="password" />
        <FormInput label="Confirmar senha:" name="confirmPassword" type="password" />
        <FormLink destiny="/authentication/login" text="Ja possui conta?"/>
        <Button text="Login" type="submit" />
      </form>
      <AccessByOtherProviders parentComponentIdentification="login" />
    </>
  );
}
