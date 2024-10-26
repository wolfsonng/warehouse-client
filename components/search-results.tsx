import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchResponse } from "@/types/api";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchResultsProps {
  results: SearchResponse | null;
  isLoading: boolean;
}

export function SearchResults({ results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-[200px]" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!results) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No results yet. Use the search form above to begin.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>
          {results.db_type} {results.db_key} Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Search Result</TableHead>
              {results.results[0]?.associatedData && (
                <TableHead>Associated Data</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.results.map((result, index) => (
              <TableRow key={index}>
                <TableCell>{result.value}</TableCell>
                {result.associatedData && (
                  <TableCell>{result.associatedData}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}