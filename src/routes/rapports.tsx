import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileBarChart } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export const Route = createFileRoute("/rapports")({
  head: () => ({ meta: [{ title: "Rapports — AllMedical" }] }),
  component: ReportsPage,
});

const monthly = [
  { m: "Juil", CM: 78, TM: 42, AO: 14 }, { m: "Août", CM: 92, TM: 51, AO: 18 },
  { m: "Sept", CM: 110, TM: 64, AO: 22 }, { m: "Oct", CM: 124, TM: 71, AO: 28 },
  { m: "Nov", CM: 138, TM: 82, AO: 31 }, { m: "Déc", CM: 142, TM: 89, AO: 34 },
];

const roi = [
  { m: "Juil", v: 1.8 }, { m: "Août", v: 2.1 }, { m: "Sept", v: 2.6 },
  { m: "Oct", v: 2.9 }, { m: "Nov", v: 3.2 }, { m: "Déc", v: 3.4 },
];

const pieData = [
  { name: "Community Mgr", value: 45 },
  { name: "Traffic Mgr", value: 30 },
  { name: "Marchés Publics", value: 25 },
];

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-4)"];

function ReportsPage() {
  return (
    <AppShell
      title="Rapports"
      description="Indicateurs consolidés des agents IA AllMedical."
      actions={<Button variant="outline"><Download className="h-4 w-4 mr-1.5" />Exporter PDF</Button>}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5 shadow-card border-border/60">
          <h3 className="font-semibold mb-1 flex items-center gap-2"><FileBarChart className="h-4 w-4 text-primary" />Tâches par agent — 6 mois</h3>
          <p className="text-xs text-muted-foreground mb-4">Volume cumulé d'exécutions</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="m" fontSize={12} stroke="var(--color-muted-foreground)" />
              <YAxis fontSize={12} stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="CM" name="Community Mgr" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="TM" name="Traffic Mgr" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="AO" name="Marchés Publics" fill="var(--color-chart-4)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 shadow-card border-border/60">
          <h3 className="font-semibold mb-1">Évolution du ROAS publicitaire</h3>
          <p className="text-xs text-muted-foreground mb-4">Retour sur investissement publicitaire moyen</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={roi}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="m" fontSize={12} stroke="var(--color-muted-foreground)" />
              <YAxis fontSize={12} stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Line type="monotone" dataKey="v" stroke="var(--color-turquoise)" strokeWidth={3} dot={{ r: 5 }} name="ROAS" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 shadow-card border-border/60">
          <h3 className="font-semibold mb-4">Répartition d'activité IA</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 shadow-card border-border/60">
          <h3 className="font-semibold mb-4">Synthèse exécutive</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Temps gagné estimé (mois)</span><span className="font-bold">184 h</span></li>
            <li className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Coût IA total</span><span className="font-bold">€ 412</span></li>
            <li className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Coût publicitaire (Meta+Google)</span><span className="font-bold">€ 28 040</span></li>
            <li className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Leads générés</span><span className="font-bold">412</span></li>
            <li className="flex justify-between border-b pb-2"><span className="text-muted-foreground">AO remportés (estimation)</span><span className="font-bold text-success">3 / 8</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">CA potentiel remporté</span><span className="font-bold text-success">€ 1.2 M</span></li>
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
