"use server";

import { IErrorRequest, IListUser } from "@/app/_interface/returnFromApi";
import { get } from "../http.service";

export default async function AdapterUserList(
  email: string
): Promise<IListUser | undefined | IErrorRequest> {
  const url = process.env.URL_API_BASE + `/user/list/?email=${email}`;

  const result = await get(url);

  if (result) {
    const resutlData = await result.json();

    return resutlData;
  } else {
    return undefined;
  }
}
