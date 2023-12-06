import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Chat Play for a Cause',
  description: 'chat estilizado para a play for a cause',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

 
  return (
      <html lang="pt-br">
        <body >{children}</body>
      </html>
  )
}
