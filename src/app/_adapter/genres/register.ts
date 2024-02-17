"use server";
import { IMessageReturn } from "@/app/_interface/returnFromApi";
import { post } from "../http.service";

export default async function adapterGenresRegister(
  nameGenre: string,
  accessToken: string
): Promise<IMessageReturn | undefined> {
  const url = process.env.URL_API_BASE + "/genres/";

  const result = await post(url, { name: nameGenre }, accessToken);

  if (result) {
    const resutlData = await result.json();

    return resutlData;
  } else {
    return undefined;
  }
}
