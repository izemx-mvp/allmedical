import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { FileSearch, Upload, Calendar, AlertTriangle, CheckCircle2, Send, Sparkles, ArrowLeft, Calculator, MessageSquare, FileText, Loader2 } from "lucide-react";

export const Route = createFileRoute("/marches-publics")({
  head: () => ({ meta: [{ title: "Marchés Publics — AllMedical" }] }),
  component: AOPage,
});

type AO = {
  ref: string; title: string; client: string; deadline: string; budget: string; budgetNum: number;
  score: number; status: string; lots: { id: string; name: string; qty: number; unit: string; cost: number }[];
  documents: string[];
};

const aos: AO[] = [
  { ref: "CHU-CASA-2026-038", title: "Fourniture matériel dentaire CHU Ibn Rochd Casablanca", client: "CHU Ibn Rochd", deadline: "18 déc. 2026", budget: "4 200 000 MAD", budgetNum: 4200000, score: 92, status: "nouveau",
    lots: [
      { id: "L1", name: "Fauteuils dentaires Premium", qty: 12, unit: "u", cost: 145000 },
      { id: "L2", name: "Stérilisateurs classe B", qty: 8, unit: "u", cost: 48000 },
      { id: "L3", name: "Radio panoramique numérique", qty: 2, unit: "u", cost: 380000 },
      { id: "L4", name: "Compresseurs médicaux silencieux", qty: 6, unit: "u", cost: 32000 },
    ],
    documents: ["CCTP", "CCAP", "BPU", "DPGF", "Règlement de consultation"],
  },
  { ref: "CHU-RAB-2026-112", title: "Équipement bloc opératoire dentaire CHU Rabat", client: "CHU Avicenne Rabat", deadline: "22 déc. 2026", budget: "12 800 000 MAD", budgetNum: 12800000, score: 88, status: "analysé",
    lots: [
      { id: "L1", name: "Unit chirurgical complet", qty: 4, unit: "u", cost: 1800000 },
      { id: "L2", name: "Scialytique LED", qty: 4, unit: "u", cost: 220000 },
    ], documents: ["CCTP", "CCAP", "DPGF"] },
  { ref: "CHU-FES-2026-026", title: "Stérilisateurs et autoclaves CHU Hassan II Fès", client: "CHU Hassan II", deadline: "05 janv. 2027", budget: "2 400 000 MAD", budgetNum: 2400000, score: 76, status: "analysé", lots: [{ id: "L1", name: "Autoclave classe B 24L", qty: 20, unit: "u", cost: 95000 }], documents: ["CCTP", "BPU"] },
  { ref: "MAR-MAR-2026-091", title: "Hôpital Cheikh Khalifa Marrakech — Implants", client: "H. Cheikh Khalifa", deadline: "12 janv. 2027", budget: "3 800 000 MAD", budgetNum: 3800000, score: 71, status: "analysé", lots: [{ id: "L1", name: "Kits implantaires", qty: 500, unit: "kit", cost: 6500 }], documents: ["CCTP"] },
  { ref: "FAR-MIL-2026-022", title: "FAR — Maintenance équipements dentaires", client: "Forces Armées Royales", deadline: "20 janv. 2027", budget: "8 500 000 MAD", budgetNum: 8500000, score: 54, status: "à étudier", lots: [], documents: ["CCAP"] },
  { ref: "MIN-SAN-2026-007", title: "Ministère de la Santé — Mobiliers dentaires", client: "Min. Santé Maroc", deadline: "25 janv. 2027", budget: "950 000 MAD", budgetNum: 950000, score: 38, status: "rejeté", lots: [], documents: [] },
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
  return "text-muted-foreground";
}

function AOPage() {
  const [selected, setSelected] = useState<AO | null>(null);
  if (selected) return <AODetail ao={selected} onBack={() => setSelected(null)} />;

  return (
    <AppShell
      title="Agent Marchés Publics Dentaires"
      description="Détection, analyse, simulation chantier et chat conversationnel sur les appels d'offres au Maroc."
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

      <Card className="shadow-card border-border/60 overflow-hidden">
        <div className="p-4 border-b border-border/60 flex items-center justify-between">
          <h3 className="font-semibold">Appels d'offres détectés</h3>
          <span className="text-xs text-muted-foreground">Cliquez sur un AO pour ouvrir l'analyse complète</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left p-3">Référence</th>
                <th className="text-left p-3">Intitulé</th>
                <th className="text-left p-3">Client</th>
                <th className="text-left p-3">Échéance</th>
                <th className="text-left p-3">Budget</th>
                <th className="text-left p-3">Score</th>
                <th className="text-left p-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {aos.map((ao) => (
                <tr key={ao.ref} onClick={() => setSelected(ao)} className="border-t border-border/60 hover:bg-primary/5 cursor-pointer transition">
                  <td className="p-3 font-mono text-xs">{ao.ref}</td>
                  <td className="p-3 font-medium">{ao.title}</td>
                  <td className="p-3 text-muted-foreground">{ao.client}</td>
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
    </AppShell>
  );
}

function AODetail({ ao, onBack }: { ao: AO; onBack: () => void }) {
  const [margin, setMargin] = useState([22]);
  const [delay, setDelay] = useState([45]);
  const [transport, setTransport] = useState(2.5);
  const [installation, setInstallation] = useState(4);

  type Msg = { role: "user" | "ai"; text: string };
  const [messages, setMessages] = useState<Msg[]>([
    { role: "user", text: "Quels documents sont obligatoires pour ce marché ?" },
    { role: "ai", text: `Pour le marché **${ao.ref}** (${ao.client}), les documents obligatoires sont :\n\n1. **Déclaration sur l'honneur** (modèle DGM)\n2. **Attestations fiscales et CNSS** (-3 mois)\n3. **Certificat d'immatriculation au registre du commerce**\n4. **Mémoire technique** (max 30 pages)\n5. **Bordereau des prix unitaires** complété\n6. **Références équivalentes** sur les 3 dernières années\n7. **Certifications ISO 13485** et marquage CE des produits proposés\n8. **Caution provisoire** : 1.5% du montant estimé` },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const send = () => {
    if (!input.trim()) return;
    const q = input;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const reply = generateReply(q, ao);
      setMessages((m) => [...m, { role: "ai", text: reply }]);
      setThinking(false);
    }, 1200);
  };

  const totalLots = ao.lots.reduce((s, l) => s + l.qty * l.cost, 0);
  const transportCost = totalLots * (transport / 100);
  const installCost = totalLots * (installation / 100);
  const totalCost = totalLots + transportCost + installCost;
  const marginAmount = totalCost * (margin[0] / 100);
  const sellPrice = totalCost + marginAmount;
  const winProba = Math.max(15, Math.min(95, 100 - margin[0] * 1.8 + (ao.score - 70) * 0.6));

  return (
    <AppShell
      title={ao.title}
      description={`${ao.ref} · ${ao.client} · Échéance ${ao.deadline}`}
      actions={<Button variant="outline" onClick={onBack}><ArrowLeft className="h-4 w-4 mr-1.5" />Retour à la liste</Button>}
    >
      <div className="grid gap-4 lg:grid-cols-4 mb-6">
        <Card className="p-5 shadow-card border-border/60 lg:col-span-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge className={`${statusColor[ao.status]} border-0`}>{ao.status}</Badge>
              <h2 className="mt-2 text-xl font-bold">{ao.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{ao.client} · Budget estimé {ao.budget}</p>
            </div>
            <div className="text-center shrink-0">
              <div className={`text-4xl font-bold ${scoreColor(ao.score)}`}>{ao.score}<span className="text-lg text-muted-foreground">/100</span></div>
              <div className="text-xs text-muted-foreground uppercase">Pertinence IA</div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />Points forts</h4>
              <ul className="space-y-1.5 text-sm">
                <li>✔ Activité 100% cœur de métier AllMedical</li>
                <li>✔ Références CHU Mohammed VI 2024 compatibles</li>
                <li>✔ Marge nominale &gt; 25% atteignable</li>
                <li>✔ Marquage CE et ISO 13485 disponibles</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning-foreground" />Risques identifiés</h4>
              <ul className="space-y-1.5 text-sm">
                <li>⚠ Délais courts : 18 jours pour répondre</li>
                <li>⚠ Visite obligatoire — 1 seul créneau</li>
                <li>⚠ Pénalité 1/1000ᵉ par jour de retard</li>
                <li>⚠ Garantie 5 ans demandée</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-5 shadow-card border-border/60">
          <h4 className="text-sm font-semibold mb-3">Documents du DCE</h4>
          <ul className="space-y-2">
            {ao.documents.map((d) => (
              <li key={d} className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-primary" />{d}
              </li>
            ))}
          </ul>
          <Button size="sm" variant="outline" className="mt-4 w-full">Télécharger DCE</Button>
        </Card>
      </div>

      <Tabs defaultValue="analysis">
        <TabsList>
          <TabsTrigger value="analysis"><FileSearch className="h-3.5 w-3.5 mr-1.5" />Analyse IA</TabsTrigger>
          <TabsTrigger value="simulation"><Calculator className="h-3.5 w-3.5 mr-1.5" />Simulation chantier</TabsTrigger>
          <TabsTrigger value="chat"><MessageSquare className="h-3.5 w-3.5 mr-1.5" />Chat IA</TabsTrigger>
          <TabsTrigger value="deadlines"><Calendar className="h-3.5 w-3.5 mr-1.5" />Échéances</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="mt-4">
          <Card className="p-6 shadow-card border-border/60">
            <h3 className="font-semibold mb-4">Évaluation IA détaillée</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { l: "Complexité technique", v: 65 },
                { l: "Risque financier", v: 35 },
                { l: "Probabilité de gain", v: Math.round(winProba) },
              ].map((m) => (
                <div key={m.l}>
                  <div className="flex justify-between text-xs mb-1"><span>{m.l}</span><span className="font-semibold">{m.v}%</span></div>
                  <Progress value={m.v} className="h-2" />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Synthèse IA</h4>
              <p className="text-sm text-muted-foreground">
                L'analyse du DCE révèle un appel d'offres parfaitement aligné avec le cœur de métier AllMedical au Maroc. Le client {ao.client} privilégie historiquement les fournisseurs locaux avec service après-vente sous 48h. Recommandation : <span className="text-foreground font-medium">candidater avec une marge cible de 22%</span> et mettre en avant les références CHU Mohammed VI.
              </p>
            </div>

            <div className="mt-6 flex gap-2 flex-wrap">
              <Button variant="outline">Affecter un responsable</Button>
              <Button variant="outline">Marquer comme analysé</Button>
              <Button className="bg-gradient-primary"><Sparkles className="h-4 w-4 mr-1.5" />Générer pré-mémoire technique</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="simulation" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-6 shadow-card border-border/60 lg:col-span-2">
              <h3 className="font-semibold flex items-center gap-2"><Calculator className="h-4 w-4 text-primary" />Simulation chantier</h3>
              <p className="text-xs text-muted-foreground mb-5">Ajustez les paramètres pour estimer la rentabilité avant dépôt de l'offre.</p>

              <div className="overflow-x-auto rounded-lg border border-border/60">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
                    <tr><th className="p-2 text-left">Lot</th><th className="p-2 text-left">Désignation</th><th className="p-2 text-right">Qté</th><th className="p-2 text-right">Coût u. (MAD)</th><th className="p-2 text-right">Total (MAD)</th></tr>
                  </thead>
                  <tbody>
                    {ao.lots.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">Pas de décomposition disponible pour cet AO.</td></tr>}
                    {ao.lots.map((l) => (
                      <tr key={l.id} className="border-t border-border/60">
                        <td className="p-2 font-mono text-xs">{l.id}</td>
                        <td className="p-2">{l.name}</td>
                        <td className="p-2 text-right">{l.qty} {l.unit}</td>
                        <td className="p-2 text-right">{l.cost.toLocaleString("fr-MA")}</td>
                        <td className="p-2 text-right font-medium">{(l.qty * l.cost).toLocaleString("fr-MA")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <div className="flex justify-between text-sm mb-2"><Label>Marge cible</Label><span className="font-semibold">{margin[0]}%</span></div>
                  <Slider value={margin} onValueChange={setMargin} min={5} max={45} step={1} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2"><Label>Délai de livraison</Label><span className="font-semibold">{delay[0]} jours</span></div>
                  <Slider value={delay} onValueChange={setDelay} min={15} max={120} step={5} />
                </div>
                <div>
                  <Label className="text-sm">Transport & logistique (%)</Label>
                  <Input type="number" value={transport} step={0.5} onChange={(e) => setTransport(parseFloat(e.target.value) || 0)} className="mt-1.5" />
                </div>
                <div>
                  <Label className="text-sm">Installation & formation (%)</Label>
                  <Input type="number" value={installation} step={0.5} onChange={(e) => setInstallation(parseFloat(e.target.value) || 0)} className="mt-1.5" />
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-card border-border/60 bg-gradient-to-br from-primary/5 to-turquoise/5">
              <h4 className="text-sm font-semibold mb-4">Résultat de la simulation</h4>
              <div className="space-y-3 text-sm">
                <Row l="Coût matériel" v={`${totalLots.toLocaleString("fr-MA")} MAD`} />
                <Row l="Transport & logistique" v={`${Math.round(transportCost).toLocaleString("fr-MA")} MAD`} />
                <Row l="Installation & formation" v={`${Math.round(installCost).toLocaleString("fr-MA")} MAD`} />
                <div className="border-t border-border/60 pt-3" />
                <Row l="Coût de revient total" v={`${Math.round(totalCost).toLocaleString("fr-MA")} MAD`} bold />
                <Row l={`Marge (${margin[0]}%)`} v={`${Math.round(marginAmount).toLocaleString("fr-MA")} MAD`} tone="text-success" />
                <div className="border-t border-border/60 pt-3" />
                <Row l="Prix de vente proposé" v={`${Math.round(sellPrice).toLocaleString("fr-MA")} MAD`} bold big />
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1"><span>Probabilité de gain estimée</span><span className="font-semibold">{Math.round(winProba)}%</span></div>
                  <Progress value={winProba} className="h-2" />
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Budget AO : {ao.budget} · Écart : {Math.round(((sellPrice - ao.budgetNum) / ao.budgetNum) * 100)}%
                </div>
              </div>
              <Button className="mt-5 w-full bg-gradient-primary"><Sparkles className="h-4 w-4 mr-1.5" />Valider la simulation</Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="chat" className="mt-4">
          <Card className="shadow-card border-border/60 flex flex-col h-[600px]">
            <div className="p-4 border-b flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary"><FileSearch className="h-4 w-4 text-primary-foreground" /></div>
              <div><div className="font-semibold text-sm">Chat IA — {ao.ref}</div><div className="text-xs text-muted-foreground">142 pages indexées · {ao.documents.join(", ")}</div></div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{m.text}</div>
                </div>
              ))}
              {thinking && (
                <div className="flex justify-start"><div className="bg-muted rounded-2xl px-4 py-2.5 text-sm flex items-center gap-2"><Loader2 className="h-3 w-3 animate-spin" />L'agent analyse le DCE…</div></div>
              )}
            </div>
            <div className="p-4 border-t">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {["Résume le CCTP", "Lister les lots", "Dates importantes", "Quels sont les risques ?"].map((s) => (
                  <Badge key={s} variant="outline" className="cursor-pointer hover:bg-muted text-xs" onClick={() => setInput(s)}>{s}</Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input placeholder="Posez une question sur cet appel d'offres…" className="flex-1" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} />
                <Button className="bg-gradient-primary" onClick={send}><Send className="h-4 w-4" /></Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="deadlines" className="mt-4 space-y-3">
          {[
            { d: "09 déc. 2026", t: "Visite obligatoire des lieux" },
            { d: "12 déc. 2026", t: "Date limite questions techniques" },
            { d: "15 déc. 2026", t: "Validation mémoire technique en interne" },
            { d: "18 déc. 2026", t: "Dépôt de l'offre — 12h00" },
            { d: "08 janv. 2027", t: "Notification du résultat (estimée)" },
          ].map((e, i) => (
            <Card key={i} className="p-4 shadow-card border-border/60 flex items-center gap-4">
              <Calendar className="h-5 w-5 text-primary" />
              <div className="flex-1"><div className="font-medium">{e.t}</div><div className="text-xs text-muted-foreground">{ao.ref}</div></div>
              <Badge variant="outline">{e.d}</Badge>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function Row({ l, v, bold, big, tone }: { l: string; v: string; bold?: boolean; big?: boolean; tone?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{l}</span>
      <span className={`${bold ? "font-bold" : "font-medium"} ${big ? "text-xl" : ""} ${tone ?? ""}`}>{v}</span>
    </div>
  );
}

function generateReply(q: string, ao: AO): string {
  const lower = q.toLowerCase();
  if (lower.includes("lot")) return `Le marché **${ao.ref}** comporte ${ao.lots.length} lot(s) :\n\n${ao.lots.map((l) => `• **${l.id}** — ${l.name} (${l.qty} ${l.unit})`).join("\n")}`;
  if (lower.includes("date") || lower.includes("délai")) return `📅 Dates clés pour ${ao.ref} :\n\n• Visite obligatoire : 09 déc. 2026\n• Questions techniques jusqu'au : 12 déc. 2026\n• **Dépôt limite : ${ao.deadline} à 12h00**\n• Notification : début janvier 2027`;
  if (lower.includes("risque")) return `⚠ Risques principaux :\n\n• Délais serrés\n• Pénalités de retard 1/1000ᵉ par jour\n• Garantie 5 ans demandée\n• Visite obligatoire à un seul créneau\n\n✔ Atouts : références CHU Mohammed VI 2024, présence locale à ${ao.client.includes("Casa") ? "Casablanca" : "Rabat"}.`;
  if (lower.includes("résume") || lower.includes("cctp")) return `📄 Résumé du CCTP — ${ao.title} :\n\nLe client ${ao.client} souhaite ${ao.lots.length > 0 ? `acquérir ${ao.lots.map(l => `${l.qty} ${l.name.toLowerCase()}`).join(", ")}` : "renouveler son équipement dentaire"}. Le budget estimé est de ${ao.budget}. Marquage CE obligatoire, certification ISO 13485 exigée. Service après-vente sous 48h imposé.`;
  return `J'ai analysé votre question concernant **${ao.ref}**. D'après le DCE, ${ao.client} attend une réponse complète sous le délai imparti (${ao.deadline}). Voulez-vous que je détaille un point précis : lots, prix, références ou planning ?`;
}
