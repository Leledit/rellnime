import jwt from "jsonwebtoken";
import { getTolkenCookie } from "../cookies/cookies";

export default function getUserTypeFromToken(token: string) {
  try {
    const decodedToken = jwt.decode(token);
    return decodedToken;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
}

export function checkingAdministratorJwtCredentials(): boolean {
  const token = getTolkenCookie();

  if (token) {
    const decodedToken: any = jwt.decode(token, { complete: true });

    const expirationDate = new Date(decodedToken.payload.exp * 1000);

    const isExpired = expirationDate < new Date();

    return !isExpired;
  } else {
    return false;
  }
}