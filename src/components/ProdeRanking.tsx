const ranking = [
  ["Sofi", 24],
  ["Nico", 21],
  ["Mati", 18],
  ["Juli", 15],
];

export function ProdeRanking() {
  return (
    <div className="broadcast-card rounded-2xl p-4">
      <p className="text-xs font-black uppercase tracking-wide text-[#d8ff3f]">Ranking privado</p>
      <h3 className="mt-1 text-lg font-black text-white">Tabla del prode</h3>
      <div className="mt-3 divide-y divide-white/10">
        {ranking.map(([name, points], index) => (
          <div className="flex items-center justify-between py-3 text-sm" key={name}>
            <span className="font-bold text-stone-50">#{index + 1} {name}</span>
            <strong className="rounded-full bg-[#f2efe4] px-3 py-1 text-[#101312]">{points} pts</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
