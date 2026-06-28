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
    <main className="mx-auto max-w-5xl px-3 py-5 sm:px-4 sm:py-8">
      <section className="sports-panel broadcast-field rounded-2xl p-4 sm:p-6">
        <p className="text-xs font-black uppercase tracking-wide text-[#d8ff3f]">Sala tactica</p>
        <h1 className="font-display text-5xl leading-none text-white sm:text-6xl">Datos utiles para prode</h1>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {tips.map(([title, body]) => <article className="broadcast-card rounded-2xl p-4" key={title}><h2 className="text-xl font-black text-white">{title}</h2><p className="mt-2 text-stone-300/70">{body}</p></article>)}
      </section>
    </main>
  );
}
