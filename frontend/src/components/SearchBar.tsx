import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";
import type { GetUsersPayload } from "@/api/userApi";

interface SearchBarProps {
  onSearch: (filters: GetUsersPayload) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [filters, setFilters] = useState<GetUsersPayload>({
    user_id: "",
    mob_num: "",
    manager_id: "",
  });

  const handleSearch = () => {
    // Only send non-empty filters
    const activeFilters: GetUsersPayload = {};
    if (filters.user_id?.trim()) activeFilters.user_id = filters.user_id.trim();
    if (filters.mob_num?.trim()) activeFilters.mob_num = filters.mob_num.trim();
    if (filters.manager_id?.trim()) activeFilters.manager_id = filters.manager_id.trim();

    onSearch(activeFilters);
  };

  const handleClear = () => {
    setFilters({
      user_id: "",
      mob_num: "",
      manager_id: "",
    });
    onSearch({});
  };

  const hasFilters = filters.user_id || filters.mob_num || filters.manager_id;

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-md space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Search className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Search Users</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search-user-id" className="text-sm">User ID</Label>
          <Input
            id="search-user-id"
            placeholder="UUID v4"
            value={filters.user_id}
            onChange={(e) => setFilters({ ...filters, user_id: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="search-mobile" className="text-sm">Mobile Number</Label>
          <Input
            id="search-mobile"
            placeholder="1234567890"
            value={filters.mob_num}
            onChange={(e) => setFilters({ ...filters, mob_num: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="search-manager" className="text-sm">Manager ID</Label>
          <Input
            id="search-manager"
            placeholder="UUID v4"
            value={filters.manager_id}
            onChange={(e) => setFilters({ ...filters, manager_id: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button onClick={handleSearch} className="flex-1">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
        {hasFilters && (
          <Button variant="outline" onClick={handleClear}>
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
