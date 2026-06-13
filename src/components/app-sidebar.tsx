import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Bot, Megaphone, Target, FileSearch,
  BookOpen, BarChart3, Bell,
  ShieldCheck, Settings, Stethoscope,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const main = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Agents IA", url: "/agents", icon: Bot },
];

const agents = [
  { title: "Community Manager", url: "/community-manager", icon: Megaphone },
  { title: "Traffic Manager", url: "/traffic-manager", icon: Target },
  { title: "Marchés Publics", url: "/marches-publics", icon: FileSearch },
];

const workspace = [
  { title: "Base de connaissances", url: "/base-connaissances", icon: BookOpen },
  { title: "Rapports", url: "/rapports", icon: BarChart3 },
  { title: "Notifications", url: "/notifications", icon: Bell },
];

const admin = [
  { title: "Administration", url: "/administration", icon: ShieldCheck },
  { title: "Paramètres", url: "/parametres", icon: Settings },
];

export function AppSidebar() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (url: string) => (url === "/" ? path === "/" : path.startsWith(url));

  const renderGroup = (label: string, items: typeof main) => (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                <Link to={item.url} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2.5 px-2 py-2.5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-elegant">
            <Stethoscope className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <div className="truncate text-sm font-bold text-sidebar-foreground">AllMedical</div>
            <div className="truncate text-[11px] text-muted-foreground">AI Hub</div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {renderGroup("Général", main)}
        {renderGroup("Agents IA", agents)}
        {renderGroup("Espace de travail", workspace)}
        {renderGroup("Système", admin)}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-2.5 px-2 py-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">SM</AvatarFallback>
          </Avatar>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <div className="truncate text-sm font-medium">Sophie Martin</div>
            <div className="truncate text-[11px] text-muted-foreground">Directrice Marketing</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
