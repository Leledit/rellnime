import jwt from "jsonwebtoken";

export default function getUserTypeFromToken(token: string) {
  try {
    const decodedToken = jwt.decode(token);
    return decodedToken;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
}
