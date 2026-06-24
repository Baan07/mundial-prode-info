const ranking = [
  ["Sofi", 24],
  ["Nico", 21],
  ["Mati", 18],
  ["Juli", 15],
];

export function ProdeRanking() {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
      <h3 className="text-lg font-bold text-white">Tabla del prode</h3>
      <div className="mt-3 divide-y divide-white/10">
        {ranking.map(([name, points], index) => (
          <div className="flex items-center justify-between py-3 text-sm" key={name}>
            <span className="text-sky-50">#{index + 1} {name}</span>
            <strong className="text-white">{points} pts</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
