import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Plus, Sparkles, AlertTriangle, Euro } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";

export const Route = createFileRoute("/traffic-manager")({
  head: () => ({ meta: [{ title: "Traffic Manager — AllMedical" }] }),
  component: TMPage,
});

const campaigns = [
  { name: "Promo Fauteuils Premium XR3", net: "Meta", budget: 1200, spent: 940, roas: 4.2, ctr: "3.8%", status: "rentable" },
  { name: "Stérilisateurs Q4 — Retargeting", net: "Meta", budget: 800, spent: 612, roas: 5.1, ctr: "4.6%", status: "rentable" },
  { name: "Implants dentaires — Search", net: "Google", budget: 2400, spent: 2100, roas: 0.9, ctr: "1.2%", status: "risque" },
  { name: "Radiologie panoramique B2B", net: "LinkedIn", budget: 1500, spent: 720, roas: 3.4, ctr: "2.1%", status: "actif" },
  { name: "Notoriété marque AllMedical", net: "TikTok", budget: 600, spent: 540, roas: 2.8, ctr: "5.3%", status: "actif" },
  { name: "Lead magnet — Guide hygiène", net: "Meta", budget: 500, spent: 480, roas: 6.2, ctr: "4.1%", status: "rentable" },
];

const trend = [
  { d: "01", spent: 420, conv: 12 }, { d: "05", spent: 580, conv: 18 }, { d: "10", spent: 620, conv: 22 },
  { d: "15", spent: 740, conv: 28 }, { d: "20", spent: 810, conv: 31 }, { d: "25", spent: 920, conv: 38 },
  { d: "30", spent: 1050, conv: 45 },
];

const perfByNet = [
  { net: "Meta", value: 12400 },
  { net: "Google", value: 8200 },
  { net: "LinkedIn", value: 4800 },
  { net: "TikTok", value: 2600 },
];

const statusBadge: Record<string, string> = {
  rentable: "bg-success/10 text-success",
  actif: "bg-primary/10 text-primary",
  risque: "bg-destructive/10 text-destructive",
};

function TMPage() {
  return (
    <AppShell
      title="Agent Traffic Manager"
      description="Création et optimisation automatique de campagnes Meta, Google, LinkedIn, TikTok."
      actions={<Button className="bg-gradient-primary shadow-elegant"><Plus className="h-4 w-4 mr-1.5" />Nouvelle campagne IA</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        {[
          { l: "Dépenses du jour", v: "€ 1 248", d: "+12%", up: true },
          { l: "Dépenses du mois", v: "€ 28 040", d: "Budget 70%", up: true },
          { l: "ROAS moyen", v: "3.4×", d: "+0.4 vs M-1", up: true },
          { l: "Campagnes à risque", v: "2", d: "ROAS < 1.5", up: false },
        ].map((k) => (
          <Card key={k.l} className="p-5 shadow-card border-border/60">
            <div className="text-sm text-muted-foreground">{k.l}</div>
            <div className="mt-2 flex items-baseline gap-2">
              <div className="text-2xl font-bold">{k.v}</div>
              <div className={`text-xs flex items-center gap-0.5 ${k.up ? "text-success" : "text-destructive"}`}>
                {k.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{k.d}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3 mb-6">
        <Card className="p-5 shadow-card border-border/60 lg:col-span-2">
          <h3 className="font-semibold mb-4">Dépenses & conversions — 30 jours</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="d" fontSize={12} stroke="var(--color-muted-foreground)" />
              <YAxis fontSize={12} stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Line type="monotone" dataKey="spent" stroke="var(--color-primary)" strokeWidth={2} dot={false} name="€ dépensés" />
              <Line type="monotone" dataKey="conv" stroke="var(--color-turquoise)" strokeWidth={2} dot={false} name="Conversions" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-5 shadow-card border-border/60">
          <h3 className="font-semibold mb-4">Dépenses par réseau</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={perfByNet}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="net" fontSize={12} stroke="var(--color-muted-foreground)" />
              <YAxis fontSize={12} stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Bar dataKey="value" fill="var(--color-turquoise)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          <TabsTrigger value="optim">Optimisations IA</TabsTrigger>
          <TabsTrigger value="audiences">Audiences</TabsTrigger>
          <TabsTrigger value="creatives">Créatifs</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="mt-4">
          <Card className="shadow-card border-border/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="text-left p-3">Campagne</th>
                    <th className="text-left p-3">Réseau</th>
                    <th className="text-left p-3">Budget</th>
                    <th className="text-left p-3">Dépensé</th>
                    <th className="text-left p-3">ROAS</th>
                    <th className="text-left p-3">CTR</th>
                    <th className="text-left p-3">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c, i) => (
                    <tr key={i} className="border-t border-border/60 hover:bg-muted/30">
                      <td className="p-3 font-medium">{c.name}</td>
                      <td className="p-3"><Badge variant="outline">{c.net}</Badge></td>
                      <td className="p-3">€ {c.budget}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Progress value={(c.spent / c.budget) * 100} className="h-1.5 w-20" />
                          <span className="text-xs">€ {c.spent}</span>
                        </div>
                      </td>
                      <td className="p-3 font-semibold">{c.roas}×</td>
                      <td className="p-3">{c.ctr}</td>
                      <td className="p-3"><Badge className={`${statusBadge[c.status]} border-0`}>{c.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="optim" className="mt-4 space-y-3">
          {[
            { type: "augmenter", title: "Augmenter le budget de +20%", camp: "Lead magnet — Guide hygiène", reason: "ROAS 6.2× sur 7 jours, plafond budget atteint chaque jour.", icon: TrendingUp, tone: "bg-success/10 text-success" },
            { type: "arrêter", title: "Arrêter la campagne", camp: "Implants dentaires — Search", reason: "ROAS 0.9× depuis 14 jours, CPC en hausse de 38%.", icon: AlertTriangle, tone: "bg-destructive/10 text-destructive" },
            { type: "dupliquer", title: "Dupliquer en variante créa", camp: "Stérilisateurs Q4", reason: "Audience saturée, test d'un nouveau visuel recommandé.", icon: Sparkles, tone: "bg-turquoise/15 text-turquoise" },
            { type: "réduire", title: "Réduire CPM cible", camp: "Notoriété marque AllMedical", reason: "Portée correcte, mais coût mille trop élevé sur cible 45+.", icon: Euro, tone: "bg-warning/15 text-warning-foreground" },
          ].map((o, i) => (
            <Card key={i} className="p-5 shadow-card border-border/60 flex items-start gap-4">
              <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${o.tone}`}><o.icon className="h-5 w-5" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2"><h4 className="font-semibold">{o.title}</h4><Badge variant="outline" className="text-[10px]">{o.camp}</Badge></div>
                <p className="text-sm text-muted-foreground mt-1">{o.reason}</p>
              </div>
              <div className="flex gap-2 shrink-0"><Button size="sm" variant="outline">Ignorer</Button><Button size="sm" className="bg-gradient-primary">Appliquer</Button></div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="audiences" className="mt-4">
          <div className="grid gap-4 md:grid-cols-3">
            {["Dentistes France 30-55", "Cabinets dentaires Paris IDF", "Chirurgiens-dentistes nouvellement installés", "Décideurs achats CHU", "Étudiants en 6e année dentaire", "Retargeting visiteurs site"].map((a) => (
              <Card key={a} className="p-5 shadow-card border-border/60">
                <h4 className="font-semibold">{a}</h4>
                <div className="mt-3 text-xs text-muted-foreground">Taille estimée</div>
                <div className="text-xl font-bold">{Math.floor(Math.random() * 80 + 12)}k</div>
                <Button size="sm" variant="outline" className="mt-3 w-full">Modifier</Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="creatives" className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden shadow-card border-border/60">
                <div className="aspect-video bg-gradient-to-br from-primary/15 to-turquoise/15 grid place-items-center text-muted-foreground text-xs">Créatif {i + 1}</div>
                <div className="p-3"><div className="text-xs font-medium truncate">Visuel Meta — XR3</div><div className="text-[10px] text-muted-foreground">CTR 4.2%</div></div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
