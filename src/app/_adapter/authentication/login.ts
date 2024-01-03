"use server";
import { post } from "../http.service";

interface dataUser {
  email: string;
  password: string;
}

export default async function adapterAuthenticationLogin(dataUser: dataUser) {
  const url = process.env.URL_API_BASE + "/user/login/";

  const result = await post(url, {
    email: dataUser.email,
    password: dataUser.password,
  });

  if(result.status !== 201){
    return result.status;
  }

  const resutlData = await result.json()

  return resutlData;
}
