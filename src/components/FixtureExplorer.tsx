"use client";

import { useMemo, useState } from "react";
import { MatchCard } from "@/components/MatchCard";
import { Match, MatchStatus, Team } from "@/lib/types";

const statusOptions: Array<{ label: string; value: "" | MatchStatus }> = [
  { label: "Todos", value: "" },
  { label: "Por jugar", value: "scheduled" },
  { label: "En vivo", value: "live" },
];

const statusLabel: Record<MatchStatus, string> = {
  scheduled: "Por jugar",
  live: "En vivo",
  finished: "Final",
};

function matchIncludesTeam(match: Match, teamId: string) {
  return match.homeTeamId === teamId || match.awayTeamId === teamId;
}

function isKnockoutFromRoundOf32(match: Match) {
  return match.phase !== "Fase de grupos";
}

function argentinaDate(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
  }).format(new Date(value));
}

function fullDayTitle(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    timeZone: "America/Argentina/Buenos_Aires",
    weekday: "long",
  }).format(new Date(`${date}T12:00:00Z`));
}

function matchPassesFilters(match: Match, phase: string, teamId: string, status: "" | MatchStatus) {
  if (!isKnockoutFromRoundOf32(match)) return false;
  if (match.status === "finished") return false;
  if (phase && match.phase !== phase) return false;
  if (teamId && !matchIncludesTeam(match, teamId)) return false;
  if (status && match.status !== status) return false;
  return true;
}

export function FixtureExplorer({ matches, teams }: { groups: string[]; matches: Match[]; teams: Team[] }) {
  const [selectedPhase, setSelectedPhase] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"" | MatchStatus>("");

  const phases = useMemo(
    () => Array.from(new Set(matches.filter(isKnockoutFromRoundOf32).map((match) => match.phase))).filter(Boolean),
    [matches],
  );

  const filteredMatches = useMemo(
    () => matches
      .filter((match) => matchPassesFilters(match, selectedPhase, selectedTeam, selectedStatus))
      .sort((a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime()),
    [matches, selectedPhase, selectedStatus, selectedTeam],
  );
  const matchesByDate = useMemo(() => {
    const byDate = new Map<string, Match[]>();
    for (const match of filteredMatches) {
      const date = argentinaDate(match.kickoffAt);
      byDate.set(date, [...(byDate.get(date) ?? []), match]);
    }
    return Array.from(byDate.entries()).map(([date, items]) => ({ date, matches: items }));
  }, [filteredMatches]);

  return (
    <>
      <div className="mb-7 grid gap-3 sm:grid-cols-3">
        <select
          className="sport-select min-w-0 p-3 text-sm font-black uppercase tracking-wide"
          onChange={(event) => setSelectedPhase(event.target.value)}
          value={selectedPhase}
        >
          <option value="">Todas las fases</option>
          {phases.map((phase) => (
            <option key={phase} value={phase}>{phase}</option>
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
            <p className="section-kicker">Desde 16avos</p>
            <h2 className="font-display text-5xl leading-none">Cruces definidos</h2>
          </div>
          <div className="text-xs font-black uppercase tracking-[0.12em] text-white/48">
            {filteredMatches.length} partidos {selectedStatus ? `- ${statusLabel[selectedStatus]}` : ""}
          </div>
        </div>
        {matchesByDate.length ? (
          <div className="grid gap-7">
            {matchesByDate.map((group) => (
              <section className="grid gap-3" key={group.date}>
                <div className="flex items-end justify-between gap-3">
                  <h3 className="font-display text-4xl leading-none capitalize">{fullDayTitle(group.date)}</h3>
                  <span className="text-xs font-black uppercase tracking-[0.14em] text-white/44">
                    {group.matches.length} partido{group.matches.length === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="grid gap-4">
                  {group.matches.map((match) => <MatchCard match={match} teams={teams} key={match.id} />)}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="match-broadcast text-sm font-bold text-white/62">
            No hay cruces pendientes desde 16avos con esos filtros.
          </div>
        )}
      </div>
    </>
  );
}
