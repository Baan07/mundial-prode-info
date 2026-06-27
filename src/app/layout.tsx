import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Nunito_Sans } from "next/font/google";
import Link from "next/link";
import { Radio, Trophy } from "lucide-react";
import "./globals.css";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
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
  themeColor: "#38bdf8",
  width: "device-width",
  initialScale: 1,
};

const nav = [
  ["Fixture", "/fixture"],
  ["Equipos", "/equipos"],
  ["Goleadores", "/goleadores"],
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${nunito.variable} ${bebas.variable}`} lang="es-AR">
      <body>
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#03130d]/92 shadow-xl shadow-black/25 backdrop-blur">
          <div className="scoreboard-topline px-4 py-1 text-center text-[11px] font-black uppercase tracking-wide">
            MundialData Match Center - Resultados, fixture y goleadores
          </div>
          <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
            <Link className="flex items-center gap-3 text-white" href="/">
              <span className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-lime-200/45 bg-gradient-to-br from-lime-300 via-emerald-400 to-cyan-200 text-green-950 shadow-lg shadow-lime-950/35">
                <span className="absolute inset-x-1 bottom-1 h-2 rounded-full border border-green-950/25" />
                <Trophy className="relative z-10" size={26} strokeWidth={2.7} />
              </span>
              <span className="leading-none">
                <span className="block font-display text-3xl text-white">MundialData</span>
                <span className="block text-[11px] font-black uppercase text-lime-300">Copa Mundial 2026</span>
              </span>
            </Link>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {nav.map(([label, href]) => (
                <Link className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-black uppercase text-emerald-100/75 hover:border-lime-300/50 hover:bg-lime-300/10 hover:text-white" href={href} key={href}>
                  {label}
                </Link>
              ))}
              <span className="hidden items-center gap-1 rounded-full border border-lime-300/30 px-3 py-2 text-xs font-black uppercase text-lime-300 md:inline-flex">
                <Radio size={14} /> Live
              </span>
            </div>
          </nav>
        </header>
        {children}
        <footer className="relative mx-auto max-w-7xl px-4 py-8 text-sm text-emerald-100/60">
          <p>Fixture, resultados en vivo, equipos, goleadores y formaciones. Horarios en Argentina.</p>
          <p className="mt-2 font-bold text-emerald-100/75">
            Pagina creada por Matias Flores - matiasflores07@icloud.com
          </p>
        </footer>
      </body>
    </html>
  );
}
