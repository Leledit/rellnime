'use server'
import { post } from "../http.service";

interface dataUser {
  email: string;
  name: string;
  password: string;
}

export default async function adapterAuthenticationRegister(dataUser: dataUser) {
  const url = process.env.URL_API_BASE + "/user/register";

  const result = await post(url, {
    email: dataUser.email,
    name: dataUser.name,
    password: dataUser.password,
  });

  if (result.status !== 201) {
    return result.status;
  }

  const resutlData = await result.json();

  return resutlData;
}
