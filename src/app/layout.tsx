import type { Metadata } from "next";
import { Merienda } from "next/font/google";
import "../../public/css/reset.css";

const merienda = Merienda({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReellNime",
  description: "Sua biblioteca de conteudo online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={merienda.className}>{children}</body>
    </html>
  );
}
