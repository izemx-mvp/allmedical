import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail, MessageSquare, Smartphone, Users, FileSearch, Target, AlertTriangle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — AllMedical" }] }),
  component: NotifPage,
});

const notifs = [
  { type: "urgent", icon: AlertTriangle, tone: "bg-destructive/10 text-destructive", title: "AO CHU Lyon — échéance dans 5 jours", desc: "Mémoire technique non finalisé, visite obligatoire 09/12.", time: "il y a 12 min" },
  { type: "urgent", icon: AlertTriangle, tone: "bg-destructive/10 text-destructive", title: "Campagne « Implants Search » — ROAS 0.9×", desc: "Recommandation IA : arrêter la campagne immédiatement.", time: "il y a 1 h" },
  { type: "info", icon: FileSearch, tone: "bg-turquoise/15 text-turquoise", title: "Nouvel AO détecté — Score 88", desc: "AP-HP · Équipement bloc opératoire dentaire · € 1.28 M", time: "il y a 2 h" },
  { type: "info", icon: Target, tone: "bg-primary/10 text-primary", title: "Optimisation Meta appliquée", desc: "Budget +20% sur « Lead magnet — Guide hygiène ».", time: "il y a 4 h" },
  { type: "success", icon: CheckCircle2, tone: "bg-success/10 text-success", title: "9 publications validées par Marie D.", desc: "Calendrier éditorial décembre à 87% complet.", time: "hier" },
];

const channels = [
  { name: "Email", icon: Mail, desc: "sophie.martin@allmedical.fr", active: true },
  { name: "SMS", icon: Smartphone, desc: "+33 6 12 34 56 78", active: true },
  { name: "WhatsApp", icon: MessageSquare, desc: "Notifications urgentes uniquement", active: true },
  { name: "Microsoft Teams", icon: Users, desc: "#allmedical-ia", active: true },
  { name: "Slack", icon: MessageSquare, desc: "#ads-alertes, #marches-publics", active: false },
];

function NotifPage() {
  return (
    <AppShell title="Notifications" description="Centre unifié pour rester informé de toutes les actions critiques.">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">5 notifications · 2 urgentes</h2>
            <Button variant="ghost" size="sm">Tout marquer comme lu</Button>
          </div>
          {notifs.map((n, i) => (
            <Card key={i} className="p-4 shadow-card border-border/60 hover:shadow-elegant flex gap-4">
              <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${n.tone}`}><n.icon className="h-5 w-5" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-sm">{n.title}</h3>
                  {n.type === "urgent" && <Badge className="bg-destructive text-destructive-foreground border-0 text-[10px]">Urgent</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{n.desc}</p>
                <div className="text-[11px] text-muted-foreground mt-2">{n.time}</div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-5 shadow-card border-border/60 h-fit">
          <h3 className="font-semibold flex items-center gap-2"><Bell className="h-4 w-4 text-primary" />Canaux</h3>
          <p className="text-xs text-muted-foreground mb-4">Où recevoir les alertes ?</p>
          <div className="space-y-3">
            {channels.map((c) => (
              <div key={c.name} className="flex items-center gap-3 py-2">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-muted"><c.icon className="h-4 w-4" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-[11px] text-muted-foreground truncate">{c.desc}</div>
                </div>
                <Switch defaultChecked={c.active} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
