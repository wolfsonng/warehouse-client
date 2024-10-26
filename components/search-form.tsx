"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SearchFormProps {
  onSearch: (formData: FormData) => Promise<void>;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSearch(formData);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
          <Select name="database" defaultValue="oracle/MAdbtrain">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Database" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oracle/MAdbtrain">Oracle DB1</SelectItem>
              <SelectItem value="oracle/AAIdbtrain">Oracle DB2</SelectItem>
              <SelectItem value="postgres/db1">PostgreSQL DB1</SelectItem>
              <SelectItem value="postgres/db2">PostgreSQL DB2</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="text"
            name="keyword"
            placeholder="Enter keyword"
            className="w-[200px]"
            required
          />

          <Select name="wildcard" defaultValue="%keyword%">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Wildcard" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="%keyword%">Contains</SelectItem>
              <SelectItem value="%keyword">Ends with</SelectItem>
              <SelectItem value="keyword%">Starts with</SelectItem>
              <SelectItem value="keyword">Exact Match</SelectItem>
            </SelectContent>
          </Select>

          <Select name="search_type" defaultValue="column">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Search Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="column">Search by Column</SelectItem>
              <SelectItem value="table">Search by Table</SelectItem>
              <SelectItem value="wildcard_table">Wildcard Table Search</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" disabled={isLoading}>
            <SearchIcon className="mr-2 h-4 w-4" />
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}