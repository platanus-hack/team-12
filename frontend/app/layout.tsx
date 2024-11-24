import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";

// Metadatos mejorados para SEO
export const metadata: Metadata = {
  title: "Little Dragons - Aprende a Ahorrar Jugando",
  description:
    "Un juego divertido que enseña a los niños el valor del ahorro y las finanzas personales.",
  openGraph: {
    title: "Little Dragons",
    description: "Aprende finanzas personales de forma divertida",
    siteName: "Little Dragons",
    images: [
      {
        url: "/assets/logo.svg",
        width: 1200,
        height: 630,
        alt: "Logo de Little Dragons",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@littledragons",
    title: "Little Dragons",
    description: "¡Aprende a ahorrar con dragones!",
    images: ["/assets/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="./logo.svg" type="image/svg+xml" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Aprende a ahorrar jugando con dragones"
        />
        <meta name="theme-color" content="#ffffff" />

        {/* Metadatos OpenGraph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Little Dragons - Aprende a Ahorrar"
        />
        <meta
          property="og:description"
          content="Un juego educativo para aprender sobre finanzas personales jugando con dragones"
        />
        <meta property="og:image" content="/assets/logo.svg" />
        <meta property="og:locale" content="es_ES" />

        {/* Metadatos Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@littledragons" />
        <meta name="twitter:title" content="Little Dragons" />
        <meta
          name="twitter:description"
          content="¡Aprende a ahorrar mientras juegas!"
        />
        <meta name="twitter:image" content="/assets/logo.svg" />
      </head>
      <body className={`${GeistSans.className} antialiased bg-radial-sky`}>
        {children}
      </body>
    </html>
  );
}
