import { Search } from "lucide-react";

export function SearchBar({ placeholder = "Buscar seleccion, jugador o partido" }: { placeholder?: string }) {
  return (
    <label className="flex h-12 items-center gap-3 rounded-md border border-white/10 bg-white/[0.06] px-4 text-sky-100 shadow-sm">
      <Search size={18} className="text-sky-300" />
      <input
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-sky-100/45"
        placeholder={placeholder}
      />
    </label>
  );
}
