"use server";
import { IAuthentication } from "@/app/_interface/returnFromApi";
import { post } from "../http.service";

interface dataUser {
  email: string;
  name: string;
  password: string;
}

export default async function adapterAuthenticationRegister(
  dataUser: dataUser
): Promise<IAuthentication | undefined> {
  const url = process.env.URL_API_BASE + "/user/register";

  const result = await post(url, {
    email: dataUser.email,
    name: dataUser.name,
    password: dataUser.password,
  });

  if (result) {
    const resutlData = await result.json();

    return resutlData;
  } else {
    return undefined;
  }
}
