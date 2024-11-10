import React from "react"
import Sidebar from "../components/sidebar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body >
        <Sidebar />
        <main className="flex flex-1 justify-center items-center ">
          {children}
        </main>
      </body>
    </html>
  )
}
