'use server'
import { post } from "../http.service";

export default async function adapterGenresRegister(
  nameGenre: string,
  accessToken: string
) {
  const url = process.env.URL_API_BASE + "/genres/";

  const result = await post(url, { name: nameGenre }, accessToken);

  if (result.status !== 201) {
    return result.status;
  }

  const resutlData = await result.json();

  return resutlData;
}
