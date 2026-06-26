"use client";

import { useMemo, useState } from "react";
import { MatchCard } from "@/components/MatchCard";
import { StandingsTable } from "@/components/StandingsTable";
import { Match, MatchStatus, Team } from "@/lib/types";

const statusOptions: Array<{ label: string; value: "" | MatchStatus }> = [
  { label: "Todos", value: "" },
  { label: "Por jugar", value: "scheduled" },
  { label: "En vivo", value: "live" },
  { label: "Final", value: "finished" },
];

const statusLabel: Record<MatchStatus, string> = {
  scheduled: "Por jugar",
  live: "En vivo",
  finished: "Final",
};

function matchIncludesTeam(match: Match, teamId: string) {
  return match.homeTeamId === teamId || match.awayTeamId === teamId;
}

function matchPassesFilters(match: Match, group: string, teamId: string, status: "" | MatchStatus) {
  if (group && match.group !== group) return false;
  if (teamId && !matchIncludesTeam(match, teamId)) return false;
  if (status && match.status !== status) return false;
  return true;
}

export function FixtureExplorer({ groups, matches, teams }: { groups: string[]; matches: Match[]; teams: Team[] }) {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"" | MatchStatus>("");

  const selectedTeamGroup = teams.find((team) => team.id === selectedTeam)?.group ?? "";
  const visibleGroups = selectedGroup
    ? [selectedGroup]
    : selectedTeamGroup
      ? [selectedTeamGroup]
      : groups;

  const filteredMatches = useMemo(
    () => matches.filter((match) => matchPassesFilters(match, selectedGroup, selectedTeam, selectedStatus)),
    [matches, selectedGroup, selectedStatus, selectedTeam],
  );
  const groupMatches = filteredMatches.filter((match) => match.phase === "Fase de grupos");
  const knockoutMatches = filteredMatches.filter((match) => match.phase !== "Fase de grupos");

  return (
    <>
      <div className="grid gap-2 border-b border-emerald-100/15 p-3 sm:grid-cols-3 sm:p-4">
        <select
          className="min-w-0 rounded-md border border-emerald-100/15 bg-[#052617] p-2.5 text-sm text-white sm:p-3"
          onChange={(event) => setSelectedGroup(event.target.value)}
          value={selectedGroup}
        >
          <option value="">Todos los grupos</option>
          {groups.map((group) => (
            <option key={group} value={group}>Grupo {group}</option>
          ))}
        </select>
        <select
          className="min-w-0 rounded-md border border-emerald-100/15 bg-[#052617] p-2.5 text-sm text-white sm:p-3"
          onChange={(event) => setSelectedTeam(event.target.value)}
          value={selectedTeam}
        >
          <option value="">Todas las selecciones</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
        <select
          className="min-w-0 rounded-md border border-emerald-100/15 bg-[#052617] p-2.5 text-sm text-white sm:p-3"
          onChange={(event) => setSelectedStatus(event.target.value as "" | MatchStatus)}
          value={selectedStatus}
        >
          {statusOptions.map((option) => (
            <option key={option.label} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="border-b border-emerald-100/15 bg-[#041f13] px-3 py-3 sm:px-4 sm:py-4">
        <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-xs font-black uppercase text-lime-400 sm:text-sm">Tabla de posiciones por zona</div>
          <div className="text-xs font-bold text-emerald-100/60">
            {filteredMatches.length} partidos {selectedStatus ? `· ${statusLabel[selectedStatus]}` : ""}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {visibleGroups.map((group) => (
            <StandingsTable group={group} key={group} teams={teams.filter((team) => team.group === group)} />
          ))}
        </div>
      </div>

      <div>
        <div className="border-y border-emerald-100/20 bg-[#052617] px-3 py-2 text-xs font-black uppercase text-white sm:px-4 sm:text-sm">
          Fase de grupos
        </div>
        {groupMatches.length ? (
          groupMatches.map((match) => <MatchCard match={match} teams={teams} key={match.id} />)
        ) : (
          <div className="border-t border-emerald-100/20 px-4 py-5 text-sm font-bold text-emerald-100/65">
            No hay partidos de fase de grupos con esos filtros.
          </div>
        )}
      </div>

      <div>
        <div className="border-y border-emerald-100/20 bg-[#052617] px-3 py-2 text-xs font-black uppercase text-white sm:px-4 sm:text-sm">
          Eliminacion directa
        </div>
        {knockoutMatches.length ? (
          knockoutMatches.map((match) => <MatchCard match={match} teams={teams} key={match.id} />)
        ) : (
          <div className="border-t border-emerald-100/20 px-4 py-5 text-sm font-bold text-emerald-100/65">
            No hay partidos de eliminacion directa con esos filtros.
          </div>
        )}
      </div>
    </>
  );
}
