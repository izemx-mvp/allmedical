import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Calendar, Image as ImageIcon, CheckCircle2, Clock, ThumbsUp, MessageSquare, Send, Hash } from "lucide-react";

export const Route = createFileRoute("/community-manager")({
  head: () => ({ meta: [{ title: "Community Manager — AllMedical" }] }),
  component: CMPage,
});

const ideas = [
  { title: "5 critères pour choisir un fauteuil dentaire en 2026", net: "LinkedIn", hashtags: ["#dentaire", "#équipement", "#cabinetdentaire"], cta: "Télécharger le guide" },
  { title: "Découvrez le stérilisateur Premium XR3 : 18 min de cycle", net: "Facebook", hashtags: ["#stérilisation", "#hygiène"], cta: "Demander un devis" },
  { title: "Témoignage Dr. Lemoine — son cabinet équipé en 3 jours", net: "Instagram", hashtags: ["#témoignage", "#dentiste"], cta: "Voir la vidéo" },
  { title: "Webinar : ergonomie au cabinet — économisez votre dos", net: "LinkedIn", hashtags: ["#ergonomie", "#santé"], cta: "S'inscrire" },
  { title: "Nouvelle gamme implants : 5 références phares", net: "LinkedIn", hashtags: ["#implants", "#chirurgie"], cta: "Découvrir" },
  { title: "Promo Black Friday — radios panoramiques -20%", net: "Facebook", hashtags: ["#promo", "#radiologie"], cta: "Profiter" },
];

const calendar = [
  { d: 4, items: [{ t: "Post LinkedIn — Implants", s: "publié" }] },
  { d: 5, items: [{ t: "Story Insta — Coulisses", s: "publié" }] },
  { d: 6, items: [] },
  { d: 7, items: [{ t: "Carrousel LinkedIn", s: "validation" }, { t: "Post Facebook promo", s: "prévu" }] },
  { d: 8, items: [{ t: "Webinar reminder", s: "prévu" }] },
  { d: 9, items: [{ t: "Reels Instagram", s: "validation" }] },
  { d: 10, items: [] },
];

const statusColor: Record<string, string> = {
  publié: "bg-success/10 text-success",
  validation: "bg-warning/15 text-warning-foreground",
  prévu: "bg-primary/10 text-primary",
};

function CMPage() {
  return (
    <AppShell
      title="Agent Community Manager"
      description="Idées de contenu, calendrier éditorial et validation humaine."
      actions={<Button className="bg-gradient-primary shadow-elegant"><Sparkles className="h-4 w-4 mr-1.5" />Générer du contenu</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        {[
          { l: "Idées en attente", v: 24, i: Sparkles },
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

      <Tabs defaultValue="ideas">
        <TabsList>
          <TabsTrigger value="ideas">Idées de contenu</TabsTrigger>
          <TabsTrigger value="calendar">Calendrier éditorial</TabsTrigger>
          <TabsTrigger value="validation">Validation humaine</TabsTrigger>
          <TabsTrigger value="library">Bibliothèque médias</TabsTrigger>
        </TabsList>

        <TabsContent value="ideas" className="mt-4">
          <Card className="p-5 shadow-card border-border/60 mb-4 bg-gradient-to-br from-primary/5 to-turquoise/5">
            <label className="text-sm font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-turquoise" />Demandez à l'agent</label>
            <Textarea className="mt-2 bg-background" rows={2} defaultValue="Donne-moi 30 idées de contenus LinkedIn pour vendre du matériel dentaire aux cabinets indépendants." />
            <div className="mt-3 flex flex-wrap gap-2 items-center justify-between">
              <div className="flex gap-2">
                <Badge variant="secondary">LinkedIn</Badge>
                <Badge variant="secondary">Cible : Dentistes</Badge>
                <Badge variant="secondary">Ton : Expert</Badge>
              </div>
              <Button size="sm" className="bg-gradient-primary"><Send className="h-3.5 w-3.5 mr-1.5" />Générer</Button>
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ideas.map((idea, i) => (
              <Card key={i} className="p-5 shadow-card border-border/60 hover:shadow-elegant transition">
                <Badge className="text-[10px]" variant="outline">{idea.net}</Badge>
                <h4 className="mt-3 font-semibold leading-snug">{idea.title}</h4>
                <div className="mt-3 flex flex-wrap gap-1">
                  {idea.hashtags.map((h) => <span key={h} className="text-xs text-primary"><Hash className="h-3 w-3 inline" />{h.slice(1)}</span>)}
                </div>
                <div className="mt-3 text-xs text-muted-foreground">CTA: <span className="text-foreground font-medium">{idea.cta}</span></div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">Éditer</Button>
                  <Button size="sm" className="flex-1 bg-primary">Valider</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <Card className="p-5 shadow-card border-border/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Semaine du 4 au 10 décembre 2026</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Générer 1 semaine</Button>
                <Button size="sm" variant="outline">1 mois</Button>
                <Button size="sm" className="bg-gradient-primary">3 mois</Button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-3">
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
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">Workflow : agent → validation marketing → graphiste → publication</p>
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
