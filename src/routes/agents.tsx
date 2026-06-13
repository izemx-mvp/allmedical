import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Megaphone, Target, FileSearch, Plus, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/agents")({
  head: () => ({ meta: [{ title: "Agents IA — AllMedical" }] }),
  component: AgentsPage,
});

const agents = [
  {
    name: "Agent Community Manager",
    desc: "Automatise la stratégie de contenu social : LinkedIn, Facebook, Instagram pour le matériel dentaire.",
    icon: Megaphone, color: "bg-primary/10 text-primary",
    stats: { Tâches: 142, Publications: 87, "Taux engagement": "4.8%" },
    status: "actif", to: "/community-manager",
  },
  {
    name: "Agent Traffic Manager",
    desc: "Gère et optimise vos campagnes publicitaires Meta, Google, LinkedIn et TikTok Ads en continu.",
    icon: Target, color: "bg-turquoise/15 text-turquoise",
    stats: { Campagnes: 12, ROAS: "3.4×", "Dépensé/30j": "€ 28k" },
    status: "actif", to: "/traffic-manager",
  },
  {
    name: "Agent Marchés Publics",
    desc: "Analyse les appels d'offres dentaires, scoring de pertinence, résumé CCTP et chat documentaire.",
    icon: FileSearch, color: "bg-warning/15 text-warning-foreground",
    stats: { "AO analysés": 34, Pertinents: 8, "Score moyen": "76/100" },
    status: "actif", to: "/marches-publics",
  },
];

function AgentsPage() {
  return (
    <AppShell
      title="Agents IA"
      description="3 agents spécialisés pour AllMedical. Cliquez pour ouvrir un agent."
      actions={<Button className="bg-gradient-primary shadow-elegant"><Plus className="h-4 w-4 mr-1.5" />Déployer un agent</Button>}
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {agents.map((a) => (
          <Card key={a.name} className="p-6 shadow-card hover:shadow-elegant transition-all border-border/60 group">
            <div className="flex items-start justify-between">
              <div className={`grid h-12 w-12 place-items-center rounded-xl ${a.color}`}>
                <a.icon className="h-6 w-6" />
              </div>
              <Switch defaultChecked />
            </div>
            <h3 className="mt-4 text-lg font-bold">{a.name}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-3">{a.desc}</p>
            <div className="mt-4 grid grid-cols-3 gap-2 py-3 border-y border-border/60">
              {Object.entries(a.stats).map(([k, v]) => (
                <div key={k}>
                  <div className="text-sm font-bold">{v}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{k}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Badge className="bg-success/10 text-success border-0 hover:bg-success/15">● {a.status}</Badge>
              <Button variant="ghost" size="sm" asChild className="group-hover:text-primary">
                <Link to={a.to}>Ouvrir <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
              </Button>
            </div>
          </Card>
        ))}

        <Card className="p-6 border-dashed border-2 border-border bg-muted/30 flex flex-col items-center justify-center text-center min-h-[280px]">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-background shadow-card">
            <Sparkles className="h-6 w-6 text-turquoise" />
          </div>
          <h3 className="mt-4 font-semibold">Bientôt disponible</h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-xs">Agent SAV dentaire, Agent commercial terrain, Agent analyse concurrentielle…</p>
          <Button variant="outline" size="sm" className="mt-4">Suggérer un agent</Button>
        </Card>
      </div>
    </AppShell>
  );
}
