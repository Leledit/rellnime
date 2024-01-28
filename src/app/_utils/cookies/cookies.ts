import { destroyCookie, parseCookies, setCookie } from "nookies";

export function setTolkenCookie(tolken: string) {
  setCookie(null, "rellnime_Archive.token", tolken, {
    maxAge: 60 * 60 * 1, //1 h
    path: "/",
  });
}

export function getTolkenCookie() {//substitui o nome
  const cookies = parseCookies();
  return cookies["rellnime_Archive.token"];
}

export function destroyTolkenCookie() {
  destroyCookie(null, "rellnime_Archive.token", {
    path: "/",
  });
}
