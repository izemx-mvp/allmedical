import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Bot, Megaphone, Target, FileSearch, Clock, Euro, TrendingUp, CheckCircle2,
  Sparkles, Activity, Bell, FileText, Plus,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip,
  CartesianGrid, Legend,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AllMedical AI Hub — Tableau de bord" },
      { name: "description", content: "Centralisez vos agents IA marketing, publicité et marchés publics dentaires." },
    ],
  }),
  component: Dashboard,
});

const kpis = [
  { label: "Agents IA actifs", value: "3", delta: "+1 ce mois", icon: Bot, tone: "primary" },
  { label: "Tâches réalisées aujourd'hui", value: "47", delta: "+18 vs hier", icon: CheckCircle2, tone: "success" },
  { label: "Publications générées", value: "128", delta: "+23 cette semaine", icon: Megaphone, tone: "primary" },
  { label: "Campagnes pub actives", value: "12", delta: "ROAS moyen 3.4×", icon: Target, tone: "turquoise" },
  { label: "Appels d'offres analysés", value: "34", delta: "8 pertinents", icon: FileSearch, tone: "primary" },
  { label: "Notifications en attente", value: "5", delta: "2 urgentes", icon: Bell, tone: "warning" },
  { label: "Coût IA estimé / mois", value: "4 120 MAD", delta: "Budget 70%", icon: Euro, tone: "primary" },
  { label: "Temps gagné estimé", value: "184 h", delta: "≈ 23 jours/homme", icon: Clock, tone: "turquoise" },
];

const activityData = [
  { d: "Lun", CM: 12, TM: 8, AO: 4 },
  { d: "Mar", CM: 18, TM: 11, AO: 6 },
  { d: "Mer", CM: 15, TM: 14, AO: 3 },
  { d: "Jeu", CM: 22, TM: 10, AO: 7 },
  { d: "Ven", CM: 28, TM: 16, AO: 5 },
  { d: "Sam", CM: 8, TM: 4, AO: 2 },
  { d: "Dim", CM: 4, TM: 2, AO: 1 },
];

const tasksPerAgent = [
  { name: "Community Mgr", tasks: 142 },
  { name: "Traffic Mgr", tasks: 89 },
  { name: "Marchés Publics", tasks: 34 },
];

const monthlyEvolution = [
  { m: "Juil", value: 120 }, { m: "Août", value: 145 }, { m: "Sept", value: 168 },
  { m: "Oct", value: 210 }, { m: "Nov", value: 245 }, { m: "Déc", value: 287 },
];

const activityFeed = [
  { agent: "Community Manager", action: "a généré 12 idées de contenu LinkedIn pour les fauteuils Premium XR3", time: "il y a 4 min", icon: Megaphone, tone: "bg-primary/10 text-primary" },
  { agent: "Traffic Manager", action: "a optimisé la campagne Meta « Promo Stérilisateurs Q4 » — budget +15%", time: "il y a 12 min", icon: Target, tone: "bg-turquoise/15 text-turquoise" },
  { agent: "Marchés Publics", action: "a détecté un nouvel AO « CHU Lyon — Équipement bloc opératoire dentaire » (Score 92/100)", time: "il y a 28 min", icon: FileSearch, tone: "bg-warning/15 text-warning-foreground" },
  { agent: "Community Manager", action: "a publié 3 visuels Instagram validés par Marie D.", time: "il y a 1 h", icon: CheckCircle2, tone: "bg-success/10 text-success" },
  { agent: "Traffic Manager", action: "alerte ROAS < 1 sur campagne Google « Implants dentaires »", time: "il y a 2 h", icon: Activity, tone: "bg-destructive/10 text-destructive" },
  { agent: "Marchés Publics", action: "a résumé le CCTP « Hôpital Saint-Joseph — 142 pages »", time: "il y a 3 h", icon: FileText, tone: "bg-primary/10 text-primary" },
];

const toneClass: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  turquoise: "bg-turquoise/15 text-turquoise",
  success: "bg-success/10 text-success",
  warning: "bg-warning/15 text-warning-foreground",
};

function Dashboard() {
  return (
    <AppShell
      title="Tableau de bord"
      description="Vue d'ensemble de vos agents IA et de l'activité AllMedical."
      actions={
        <>
          <Button variant="outline" size="sm"><Sparkles className="h-4 w-4 mr-1.5 text-turquoise" />Nouveau prompt</Button>
          <Button size="sm" className="bg-gradient-primary shadow-elegant"><Plus className="h-4 w-4 mr-1.5" />Nouvel agent</Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label} className="p-5 shadow-card hover:shadow-elegant transition-shadow border-border/60">
            <div className="flex items-start justify-between">
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${toneClass[k.tone]}`}>
                <k.icon className="h-5 w-5" />
              </div>
              <Badge variant="secondary" className="text-[10px] font-medium">{k.delta}</Badge>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold tracking-tight">{k.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{k.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2 shadow-card border-border/60">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Activité des agents IA</h3>
              <p className="text-xs text-muted-foreground">7 derniers jours · tâches exécutées par agent</p>
            </div>
            <Badge className="bg-success/10 text-success hover:bg-success/15 border-0"><TrendingUp className="h-3 w-3 mr-1" />+34%</Badge>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="cm" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4}/><stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0}/></linearGradient>
                <linearGradient id="tm" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.4}/><stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0}/></linearGradient>
                <linearGradient id="ao" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-chart-4)" stopOpacity={0.4}/><stop offset="100%" stopColor="var(--color-chart-4)" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="CM" name="Community Mgr" stroke="var(--color-chart-1)" fill="url(#cm)" strokeWidth={2} />
              <Area type="monotone" dataKey="TM" name="Traffic Mgr" stroke="var(--color-chart-2)" fill="url(#tm)" strokeWidth={2} />
              <Area type="monotone" dataKey="AO" name="Marchés Publics" stroke="var(--color-chart-4)" fill="url(#ao)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 shadow-card border-border/60">
          <h3 className="font-semibold">Tâches par agent</h3>
          <p className="text-xs text-muted-foreground mb-4">Total cumulé 30 jours</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={tasksPerAgent} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
              <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="var(--color-muted-foreground)" fontSize={11} width={95} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Bar dataKey="tasks" fill="var(--color-primary)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 shadow-card border-border/60">
          <h3 className="font-semibold">Performance marketing</h3>
          <p className="text-xs text-muted-foreground mb-4">Évolution mensuelle des conversions</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={monthlyEvolution}>
              <defs><linearGradient id="ev" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-turquoise)" stopOpacity={0.5}/><stop offset="100%" stopColor="var(--color-turquoise)" stopOpacity={0}/></linearGradient></defs>
              <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Area type="monotone" dataKey="value" stroke="var(--color-turquoise)" fill="url(#ev)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div><div className="text-lg font-bold">3.4×</div><div className="text-[11px] text-muted-foreground">ROAS</div></div>
            <div><div className="text-lg font-bold">280k MAD</div><div className="text-[11px] text-muted-foreground">Dépensé</div></div>
            <div><div className="text-lg font-bold">412</div><div className="text-[11px] text-muted-foreground">Leads</div></div>
          </div>
        </Card>

        <Card className="p-5 lg:col-span-2 shadow-card border-border/60">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2"><Activity className="h-4 w-4 text-turquoise" />Fil d'activité temps réel</h3>
              <p className="text-xs text-muted-foreground">Dernières actions des agents IA</p>
            </div>
            <Button variant="ghost" size="sm" asChild><Link to="/conversations">Tout voir</Link></Button>
          </div>
          <ul className="space-y-3">
            {activityFeed.map((a, i) => (
              <li key={i} className="flex gap-3 items-start p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${a.tone}`}>
                  <a.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm"><span className="font-semibold">{a.agent}</span> <span className="text-muted-foreground">{a.action}</span></div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{a.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { l: "Quota IA mensuel", v: 70, sub: "4 120 / 5 900 MAD" },
          { l: "Validations en attente", v: 45, sub: "9 publications" },
          { l: "Conformité RGPD", v: 100, sub: "Audit du 12 nov." },
        ].map((s) => (
          <Card key={s.l} className="p-5 shadow-card border-border/60">
            <div className="flex items-center justify-between text-sm"><span className="font-medium">{s.l}</span><span className="text-muted-foreground text-xs">{s.sub}</span></div>
            <Progress value={s.v} className="mt-3 h-2" />
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
