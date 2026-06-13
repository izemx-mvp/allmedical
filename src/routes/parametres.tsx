import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Sparkles } from "lucide-react";

export const Route = createFileRoute("/parametres")({
  head: () => ({ meta: [{ title: "Paramètres — AllMedical" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppShell title="Paramètres" actions={<Button className="bg-gradient-primary"><Save className="h-4 w-4 mr-1.5" />Enregistrer</Button>}>
      <Tabs defaultValue="org">
        <TabsList>
          <TabsTrigger value="org">Organisation</TabsTrigger>
          <TabsTrigger value="ai">Configuration IA</TabsTrigger>
          <TabsTrigger value="prompt">Instructions système</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        <TabsContent value="org" className="mt-4 grid gap-4 max-w-2xl">
          <Card className="p-6 shadow-card border-border/60 space-y-4">
            <h3 className="font-semibold">Identité de l'organisation</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Nom légal</Label><Input defaultValue="AllMedical SAS" /></div>
              <div className="space-y-1.5"><Label>SIRET</Label><Input defaultValue="123 456 789 00012" /></div>
              <div className="space-y-1.5"><Label>Téléphone</Label><Input defaultValue="+33 1 23 45 67 89" /></div>
              <div className="space-y-1.5"><Label>Email facturation</Label><Input defaultValue="compta@allmedical.fr" /></div>
            </div>
            <div className="space-y-1.5"><Label>Adresse</Label><Input defaultValue="42 rue de la Santé, 75013 Paris" /></div>
          </Card>
          <Card className="p-6 shadow-card border-border/60 space-y-3">
            <h3 className="font-semibold">Préférences</h3>
            <div className="flex items-center justify-between"><span className="text-sm">Langue par défaut</span><Input defaultValue="Français" className="w-40" /></div>
            <div className="flex items-center justify-between"><span className="text-sm">Fuseau horaire</span><Input defaultValue="Europe/Paris" className="w-40" /></div>
            <div className="flex items-center justify-between"><span className="text-sm">Devise</span><Input defaultValue="EUR (€)" className="w-40" /></div>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="mt-4 grid gap-4 max-w-2xl">
          <Card className="p-6 shadow-card border-border/60 space-y-4">
            <h3 className="font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-turquoise" />Modèles IA</h3>
            {[
              { l: "Community Manager", model: "GPT-4o", temp: "0.8" },
              { l: "Traffic Manager", model: "Claude 3.5 Sonnet", temp: "0.4" },
              { l: "Marchés Publics", model: "GPT-4o + RAG", temp: "0.2" },
            ].map((a) => (
              <div key={a.l} className="grid sm:grid-cols-3 gap-3 items-end pb-3 border-b last:border-0">
                <div className="space-y-1"><Label className="text-xs">{a.l}</Label><Input defaultValue={a.model} /></div>
                <div className="space-y-1"><Label className="text-xs">Température</Label><Input defaultValue={a.temp} /></div>
                <div className="flex items-center gap-2"><Switch defaultChecked /><span className="text-xs text-muted-foreground">Activer</span></div>
              </div>
            ))}
          </Card>
        </TabsContent>

        <TabsContent value="prompt" className="mt-4 max-w-3xl">
          <Card className="p-6 shadow-card border-border/60 space-y-4">
            <h3 className="font-semibold">Prompt système personnalisé</h3>
            <p className="text-xs text-muted-foreground">Instructions globales appliquées à tous les agents IA AllMedical.</p>
            <Textarea
              rows={12}
              defaultValue={`Tu es un agent IA expert du secteur du matériel dentaire travaillant pour AllMedical SAS, distributeur français leader.\n\nRègles :\n- Réponds toujours en français professionnel.\n- Mentionne les normes : marquage CE, ISO 13485, dispositifs médicaux classe IIa.\n- Cible : chirurgiens-dentistes, cliniques, CHU, écoles dentaires.\n- N'invente jamais une référence produit : utilise la base de connaissances.\n- Pour les marchés publics : strict respect du Code de la commande publique.\n- Ton : expert, factuel, orienté valeur client.`}
            />
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4 max-w-2xl space-y-4">
          <Card className="p-6 shadow-card border-border/60 space-y-3">
            <h3 className="font-semibold">Sécurité du compte</h3>
            {[
              { l: "Double authentification (2FA)", on: true },
              { l: "Single Sign-On Microsoft", on: true },
              { l: "Single Sign-On Google", on: true },
              { l: "Verrouillage après 4 tentatives", on: true },
              { l: "Journal d'accès chiffré (90 jours)", on: true },
              { l: "Hébergement HDS certifié", on: true },
            ].map((s) => (
              <div key={s.l} className="flex items-center justify-between py-2 border-b last:border-0"><span className="text-sm">{s.l}</span><Switch defaultChecked={s.on} /></div>
            ))}
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
