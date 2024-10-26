"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { DatabaseIcon, MenuIcon } from "lucide-react";
import { SchemaSearch } from "@/components/schema-search";
import { SQLPlayground } from "@/components/sql-playground";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  const [activeTab, setActiveTab] = useState("schema-search");
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 md:hidden"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-2">
            <DatabaseIcon className="h-6 w-6" />
            <span className="font-bold">Database Explorer</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            {/* Reserved for future nav items like user profile, etc */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          isOpen={isSidebarOpen}
          onToggle={() => setSidebarOpen(!isSidebarOpen)}
        />
        <main className={cn(
          "flex w-full flex-col overflow-hidden",
          isSidebarOpen ? "md:ml-0" : "md:ml-0"
        )}>
          {activeTab === "schema-search" && <SchemaSearch />}
          {activeTab === "playground" && <SQLPlayground />}
          {/* Add other tab contents here */}
        </main>
      </div>
    </div>
  );
}