import { teams } from "@/lib/data";

export function GroupTable({ group }: { group?: string }) {
  const rows = teams
    .filter((team) => !group || team.group === group)
    .sort((a, b) => b.points - a.points || b.goalsFor - b.goalsAgainst - (a.goalsFor - a.goalsAgainst));

  return (
    <div className="overflow-hidden rounded-lg border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/[0.07] text-xs uppercase text-sky-100/65">
          <tr><th className="p-3">Equipo</th><th>Pts</th><th>PJ</th><th>DG</th></tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((team) => (
            <tr key={team.id} className="text-sky-50">
              <td className="p-3 font-semibold">{team.flag} {team.name}</td>
              <td>{team.points}</td>
              <td>{team.played}</td>
              <td>{team.goalsFor - team.goalsAgainst}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
