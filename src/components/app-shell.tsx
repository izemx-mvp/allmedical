import type { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Bell, Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AppShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col min-w-0">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-xl md:px-6">
            <SidebarTrigger className="shrink-0" />
            <div className="relative hidden md:block w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Rechercher agents, documents, AO…" className="h-9 pl-9 bg-muted/50 border-transparent focus-visible:bg-background" />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-turquoise" />
                <span className="text-xs">Crédits IA: 84%</span>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 text-[10px] bg-destructive">5</Badge>
              </Button>
            </div>
          </header>
          <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-end sm:justify-between">
                <div className="min-w-0">
                  <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
                  {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
                </div>
                {actions && <div className="shrink-0 flex items-center gap-2">{actions}</div>}
              </div>
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
