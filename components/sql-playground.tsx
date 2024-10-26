"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { PlayIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SQLPlayground() {
  const [sql, setSql] = useState("");
  const [formattedSql, setFormattedSql] = useState("");
  const [results, setResults] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formatSQL = (sql: string) => {
    // Basic SQL formatting (you might want to use a proper SQL formatter library)
    return sql
      .replace(/\s+/g, " ")
      .replace(/\s*([,()])\s*/g, "$1 ")
      .replace(/\s*(=|>|<|\+|-|\*|\/)\s*/g, " $1 ")
      .replace(/\b(SELECT|FROM|WHERE|AND|OR|ORDER BY|GROUP BY|HAVING|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS)\b/gi, 
        (match) => `\n${match.toUpperCase()}`
      )
      .trim();
  };

  const handleExecute = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://your-flask-api-url/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sql }),
      });
      const data = await response.json();
      setResults(data);
      setFormattedSql(formatSQL(sql));
    } catch (error) {
      console.error("Query execution failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">SQL Playground</h2>
        <p className="text-muted-foreground">
          Write and execute SQL queries to explore your databases.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Query Editor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            placeholder="Enter your SQL query here..."
            className="min-h-[200px] font-mono"
          />
          <div className="flex justify-end">
            <Button onClick={handleExecute} disabled={isLoading}>
              <PlayIcon className="mr-2 h-4 w-4" />
              {isLoading ? "Executing..." : "Execute"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {formattedSql && (
        <Card>
          <CardHeader>
            <CardTitle>Formatted Query</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted rounded-lg p-4 overflow-x-auto">
              <code className="text-sm">{formattedSql}</code>
            </pre>
          </CardContent>
        </Card>
      )}

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Query Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {Object.keys(results[0] || {}).map((key) => (
                      <th key={key} className="border p-2 bg-muted text-left">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((value: any, j) => (
                        <td key={j} className="border p-2">
                          {value?.toString() || ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}