import React from "react";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export const AgentSearchFilters = () => {
  const [filters, setFilters] = useAgentsFilters();
  return (
    <div className="relative ">
      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        className="h-9 bg-white w-[200px] pl-7"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
    </div>
  );
};
