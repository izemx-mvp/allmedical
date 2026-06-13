import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, FileSpreadsheet, Presentation, File, Upload, Search, Filter } from "lucide-react";

export const Route = createFileRoute("/documents")({
  head: () => ({ meta: [{ title: "Documents — AllMedical" }] }),
  component: DocsPage,
});

const docs = [
  { name: "CCTP_CHU_Lyon_2026-038.pdf", type: "PDF", icon: FileText, size: "8.4 MB", author: "Import auto", tag: "Marchés Publics", date: "13 déc. 2026" },
  { name: "Plaquette_Premium_XR3_v4.pdf", type: "PDF", icon: FileText, size: "12.1 MB", author: "Marie D.", tag: "Produits", date: "10 déc. 2026" },
  { name: "Brief_creas_Meta_Q1.docx", type: "DOCX", icon: FileText, size: "320 KB", author: "Community Mgr", tag: "Marketing", date: "09 déc. 2026" },
  { name: "Budget_publicite_2026.xlsx", type: "XLSX", icon: FileSpreadsheet, size: "780 KB", author: "Sophie M.", tag: "Publicité", date: "08 déc. 2026" },
  { name: "Presentation_Salon_ADF.pptx", type: "PPTX", icon: Presentation, size: "24 MB", author: "Direction", tag: "Marketing", date: "07 déc. 2026" },
  { name: "Procedure_interne_AO.pdf", type: "PDF", icon: FileText, size: "1.2 MB", author: "Juridique", tag: "Procédures", date: "05 déc. 2026" },
  { name: "Catalogue_steriliseurs_2027.pdf", type: "PDF", icon: FileText, size: "18 MB", author: "Produits", tag: "Produits", date: "03 déc. 2026" },
  { name: "Reglement_consultation_APHP.pdf", type: "PDF", icon: FileText, size: "2.8 MB", author: "Import auto", tag: "Marchés Publics", date: "01 déc. 2026" },
];

function DocsPage() {
  return (
    <AppShell
      title="Documents"
      description="Bibliothèque documentaire avec recherche intelligente."
      actions={<Button className="bg-gradient-primary"><Upload className="h-4 w-4 mr-1.5" />Importer</Button>}
    >
      <Card className="p-4 shadow-card border-border/60 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher dans 487 documents — IA sémantique…" className="pl-9" />
          </div>
          <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-1.5" />Type</Button>
          <Button variant="outline" size="sm">Auteur</Button>
          <Button variant="outline" size="sm">Agent</Button>
          <Button variant="outline" size="sm">Tag</Button>
          <Button variant="outline" size="sm">Date</Button>
        </div>
      </Card>

      <Card className="shadow-card border-border/60 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="text-left p-3">Nom</th><th className="text-left p-3">Type</th><th className="text-left p-3">Tag</th><th className="text-left p-3">Auteur</th><th className="text-left p-3">Date</th><th className="text-left p-3">Taille</th></tr>
          </thead>
          <tbody>
            {docs.map((d) => (
              <tr key={d.name} className="border-t border-border/60 hover:bg-muted/30">
                <td className="p-3 flex items-center gap-2"><d.icon className="h-4 w-4 text-primary shrink-0" /><span className="font-medium">{d.name}</span></td>
                <td className="p-3"><Badge variant="outline" className="text-[10px]">{d.type}</Badge></td>
                <td className="p-3"><Badge variant="secondary" className="text-[10px]">{d.tag}</Badge></td>
                <td className="p-3 text-muted-foreground">{d.author}</td>
                <td className="p-3 text-muted-foreground">{d.date}</td>
                <td className="p-3 text-muted-foreground">{d.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppShell>
  );
}
