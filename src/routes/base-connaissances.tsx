import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Megaphone, Target, FileSearch, Package, Briefcase, Globe, FileText, Plus } from "lucide-react";

export const Route = createFileRoute("/base-connaissances")({
  head: () => ({ meta: [{ title: "Base de connaissances — AllMedical" }] }),
  component: KBPage,
});

const categories = [
  { name: "Marketing", icon: Megaphone, count: 42, color: "bg-primary/10 text-primary" },
  { name: "Publicité", icon: Target, count: 28, color: "bg-turquoise/15 text-turquoise" },
  { name: "Marchés Publics", icon: FileSearch, count: 67, color: "bg-warning/15 text-warning-foreground" },
  { name: "Produits", icon: Package, count: 134, color: "bg-chart-5/15 text-chart-5" },
  { name: "Procédures internes", icon: Briefcase, count: 23, color: "bg-success/10 text-success" },
];

const sources = [
  { type: "PDF", name: "Catalogue produits 2027.pdf", icon: FileText, cat: "Produits" },
  { type: "Web", name: "https://allmedical.fr/blog/dentaire", icon: Globe, cat: "Marketing" },
  { type: "DOCX", name: "Guide réponse AO — v3.docx", icon: FileText, cat: "Marchés Publics" },
  { type: "XLSX", name: "Grille tarifaire 2027.xlsx", icon: FileText, cat: "Produits" },
  { type: "PPTX", name: "Argumentaire commercial.pptx", icon: FileText, cat: "Marketing" },
  { type: "Web", name: "https://boamp.fr (flux auto)", icon: Globe, cat: "Marchés Publics" },
];

function KBPage() {
  return (
    <AppShell
      title="Base de connaissances"
      description="Source de vérité utilisée par tous vos agents IA."
      actions={<Button className="bg-gradient-primary"><Plus className="h-4 w-4 mr-1.5" />Ajouter une source</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-6">
        {categories.map((c) => (
          <Card key={c.name} className="p-5 shadow-card border-border/60 hover:shadow-elegant transition cursor-pointer">
            <div className={`grid h-10 w-10 place-items-center rounded-lg ${c.color}`}><c.icon className="h-5 w-5" /></div>
            <div className="mt-3 font-semibold">{c.name}</div>
            <div className="text-xs text-muted-foreground">{c.count} documents</div>
          </Card>
        ))}
      </div>

      <Card className="shadow-card border-border/60">
        <div className="p-4 border-b"><h3 className="font-semibold flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" />Sources indexées</h3></div>
        <table className="w-full text-sm">
          <tbody>
            {sources.map((s) => (
              <tr key={s.name} className="border-t border-border/60 hover:bg-muted/30">
                <td className="p-3 w-12"><s.icon className="h-4 w-4 text-muted-foreground" /></td>
                <td className="p-3 font-medium">{s.name}</td>
                <td className="p-3"><Badge variant="outline" className="text-[10px]">{s.type}</Badge></td>
                <td className="p-3"><Badge variant="secondary" className="text-[10px]">{s.cat}</Badge></td>
                <td className="p-3 text-right text-xs text-muted-foreground">indexé</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppShell>
  );
}
