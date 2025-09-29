import "./globals.css"
import { createClient } from "../../lib/supabaseClient"

export const metadata = {
  title: "Nobarkan",
  description: "Watch together with friends",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  )
}
