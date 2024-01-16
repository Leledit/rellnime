export async function get(url: string) {
  //console.log("get", url);

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      /*'apiKey': process.env.API_KEY || '',
            Authorization: process.env.LOCAL_AUTH_BASIC || '',*/
    },
    cache: "no-cache",
  });

  return response;
}

export async function post(url: string, body?: any, tolken?: string) {
  //console.log("post", url, tolken,body);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: tolken ? tolken : "",
      /*apiKey: process.env.API_KEY || "",
            Authorization: process.env.LOCAL_AUTH_BASIC || '',*/
    },
    body: body ? JSON.stringify(body) : null,
  });

  return response;
}

export async function put(url: string, body?: any, tolken?: string) {
  
  //console.log("PUT", url, tolken,body);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: tolken ? tolken : "",
    },
    body: body ? JSON.stringify(body) : null,
  });

  return response;
}

export async function delet(url: string, body?: any, tolken?: string) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: tolken ? tolken : "",
    },
    body: body ? JSON.stringify(body) : null,
  });

  return response;
}

