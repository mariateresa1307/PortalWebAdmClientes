export const metadata = {
  title: 'Adm usuarios | login',
  description: 'Admni panel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{background:"#6f9fd51a"}}>{children}</body>
    </html>
  )
}
