import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  HomeIcon, 
  DatabaseIcon, 
  SearchIcon,
  SettingsIcon, 
  HelpCircleIcon,
  CodeIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ activeTab, onTabChange, isOpen, onToggle }: SidebarProps) {
  const menuItems = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "schema-search", label: "Schema Search", icon: SearchIcon },
    { id: "playground", label: "Playground", icon: CodeIcon },
    { id: "databases", label: "Databases", icon: DatabaseIcon },
    { id: "settings", label: "Settings", icon: SettingsIcon },
    { id: "help", label: "Help", icon: HelpCircleIcon },
  ];

  return (
    <div className={cn(
      "fixed left-0 top-14 z-30 h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r bg-background md:sticky md:block",
      isOpen ? "block" : "hidden md:block md:w-16"
    )}>
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center justify-end border-b px-4 md:h-[52px]">
          <Button variant="ghost" size="icon" onClick={onToggle} className="hidden md:flex">
            {isOpen ? <ChevronLeftIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
          </Button>
        </div>
        <ScrollArea className="flex-1 px-4 py-6">
          <div className="space-y-4">
            <div className="py-2">
              {isOpen && <h2 className="mb-2 px-2 text-lg font-semibold">Navigation</h2>}
              <div className="space-y-1">
                {menuItems.map(({ id, label, icon: Icon }) => (
                  <Button
                    key={id}
                    variant={activeTab === id ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      activeTab === id && "bg-secondary",
                      !isOpen && "justify-center px-2"
                    )}
                    onClick={() => onTabChange(id)}
                  >
                    <Icon className={cn("h-4 w-4", isOpen && "mr-2")} />
                    {isOpen && label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}