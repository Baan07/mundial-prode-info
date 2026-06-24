const tips = [
  ["Favorito claro", "Argentina vs Estados Unidos por diferencia de fuerza estimada."],
  ["Partido parejo", "Portugal vs Alemania: conviene cubrir marcador corto."],
  ["Muchos goles", "Brasil vs Francia tiene atacantes de elite en ambos lados."],
  ["Pocos goles", "Uruguay vs Paises Bajos puede ser fisico y cerrado."],
  ["Mejor defensa", "Argentina y Francia aparecen fuertes en arco y centrales."],
  ["Posibles sorpresas", "Estados Unidos de localia puede incomodar a favoritos."],
];

export default function TipsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-4xl font-black text-white">Datos utiles para prode</h1>
      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {tips.map(([title, body]) => <article className="rounded-lg border border-white/10 bg-white/[0.05] p-4" key={title}><h2 className="text-xl font-bold text-white">{title}</h2><p className="mt-2 text-sky-100/70">{body}</p></article>)}
      </section>
    </main>
  );
}
