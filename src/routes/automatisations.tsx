import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Workflow, Zap, Plus, ArrowRight, FileSearch, AlertTriangle, CheckCircle2, Mail, MessageSquare, Bell } from "lucide-react";

export const Route = createFileRoute("/automatisations")({
  head: () => ({ meta: [{ title: "Automatisations — AllMedical" }] }),
  component: AutoPage,
});

const flows = [
  {
    name: "Nouvel AO → Notifier Direction",
    trigger: { icon: FileSearch, t: "Nouvel AO détecté (score ≥ 80)" },
    action: { icon: Bell, t: "Notifier Direction + Teams #marches-publics" },
    runs: 18, active: true,
  },
  {
    name: "ROAS critique → Alerte marketing",
    trigger: { icon: AlertTriangle, t: "ROAS campagne < 1" },
    action: { icon: Mail, t: "Email Sophie M. + Slack #ads-alertes" },
    runs: 7, active: true,
  },
  {
    name: "Publication validée → Graphiste",
    trigger: { icon: CheckCircle2, t: "Publication validée par marketing" },
    action: { icon: MessageSquare, t: "Tâche assignée graphiste + envoi brief" },
    runs: 42, active: true,
  },
  {
    name: "AO < 7 jours → Rappel responsable",
    trigger: { icon: FileSearch, t: "Échéance AO < 7 jours" },
    action: { icon: Bell, t: "Rappel WhatsApp + Email responsable AO" },
    runs: 12, active: true,
  },
  {
    name: "Hashtag trending → Suggestion contenu",
    trigger: { icon: Zap, t: "Hashtag #dentaire tendance LinkedIn" },
    action: { icon: MessageSquare, t: "Génère 5 idées de posts + notifie CM" },
    runs: 5, active: false,
  },
];

function AutoPage() {
  return (
    <AppShell
      title="Automatisations"
      description="Workflows no-code entre vos agents IA, vos outils et votre équipe."
      actions={<Button className="bg-gradient-primary"><Plus className="h-4 w-4 mr-1.5" />Nouvel automatisme</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        {[{ l: "Workflows actifs", v: 12 }, { l: "Exécutions / 30j", v: "1 248" }, { l: "Temps gagné estimé", v: "84 h" }].map((k) => (
          <Card key={k.l} className="p-5 shadow-card border-border/60"><div className="text-sm text-muted-foreground">{k.l}</div><div className="mt-2 text-2xl font-bold">{k.v}</div></Card>
        ))}
      </div>

      <div className="space-y-3">
        {flows.map((f) => (
          <Card key={f.name} className="p-5 shadow-card border-border/60">
            <div className="flex items-start gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-primary"><Workflow className="h-5 w-5 text-primary-foreground" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3"><h3 className="font-semibold">{f.name}</h3><Badge variant="secondary" className="text-[10px]">{f.runs} exécutions</Badge></div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 rounded-lg bg-warning/10 px-3 py-2 text-sm flex-1"><f.trigger.icon className="h-4 w-4 text-warning-foreground shrink-0" /><span className="truncate">SI · {f.trigger.t}</span></div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />
                  <div className="flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2 text-sm flex-1"><f.action.icon className="h-4 w-4 text-success shrink-0" /><span className="truncate">ALORS · {f.action.t}</span></div>
                </div>
              </div>
              <Switch defaultChecked={f.active} className="shrink-0 mt-1" />
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
