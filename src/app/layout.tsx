import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Rajdhani } from "next/font/google";
import Link from "next/link";
import { BarChart3, CalendarRange, Flame, Shield, Sparkles, Star, Trophy } from "lucide-react";
import "./globals.css";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MundialData",
  description: "Partidos, resultados en vivo, equipos, goleadores y formaciones del Mundial 2026.",
  manifest: "/manifest.json",
  openGraph: {
    title: "MundialData",
    description: "Partidos, resultados en vivo, equipos, goleadores y formaciones del Mundial 2026.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#06070a",
  width: "device-width",
  initialScale: 1,
};

const nav = [
  ["Fixture", "/fixture", CalendarRange],
  ["Resultados", "/", Flame],
  ["Grupos", "/fixture#grupos", BarChart3],
  ["Goleadores", "/goleadores", Trophy],
  ["Predicciones", "/prode", Sparkles],
  ["Favoritos", "/equipos", Star],
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${rajdhani.variable} ${bebas.variable}`} lang="es-AR">
      <body>
        <header className="app-topbar">
          <Link className="brand-lockup" href="/">
            <span className="brand-mark"><Shield size={23} strokeWidth={2.7} /></span>
            <span>
              <span className="brand-title">MundialData</span>
              <span className="brand-subtitle">Coverage Center 2026</span>
            </span>
          </Link>
        </header>
        {children}
        <nav className="bottom-app-nav" aria-label="Navegacion principal">
          {nav.map(([label, href, Icon]) => (
            <Link className="bottom-app-link" href={href as string} key={href as string}>
              <Icon size={20} strokeWidth={2.4} />
              <span>{label as string}</span>
            </Link>
          ))}
        </nav>
        <footer className="relative mx-auto max-w-7xl px-4 pb-28 pt-8 text-sm text-white/55">
          <p>Fixture, resultados en vivo, equipos, goleadores y formaciones. Horarios en Argentina.</p>
          <p className="mt-2 font-bold text-white/80">
            Pagina creada por Matias Flores - matiasflores07@icloud.com
          </p>
        </footer>
      </body>
    </html>
  );
}
