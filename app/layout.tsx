import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Test de Catalanitat — Nivell Expert",
  description:
    "Examen oficial de catalanitat. 25 preguntes, 5 seccions. Demostra el teu nivell de coneixement català.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1a2744",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca">
      <body className="min-h-dvh bg-slate-50 text-slate-900 antialiased safe-top safe-bottom">
        {children}
      </body>
    </html>
  );
}
