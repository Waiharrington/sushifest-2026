import type { Metadata } from "next";
import { Montserrat, Lilita_One } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-montserrat",
});

const lilita = Lilita_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lilita",
});

export const metadata: Metadata = {
  title: "Sushi Fest 🏆",
  description: "Vota por el mejor sushi de la ciudad",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

import { Sponsors } from "@/components/Sponsors";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${lilita.variable} font-sans antialiased bg-background text-white min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <div className="flex-1">
            {children}
          </div>
          <Sponsors />
        </AuthProvider>
      </body>
    </html>
  );
}
