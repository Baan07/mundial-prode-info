import { Search } from "lucide-react";

export function SearchBar({ placeholder = "Buscar seleccion, jugador o partido" }: { placeholder?: string }) {
  return (
    <label className="broadcast-input flex h-12 items-center gap-3 rounded-xl px-4 shadow-sm">
      <Search size={18} className="text-[#d8ff3f]" />
      <input
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-stone-300/45"
        placeholder={placeholder}
      />
    </label>
  );
}
