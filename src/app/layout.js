export const metadata = {
    title: 'Tabnews',
    description: 'Conteúdos com valor concreto para quem trabalha com tecnologia.'
}



export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head />
      <body>{children}</body>
    </html>
  )
}
