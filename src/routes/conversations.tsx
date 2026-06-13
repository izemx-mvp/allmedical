import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, Megaphone, Target, FileSearch, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/conversations")({
  head: () => ({ meta: [{ title: "Conversations IA — AllMedical" }] }),
  component: ConvPage,
});

const threads = [
  { agent: "Community Manager", icon: Megaphone, title: "Idées campagne fauteuils Q1", last: "il y a 12 min", color: "text-primary" },
  { agent: "Marchés Publics", icon: FileSearch, title: "CHU Lyon — analyse complète", last: "il y a 1 h", color: "text-warning-foreground" },
  { agent: "Traffic Manager", icon: Target, title: "Pourquoi le ROAS chute ?", last: "il y a 3 h", color: "text-turquoise" },
  { agent: "Community Manager", icon: Megaphone, title: "Webinar ergonomie — promotion", last: "hier", color: "text-primary" },
  { agent: "Marchés Publics", icon: FileSearch, title: "AP-HP — résumé CCTP", last: "hier", color: "text-warning-foreground" },
  { agent: "Traffic Manager", icon: Target, title: "Audience B2B chirurgiens", last: "il y a 2 j", color: "text-turquoise" },
];

const conv = [
  { role: "ai", agent: "Community Manager", text: "Bonjour Sophie 👋 Je vous propose 5 angles pour la campagne fauteuils Q1 : ergonomie, gain de temps, retour sur investissement, témoignages, et innovation technique. Sur lequel voulez-vous démarrer ?" },
  { role: "user", text: "Concentre-toi sur le ROI pour les cabinets indépendants." },
  { role: "ai", agent: "Community Manager", text: "Parfait. Voici un brief en 3 publications LinkedIn :\n\n1. **« 14 mois pour rentabiliser un XR3 »** — chiffres + simulateur.\n2. **« Avant / Après »** — un cabinet équipé, +27% de patients vus.\n3. **Carrousel « 5 calculs que tout dentiste devrait faire »**.\n\nJe lance la génération complète ?" },
];

function ConvPage() {
  return (
    <AppShell title="Conversations IA" description="Historique et chat avec vos agents.">
      <div className="grid lg:grid-cols-[320px_1fr] gap-4 h-[calc(100vh-200px)]">
        <Card className="shadow-card border-border/60 flex flex-col">
          <div className="p-3 border-b space-y-2">
            <Button className="w-full bg-gradient-primary"><Plus className="h-4 w-4 mr-1.5" />Nouvelle conversation</Button>
            <div className="relative"><Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" /><Input placeholder="Rechercher…" className="pl-8 h-9" /></div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {threads.map((t, i) => (
              <button key={i} className={`w-full text-left p-3 rounded-lg hover:bg-muted/60 ${i === 0 ? "bg-muted" : ""}`}>
                <div className="flex items-center gap-2 mb-1"><t.icon className={`h-3.5 w-3.5 ${t.color}`} /><span className="text-[10px] uppercase tracking-wide text-muted-foreground">{t.agent}</span></div>
                <div className="text-sm font-medium truncate">{t.title}</div>
                <div className="text-[11px] text-muted-foreground">{t.last}</div>
              </button>
            ))}
          </div>
        </Card>

        <Card className="shadow-card border-border/60 flex flex-col">
          <div className="p-4 border-b flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10"><Megaphone className="h-4 w-4 text-primary" /></div>
            <div><div className="font-semibold text-sm">Idées campagne fauteuils Q1</div><div className="text-xs text-muted-foreground">Community Manager · GPT-4o</div></div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conv.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  {m.role === "user" ? "SM" : <Bot className="h-4 w-4" />}
                </div>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{m.text}</div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex gap-2">
            <Input placeholder="Message…" className="flex-1" />
            <Button className="bg-gradient-primary"><Send className="h-4 w-4" /></Button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
