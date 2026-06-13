import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Plus, Sparkles, AlertTriangle, Settings2, Save } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";

export const Route = createFileRoute("/traffic-manager")({
  head: () => ({ meta: [{ title: "Traffic Manager — AllMedical" }] }),
  component: TMPage,
});

const campaigns = [
  { name: "Promo Fauteuils Premium XR3", net: "Meta", budget: 12000, spent: 9400, roas: 4.2, ctr: "3.8%", status: "rentable" },
  { name: "Stérilisateurs Q4 — Retargeting", net: "Meta", budget: 8000, spent: 6120, roas: 5.1, ctr: "4.6%", status: "rentable" },
  { name: "Implants dentaires — Search", net: "Google", budget: 24000, spent: 21000, roas: 0.9, ctr: "1.2%", status: "risque" },
  { name: "Radiologie panoramique B2B", net: "Google", budget: 15000, spent: 7200, roas: 3.4, ctr: "2.1%", status: "actif" },
  { name: "Notoriété marque AllMedical", net: "TikTok", budget: 6000, spent: 5400, roas: 2.8, ctr: "5.3%", status: "actif" },
  { name: "Lead magnet — Guide hygiène", net: "Meta", budget: 5000, spent: 4800, roas: 6.2, ctr: "4.1%", status: "rentable" },
];

const trend = [
  { d: "01", spent: 4200, conv: 12 }, { d: "05", spent: 5800, conv: 18 }, { d: "10", spent: 6200, conv: 22 },
  { d: "15", spent: 7400, conv: 28 }, { d: "20", spent: 8100, conv: 31 }, { d: "25", spent: 9200, conv: 38 },
  { d: "30", spent: 10500, conv: 45 },
];

const perfByNet = [
  { net: "Meta", value: 124000 },
  { net: "Google", value: 82000 },
  { net: "TikTok", value: 26000 },
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
      description="Création et optimisation automatique des campagnes Meta, Google & TikTok au Maroc."
      actions={<Button className="bg-gradient-primary shadow-elegant"><Plus className="h-4 w-4 mr-1.5" />Nouvelle campagne IA</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        {[
          { l: "Dépenses du jour", v: "12 480 MAD", d: "+12%", up: true },
          { l: "Dépenses du mois", v: "280 400 MAD", d: "Budget 70%", up: true },
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
          <h3 className="font-semibold mb-4">Dépenses & conversions — 30 jours (MAD)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="d" fontSize={12} stroke="var(--color-muted-foreground)" />
              <YAxis fontSize={12} stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Line type="monotone" dataKey="spent" stroke="var(--color-primary)" strokeWidth={2} dot={false} name="MAD dépensés" />
              <Line type="monotone" dataKey="conv" stroke="var(--color-turquoise)" strokeWidth={2} dot={false} name="Conversions" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-5 shadow-card border-border/60">
          <h3 className="font-semibold mb-4">Dépenses par réseau (MAD)</h3>
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

      <Tabs defaultValue="settings">
        <TabsList>
          <TabsTrigger value="settings"><Settings2 className="h-3.5 w-3.5 mr-1.5" />Paramétrage IA</TabsTrigger>
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          <TabsTrigger value="optim">Optimisations IA</TabsTrigger>
          <TabsTrigger value="audiences">Audiences</TabsTrigger>
          <TabsTrigger value="creatives">Créatifs</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-6 shadow-card border-border/60">
              <h3 className="font-semibold flex items-center gap-2"><Settings2 className="h-4 w-4 text-primary" />Règles budgétaires</h3>
              <p className="text-xs text-muted-foreground mb-5">L'IA respectera strictement ces limites pour chaque campagne.</p>

              <div className="space-y-5">
                <div>
                  <Label className="text-sm">Budget mensuel total max</Label>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Input type="number" defaultValue={350000} className="w-40" />
                    <span className="text-sm text-muted-foreground">MAD</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <Label>Budget quotidien par campagne</Label>
                    <span className="text-muted-foreground">200 – 2 500 MAD</span>
                  </div>
                  <Slider defaultValue={[200, 2500]} min={50} max={5000} step={50} />
                </div>

                <div>
                  <Label className="text-sm">Enchère max (CPC)</Label>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Input type="number" defaultValue={18} className="w-32" />
                    <span className="text-sm text-muted-foreground">MAD / clic</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm">ROAS minimum cible</Label>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Input type="number" defaultValue={2.5} step={0.1} className="w-32" />
                    <span className="text-sm text-muted-foreground">× (sinon alerte)</span>
                  </div>
                </div>
              </div>

              <Button className="mt-6 bg-gradient-primary"><Save className="h-4 w-4 mr-1.5" />Enregistrer les règles</Button>
            </Card>

            <Card className="p-6 shadow-card border-border/60">
              <h3 className="font-semibold">Réseaux & actions autorisées</h3>
              <p className="text-xs text-muted-foreground mb-5">Activez les leviers que l'agent peut piloter sans validation humaine.</p>

              <div className="space-y-3">
                {[
                  { l: "Meta Ads (Facebook + Instagram)", on: true },
                  { l: "Google Ads (Search + Display)", on: true },
                  { l: "TikTok Ads", on: true },
                  { l: "Snapchat Ads", on: false },
                ].map((r) => (
                  <div key={r.l} className="flex items-center justify-between rounded-lg border border-border/60 p-3">
                    <span className="text-sm font-medium">{r.l}</span>
                    <Switch defaultChecked={r.on} />
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-3">
                <h4 className="text-sm font-semibold">Actions automatiques IA</h4>
                {[
                  { l: "Augmenter budget si ROAS > 4×", on: true },
                  { l: "Mettre en pause si ROAS < 1× sur 7 jours", on: true },
                  { l: "Dupliquer créatifs gagnants", on: true },
                  { l: "Lancer une nouvelle campagne sans validation", on: false },
                  { l: "Modifier le ciblage géographique", on: false },
                ].map((a) => (
                  <div key={a.l} className="flex items-center justify-between rounded-lg border border-border/60 p-3">
                    <span className="text-sm">{a.l}</span>
                    <Switch defaultChecked={a.on} />
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <Label className="text-sm">Marché cible principal</Label>
                <Select defaultValue="maroc">
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maroc">Maroc (toutes régions)</SelectItem>
                    <SelectItem value="casa">Casablanca & Rabat</SelectItem>
                    <SelectItem value="nord">Nord Maroc (Tanger, Tétouan)</SelectItem>
                    <SelectItem value="sud">Sud Maroc (Marrakech, Agadir)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-4">
          <Card className="shadow-card border-border/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="text-left p-3">Campagne</th>
                    <th className="text-left p-3">Réseau</th>
                    <th className="text-left p-3">Budget (MAD)</th>
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
                      <td className="p-3">{c.budget.toLocaleString("fr-MA")}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Progress value={(c.spent / c.budget) * 100} className="h-1.5 w-20" />
                          <span className="text-xs">{c.spent.toLocaleString("fr-MA")}</span>
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
            { title: "Augmenter le budget de +20%", camp: "Lead magnet — Guide hygiène", reason: "ROAS 6.2× sur 7 jours, plafond budget atteint chaque jour.", icon: TrendingUp, tone: "bg-success/10 text-success" },
            { title: "Arrêter la campagne", camp: "Implants dentaires — Search", reason: "ROAS 0.9× depuis 14 jours, CPC en hausse de 38%.", icon: AlertTriangle, tone: "bg-destructive/10 text-destructive" },
            { title: "Dupliquer en variante créa", camp: "Stérilisateurs Q4", reason: "Audience saturée, test d'un nouveau visuel recommandé.", icon: Sparkles, tone: "bg-turquoise/15 text-turquoise" },
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
            {["Dentistes Maroc 30-55", "Cabinets dentaires Casablanca", "Nouveaux dentistes installés (Rabat)", "Décideurs achats CHU Maroc", "Étudiants 6e année dentaire", "Retargeting visiteurs site"].map((a) => (
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
