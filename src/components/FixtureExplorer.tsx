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
      <div className="mb-7 grid gap-3 sm:grid-cols-3">
        <select
          className="sport-select min-w-0 p-3 text-sm font-black uppercase tracking-wide"
          onChange={(event) => setSelectedGroup(event.target.value)}
          value={selectedGroup}
        >
          <option value="">Todos los grupos</option>
          {groups.map((group) => (
            <option key={group} value={group}>Grupo {group}</option>
          ))}
        </select>
        <select
          className="sport-select min-w-0 p-3 text-sm font-black uppercase tracking-wide"
          onChange={(event) => setSelectedTeam(event.target.value)}
          value={selectedTeam}
        >
          <option value="">Todas las selecciones</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
        <select
          className="sport-select min-w-0 p-3 text-sm font-black uppercase tracking-wide"
          onChange={(event) => setSelectedStatus(event.target.value as "" | MatchStatus)}
          value={selectedStatus}
        >
          {statusOptions.map((option) => (
            <option key={option.label} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="mb-9">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Grupos</p>
            <h2 className="font-display text-5xl leading-none">Tabla de posiciones</h2>
          </div>
          <div className="text-xs font-black uppercase tracking-[0.12em] text-white/48">
            {filteredMatches.length} partidos {selectedStatus ? `- ${statusLabel[selectedStatus]}` : ""}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleGroups.map((group) => (
            <StandingsTable group={group} key={group} teams={teams.filter((team) => team.group === group)} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-display text-5xl leading-none">Fase de grupos</h2>
        {groupMatches.length ? (
          <div className="grid gap-4">{groupMatches.map((match) => <MatchCard match={match} teams={teams} key={match.id} />)}</div>
        ) : (
          <div className="match-broadcast text-sm font-bold text-white/62">
            No hay partidos de fase de grupos con esos filtros.
          </div>
        )}
      </div>

      <div className="mt-9">
        <h2 className="mb-3 font-display text-5xl leading-none">Eliminacion directa</h2>
        {knockoutMatches.length ? (
          <div className="grid gap-4">{knockoutMatches.map((match) => <MatchCard match={match} teams={teams} key={match.id} />)}</div>
        ) : (
          <div className="match-broadcast text-sm font-bold text-white/62">
            No hay partidos de eliminacion directa con esos filtros.
          </div>
        )}
      </div>
    </>
  );
}
