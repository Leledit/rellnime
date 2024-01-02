import HeaderForms from "@/app/_components/general/form/headerFormes";
import FormInput from "@/app/_components/general/form/input";
import Button from "@/app/_components/general/button";
import AccessByOtherProviders from "@/app/_components/user/accessByOtherProviders";
import FormLink from "@/app/_components/general/link";

export default function AuthenticationLogin() {
  return (
    <>
      <HeaderForms titleForm="Login" />
      <form>
        <FormInput label="E-mail:" name="email" type="email" />
        <FormInput label="Senha:" name="password" type="password" />
        <FormLink destiny="/authentication/register" text="Esqueceu a senha?" />
        <Button text="Login" type="submit" />
      </form>
      <AccessByOtherProviders parentComponentIdentification="login" />
    </>
  );
}
