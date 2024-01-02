import type { Metadata } from 'next'
import { Merienda } from 'next/font/google'
import '../../public/css/reset.css'

const merienda = Merienda({subsets:['latin']});

export const metadata: Metadata = {
  title: 'ReellNime archive',
  description: 'Sua biblioteca de conteudo online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={merienda.className}>{children}</body>
    </html>
  )
}
