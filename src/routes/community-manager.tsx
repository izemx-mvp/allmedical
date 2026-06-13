import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Calendar, Image as ImageIcon, CheckCircle2, Clock, ThumbsUp, Send, Hash, Loader2, Facebook, Instagram } from "lucide-react";

export const Route = createFileRoute("/community-manager")({
  head: () => ({ meta: [{ title: "Community Manager — AllMedical" }] }),
  component: CMPage,
});

type Idea = { title: string; net: "Facebook" | "Instagram"; hashtags: string[]; cta: string; body: string };

const seedIdeas: Idea[] = [
  { title: "5 critères pour choisir un fauteuil dentaire en 2026", net: "Facebook", hashtags: ["#dentaire", "#équipement", "#cabinetdentaire"], cta: "Télécharger le guide", body: "Le choix d'un fauteuil dentaire impacte directement votre productivité et le confort patient. Voici les 5 critères à étudier avant tout achat au Maroc 👇" },
  { title: "Stérilisateur Premium XR3 — 18 min de cycle", net: "Instagram", hashtags: ["#stérilisation", "#hygiène"], cta: "Demander un devis", body: "Gagnez 40% de temps sur vos cycles de stérilisation grâce au XR3. Disponible dès maintenant chez AllMedical Maroc." },
  { title: "Témoignage Dr. Lemoine — cabinet équipé en 3 jours", net: "Instagram", hashtags: ["#témoignage", "#dentiste"], cta: "Voir la vidéo", body: "« En 3 jours, mon cabinet à Casablanca était totalement équipé. Service au top ! » — Dr. Lemoine." },
  { title: "Webinar : ergonomie au cabinet", net: "Facebook", hashtags: ["#ergonomie", "#santé"], cta: "S'inscrire", body: "Mal de dos chronique ? Notre webinar du 18 décembre vous montre comment ajuster votre poste pour économiser votre dos." },
  { title: "Nouvelle gamme implants : 5 références phares", net: "Facebook", hashtags: ["#implants", "#chirurgie"], cta: "Découvrir", body: "5 nouvelles références d'implants à découvrir cette semaine — qualité européenne, prix Maroc." },
  { title: "Promo Black Friday — radios panoramiques -20%", net: "Instagram", hashtags: ["#promo", "#radiologie"], cta: "Profiter", body: "-20% sur toute la gamme radio panoramique jusqu'au 30 novembre. Stock limité ⚡" },
];

const calendar = [
  { d: 4, items: [{ t: "Post Facebook — Implants", s: "publié" }] },
  { d: 5, items: [{ t: "Story Insta — Coulisses", s: "publié" }] },
  { d: 6, items: [] },
  { d: 7, items: [{ t: "Carrousel Facebook", s: "validation" }, { t: "Post Insta promo", s: "prévu" }] },
  { d: 8, items: [{ t: "Webinar reminder FB", s: "prévu" }] },
  { d: 9, items: [{ t: "Reels Instagram", s: "validation" }] },
  { d: 10, items: [] },
];

const statusColor: Record<string, string> = {
  publié: "bg-success/10 text-success",
  validation: "bg-warning/15 text-warning-foreground",
  prévu: "bg-primary/10 text-primary",
};

const netIcon = { Facebook, Instagram } as const;

function CMPage() {
  const [ideas, setIdeas] = useState<Idea[]>(seedIdeas);
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState("Donne-moi 6 idées de contenus pour vendre du matériel dentaire aux cabinets marocains.");
  const [network, setNetwork] = useState<"Facebook" | "Instagram">("Instagram");
  const [tone, setTone] = useState("Expert");

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      const pool: Idea[] = [
        { title: "Astuce pro : nettoyer une turbine en 3 étapes", net: network, hashtags: ["#astuce", "#dentaire", "#maroc"], cta: "Lire l'article", body: "Une turbine bien entretenue dure 2× plus longtemps. Voici la routine recommandée par nos techniciens 👇" },
        { title: "Cas client : Cabinet Sourire de Rabat", net: network, hashtags: ["#témoignage", "#rabat"], cta: "Voir le cas", body: "Comment le Dr. El Amrani a équipé son cabinet en moins d'une semaine avec AllMedical." },
        { title: "Comparatif : 3 autoclaves classe B à moins de 35 000 MAD", net: network, hashtags: ["#autoclave", "#comparatif"], cta: "Voir le comparatif", body: "On a testé pour vous les 3 autoclaves les plus demandés au Maroc cette année." },
        { title: "Nouveauté : compresseur silencieux 56 dB", net: network, hashtags: ["#compresseur", "#silence"], cta: "Découvrir", body: "Fini les nuisances sonores au cabinet — le nouveau compresseur médical 56 dB est arrivé." },
        { title: "Checklist : ouvrir son cabinet dentaire au Maroc", net: network, hashtags: ["#installation", "#cabinet"], cta: "Télécharger la checklist", body: "20 points essentiels à vérifier avant l'ouverture de votre cabinet — version 2026." },
        { title: "Tendance : la dentisterie numérique en 2027", net: network, hashtags: ["#cfao", "#scanner"], cta: "Lire l'étude", body: "Scanner intra-oral, CFAO, impression 3D — voici ce qui change au cabinet en 2027." },
      ];
      setIdeas([...pool, ...ideas]);
      setGenerating(false);
    }, 1500);
  };

  return (
    <AppShell
      title="Agent Community Manager"
      description="Calendrier éditorial, idées de contenu et validation humaine — Facebook & Instagram."
      actions={<Button className="bg-gradient-primary shadow-elegant" onClick={generate} disabled={generating}>{generating ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <Sparkles className="h-4 w-4 mr-1.5" />}Générer du contenu</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        {[
          { l: "Idées en attente", v: ideas.length, i: Sparkles },
          { l: "Publications planifiées", v: 18, i: Calendar },
          { l: "En validation", v: 9, i: Clock },
          { l: "Engagement moyen", v: "4.8%", i: ThumbsUp },
        ].map((k) => (
          <Card key={k.l} className="p-4 shadow-card border-border/60">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{k.l}</span>
              <k.i className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 text-2xl font-bold">{k.v}</div>
          </Card>
        ))}
      </div>

      {/* Calendrier + Idées côte à côte */}
      <div className="grid gap-4 xl:grid-cols-5 mb-6">
        <Card className="p-5 shadow-card border-border/60 xl:col-span-3">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h3 className="font-semibold flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" />Calendrier éditorial</h3>
              <p className="text-xs text-muted-foreground">Semaine du 4 au 10 décembre 2026</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">1 sem.</Button>
              <Button size="sm" variant="outline">1 mois</Button>
              <Button size="sm" className="bg-gradient-primary">3 mois</Button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {calendar.map((day) => (
              <div key={day.d} className="rounded-lg border border-border/60 p-2 min-h-[180px] bg-muted/20">
                <div className="text-xs font-semibold text-muted-foreground mb-2">{day.d} déc.</div>
                <div className="space-y-1.5">
                  {day.items.map((it, i) => (
                    <div key={i} className={`text-[11px] px-2 py-1.5 rounded ${statusColor[it.s]}`}>{it.t}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 shadow-card border-border/60 xl:col-span-2 bg-gradient-to-br from-primary/5 to-turquoise/5">
          <label className="text-sm font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-turquoise" />Générer du contenu</label>
          <Textarea className="mt-2 bg-background" rows={3} value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Select value={network} onValueChange={(v) => setNetwork(v as "Facebook" | "Instagram")}>
              <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Expert">Ton : Expert</SelectItem>
                <SelectItem value="Conversationnel">Ton : Conversationnel</SelectItem>
                <SelectItem value="Promotionnel">Ton : Promotionnel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input className="mt-2 bg-background" placeholder="Cible (ex : dentistes Casablanca)" defaultValue="Dentistes Maroc" />
          <Button onClick={generate} disabled={generating} className="mt-3 w-full bg-gradient-primary">
            {generating ? <><Loader2 className="h-4 w-4 mr-1.5 animate-spin" />Génération…</> : <><Send className="h-3.5 w-3.5 mr-1.5" />Générer 6 idées</>}
          </Button>
          {generating && (
            <div className="mt-3 text-xs text-muted-foreground flex items-center gap-2">
              <Loader2 className="h-3 w-3 animate-spin" /> Analyse de la base de connaissances · génération en cours…
            </div>
          )}
        </Card>
      </div>

      <Tabs defaultValue="ideas">
        <TabsList>
          <TabsTrigger value="ideas">Idées de contenu ({ideas.length})</TabsTrigger>
          <TabsTrigger value="validation">Validation humaine</TabsTrigger>
          <TabsTrigger value="library">Bibliothèque médias</TabsTrigger>
        </TabsList>

        <TabsContent value="ideas" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ideas.map((idea, i) => {
              const Icon = netIcon[idea.net];
              return (
                <Card key={i} className="p-5 shadow-card border-border/60 hover:shadow-elegant transition">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] gap-1"><Icon className="h-3 w-3" />{idea.net}</Badge>
                    {i < 6 && generating === false && ideas.length > seedIdeas.length && i < ideas.length - seedIdeas.length && (
                      <Badge className="text-[10px] bg-turquoise/15 text-turquoise border-0">Nouveau</Badge>
                    )}
                  </div>
                  <h4 className="mt-3 font-semibold leading-snug">{idea.title}</h4>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-3">{idea.body}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {idea.hashtags.map((h) => <span key={h} className="text-xs text-primary"><Hash className="h-3 w-3 inline" />{h.slice(1)}</span>)}
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">CTA: <span className="text-foreground font-medium">{idea.cta}</span></div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">Éditer</Button>
                    <Button size="sm" className="flex-1 bg-primary">Valider</Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="validation" className="mt-4 space-y-3">
          {ideas.slice(0, 4).map((idea, i) => (
            <Card key={i} className="p-4 shadow-card border-border/60 flex items-start gap-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-muted">
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px]">{idea.net}</Badge>
                  <Badge className="bg-warning/15 text-warning-foreground border-0 text-[10px]">En attente marketing</Badge>
                </div>
                <h4 className="font-semibold truncate">{idea.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{idea.body}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm" variant="outline">Modifier</Button>
                <Button size="sm" className="bg-success text-success-foreground"><CheckCircle2 className="h-3.5 w-3.5 mr-1" />Valider</Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="library" className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <Card key={i} className="aspect-square shadow-card border-border/60 bg-gradient-to-br from-primary/10 to-turquoise/10 grid place-items-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
