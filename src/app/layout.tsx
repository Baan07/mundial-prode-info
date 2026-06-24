import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Trophy } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mundial Prode Info",
  description: "Fixture, selecciones, predicciones y herramientas para prodes recreativos del Mundial 2026.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Mundial Prode Info",
    description: "Datos y predicciones recreativas para armar prodes del Mundial 2026.",
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
  ["Jugadores", "/jugadores"],
  ["Goleadores", "/goleadores"],
  ["Prode", "/prode"],
  ["Admin", "/admin"],
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body>
        <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/85 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
            <Link className="flex items-center gap-2 text-lg font-black text-white" href="/">
              <span className="grid size-9 place-items-center rounded-md bg-sky-400 text-slate-950"><Trophy size={20} /></span>
              Mundial Prode Info
            </Link>
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
              {nav.map(([label, href]) => (
                <Link className="rounded-md px-3 py-2 text-sm font-bold text-sky-100/75 hover:bg-white/10 hover:text-white" href={href} key={href}>
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        {children}
        <footer className="mx-auto max-w-7xl px-4 py-8 text-sm text-sky-100/55">
          Predicciones con fines informativos y de entretenimiento. No garantizan resultados.
        </footer>
      </body>
    </html>
  );
}
