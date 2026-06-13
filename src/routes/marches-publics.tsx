import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { FileSearch, Upload, Calendar, AlertTriangle, CheckCircle2, Send, Sparkles } from "lucide-react";

export const Route = createFileRoute("/marches-publics")({
  head: () => ({ meta: [{ title: "Marchés Publics — AllMedical" }] }),
  component: AOPage,
});

const aos = [
  { ref: "CHU-LYON-2026-038", title: "Fourniture matériel dentaire CHU Lyon", deadline: "18 déc. 2026", budget: "€ 420 000", score: 92, status: "nouveau" },
  { ref: "AP-HP-2026-112", title: "Équipement bloc opératoire dentaire AP-HP", deadline: "22 déc. 2026", budget: "€ 1 280 000", score: 88, status: "analysé" },
  { ref: "CHU-NANTES-026", title: "Stérilisateurs et autoclaves CHU Nantes", deadline: "05 janv. 2027", budget: "€ 240 000", score: 76, status: "analysé" },
  { ref: "MAR-MAR-2026-091", title: "Hôpital Saint-Joseph Marseille — Implants", deadline: "12 janv. 2027", budget: "€ 380 000", score: 71, status: "analysé" },
  { ref: "MIN-DEF-2026-022", title: "Service de santé des armées — Maintenance", deadline: "20 janv. 2027", budget: "€ 850 000", score: 54, status: "à étudier" },
  { ref: "ARS-OCC-2026-007", title: "ARS Occitanie — Mobiliers dentaires", deadline: "25 janv. 2027", budget: "€ 95 000", score: 38, status: "rejeté" },
];

const messages = [
  { role: "user", text: "Quels documents sont obligatoires pour le marché CHU Lyon ?" },
  { role: "ai", text: "Pour le marché **CHU-LYON-2026-038**, les documents obligatoires sont :\n\n1. **DC1** — Lettre de candidature\n2. **DC2** — Déclaration du candidat\n3. **DUME** électronique\n4. **Attestations fiscales et sociales** (-6 mois)\n5. **Mémoire technique** (max 30 pages)\n6. **BPU** complété\n7. **Références équivalentes** (3 dernières années)\n8. **Certifications ISO 13485** et marquage CE des produits proposés" },
  { role: "user", text: "Quels sont les risques ?" },
  { role: "ai", text: "⚠ **Risques identifiés** :\n• Délai serré : 18 jours seulement\n• Visite obligatoire le 09/12 (1 seul créneau)\n• Pénalités de retard de livraison : 1/1000e par jour\n• Garantie demandée de 5 ans (au-delà du standard fournisseur)\n\n✔ **Atouts AllMedical** : nous avons déjà livré le CHU Saint-Étienne en 2024 sur un périmètre proche." },
];

const statusColor: Record<string, string> = {
  nouveau: "bg-turquoise/15 text-turquoise",
  analysé: "bg-primary/10 text-primary",
  "à étudier": "bg-warning/15 text-warning-foreground",
  rejeté: "bg-muted text-muted-foreground",
};

function scoreColor(s: number) {
  if (s >= 80) return "text-success";
  if (s >= 60) return "text-warning-foreground";
  if (s >= 40) return "text-warning-foreground";
  return "text-muted-foreground";
}

function AOPage() {
  return (
    <AppShell
      title="Agent Marchés Publics Dentaires"
      description="Détection, analyse et chat conversationnel sur les appels d'offres."
      actions={<Button className="bg-gradient-primary shadow-elegant"><Upload className="h-4 w-4 mr-1.5" />Importer un AO</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        {[
          { l: "AO suivis", v: 34 },
          { l: "Pertinents (≥ 75)", v: 8 },
          { l: "Échéances < 30j", v: 5 },
          { l: "Score moyen", v: "76/100" },
        ].map((k) => (
          <Card key={k.l} className="p-5 shadow-card border-border/60">
            <div className="text-sm text-muted-foreground">{k.l}</div>
            <div className="mt-2 text-2xl font-bold">{k.v}</div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Liste AO</TabsTrigger>
          <TabsTrigger value="analysis">Analyse détaillée</TabsTrigger>
          <TabsTrigger value="chat">Chat IA</TabsTrigger>
          <TabsTrigger value="deadlines">Échéances</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <Card className="shadow-card border-border/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="text-left p-3">Référence</th>
                    <th className="text-left p-3">Intitulé</th>
                    <th className="text-left p-3">Échéance</th>
                    <th className="text-left p-3">Budget</th>
                    <th className="text-left p-3">Score</th>
                    <th className="text-left p-3">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {aos.map((ao) => (
                    <tr key={ao.ref} className="border-t border-border/60 hover:bg-muted/30 cursor-pointer">
                      <td className="p-3 font-mono text-xs">{ao.ref}</td>
                      <td className="p-3 font-medium">{ao.title}</td>
                      <td className="p-3 text-muted-foreground">{ao.deadline}</td>
                      <td className="p-3">{ao.budget}</td>
                      <td className="p-3"><span className={`font-bold ${scoreColor(ao.score)}`}>{ao.score}</span><span className="text-xs text-muted-foreground">/100</span></td>
                      <td className="p-3"><Badge className={`${statusColor[ao.status]} border-0`}>{ao.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="mt-4">
          <Card className="p-6 shadow-card border-border/60">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge className="bg-turquoise/15 text-turquoise border-0">Nouveau · détecté il y a 28 min</Badge>
                <h3 className="mt-2 text-xl font-bold">Fourniture matériel dentaire CHU Lyon</h3>
                <p className="text-sm text-muted-foreground mt-1 font-mono">CHU-LYON-2026-038 · Échéance 18 décembre 2026</p>
              </div>
              <div className="text-center shrink-0">
                <div className="text-4xl font-bold text-success">92<span className="text-lg text-muted-foreground">/100</span></div>
                <div className="text-xs text-muted-foreground uppercase">Pertinence</div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />Points forts</h4>
                <ul className="space-y-1.5 text-sm">
                  <li>✔ Correspond aux activités AllMedical (matériel dentaire)</li>
                  <li>✔ Références CHU Saint-Étienne 2024 compatibles</li>
                  <li>✔ Budget € 420k — marge nominale &gt; 25%</li>
                  <li>✔ Marquage CE et ISO 13485 disponibles</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning-foreground" />Risques</h4>
                <ul className="space-y-1.5 text-sm">
                  <li>⚠ Délais courts : 18 jours pour répondre</li>
                  <li>⚠ Visite obligatoire 09/12 — 1 seul créneau</li>
                  <li>⚠ Pénalité 1/1000e par jour de retard</li>
                  <li>⚠ Garantie 5 ans demandée</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { l: "Complexité technique", v: 65 },
                { l: "Risque financier", v: 35 },
                { l: "Probabilité de gain", v: 78 },
              ].map((m) => (
                <div key={m.l}>
                  <div className="flex justify-between text-xs mb-1"><span>{m.l}</span><span className="font-semibold">{m.v}%</span></div>
                  <Progress value={m.v} className="h-2" />
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              <Button variant="outline">Télécharger DCE</Button>
              <Button variant="outline">Affecter un responsable</Button>
              <Button className="bg-gradient-primary"><Sparkles className="h-4 w-4 mr-1.5" />Générer pré-mémoire</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="mt-4">
          <Card className="shadow-card border-border/60 flex flex-col h-[600px]">
            <div className="p-4 border-b flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary"><FileSearch className="h-4 w-4 text-primary-foreground" /></div>
              <div><div className="font-semibold text-sm">Chat IA — CHU Lyon 2026-038</div><div className="text-xs text-muted-foreground">142 pages indexées · CCTP, CCAP, BPU, DPGF</div></div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}>{m.text}</div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {["Résume le CCTP", "Lister les lots", "Dates importantes", "Références à mettre en avant"].map((s) => (
                  <Badge key={s} variant="outline" className="cursor-pointer hover:bg-muted text-xs">{s}</Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input placeholder="Posez une question sur cet appel d'offres…" className="flex-1" />
                <Button className="bg-gradient-primary"><Send className="h-4 w-4" /></Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="deadlines" className="mt-4 space-y-3">
          {aos.slice(0, 5).map((ao) => (
            <Card key={ao.ref} className="p-4 shadow-card border-border/60 flex items-center gap-4">
              <Calendar className="h-5 w-5 text-primary" />
              <div className="flex-1"><div className="font-medium">{ao.title}</div><div className="text-xs text-muted-foreground">{ao.ref}</div></div>
              <Badge variant="outline">{ao.deadline}</Badge>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
