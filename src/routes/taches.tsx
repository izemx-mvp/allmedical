import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/taches")({
  head: () => ({ meta: [{ title: "Tâches — AllMedical" }] }),
  component: TasksPage,
});

const cols = [
  { name: "À faire", color: "bg-muted", tasks: [
    { t: "Valider 5 visuels Insta Premium XR3", agent: "Community Manager", due: "Aujourd'hui" },
    { t: "Réviser ciblage Meta « Stérilisateurs »", agent: "Traffic Manager", due: "Demain" },
    { t: "Compléter mémoire technique CHU Lyon", agent: "Marchés Publics", due: "12 déc." },
  ]},
  { name: "En cours", color: "bg-primary/10", tasks: [
    { t: "Génération calendrier janvier 2027", agent: "Community Manager", due: "Auto" },
    { t: "Optimisation campagne LinkedIn B2B", agent: "Traffic Manager", due: "En cours" },
  ]},
  { name: "En validation", color: "bg-warning/15", tasks: [
    { t: "12 idées LinkedIn — fauteuils dentaires", agent: "Community Manager", due: "Marie D." },
    { t: "Nouveau visuel Meta XR3 v3", agent: "Traffic Manager", due: "Sophie M." },
    { t: "Pré-mémoire AP-HP", agent: "Marchés Publics", due: "Direction" },
  ]},
  { name: "Terminé", color: "bg-success/10", tasks: [
    { t: "Publication LinkedIn implants", agent: "Community Manager", due: "Hier" },
    { t: "Analyse AO Saint-Joseph", agent: "Marchés Publics", due: "Hier" },
  ]},
];

function TasksPage() {
  return (
    <AppShell
      title="Tâches"
      description="Vue Kanban des actions générées par les agents IA et l'équipe."
      actions={<Button className="bg-gradient-primary"><Plus className="h-4 w-4 mr-1.5" />Nouvelle tâche</Button>}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cols.map((col) => (
          <div key={col.name}>
            <div className={`flex items-center justify-between rounded-lg px-3 py-2 mb-3 ${col.color}`}>
              <h3 className="text-sm font-semibold">{col.name}</h3>
              <Badge variant="secondary" className="text-[10px]">{col.tasks.length}</Badge>
            </div>
            <div className="space-y-2">
              {col.tasks.map((t, i) => (
                <Card key={i} className="p-3 shadow-card border-border/60 hover:shadow-elegant cursor-grab">
                  <div className="flex items-start gap-2">
                    <Checkbox className="mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium leading-snug">{t.t}</div>
                      <div className="mt-2 flex items-center justify-between text-[11px]">
                        <Badge variant="outline" className="text-[10px]">{t.agent}</Badge>
                        <span className="text-muted-foreground">{t.due}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
