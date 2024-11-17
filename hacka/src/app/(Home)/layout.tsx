import React from "react"
import { Inter } from 'next/font/google'
import { ThemeProvider } from "../components/theme-provider"
import Sidebar from "../components/sidebar"


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>

          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}