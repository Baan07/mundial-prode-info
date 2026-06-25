import Image from "next/image";
import { Team } from "@/lib/types";

const sizeClass = {
  xs: "size-5",
  sm: "size-6",
  md: "size-8",
  lg: "size-12",
  xl: "size-16",
};

const iso3ToFlagCode: Record<string, string> = {
  ARG: "ar",
  BRA: "br",
  ENG: "gb-eng",
  ESP: "es",
  FRA: "fr",
  GER: "de",
  NED: "nl",
  POR: "pt",
  URU: "uy",
  USA: "us",
};

export function FlagBadge({ team, size = "md" }: { team: Team; size?: keyof typeof sizeClass }) {
  const flagUrl = team.flagUrl ?? (team.flagCode ? `https://flagcdn.com/w80/${team.flagCode}.png` : undefined) ?? (iso3ToFlagCode[team.countryCode] ? `https://flagcdn.com/w80/${iso3ToFlagCode[team.countryCode]}.png` : undefined);

  if (flagUrl) {
    return (
      <Image
        alt={`Bandera de ${team.name}`}
        className={`${sizeClass[size]} shrink-0 rounded-full object-cover ring-2 ring-white/80`}
        height={80}
        loading="lazy"
        src={flagUrl}
        width={80}
      />
    );
  }

  return (
    <span className={`${sizeClass[size]} grid shrink-0 place-items-center rounded-full bg-lime-400 text-[9px] font-black text-green-950 ring-2 ring-white/80`}>
      FIFA
    </span>
  );
}
