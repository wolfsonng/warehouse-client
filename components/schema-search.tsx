"use client";

import { useState } from "react";
import { SearchForm } from "@/components/search-form";
import { SearchResults } from "@/components/search-results";
import { SearchResponse } from "@/types/api";

export function SchemaSearch() {
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://your-flask-api-url/query", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Schema Search</h2>
        <p className="text-muted-foreground">
          Search across database schemas, tables, and columns.
        </p>
      </div>
      <div className="flex flex-col space-y-8">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        <SearchResults results={searchResults} isLoading={isLoading} />
      </div>
    </div>
  );
}