import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus, ShieldCheck, FileText, CreditCard } from "lucide-react";

export const Route = createFileRoute("/administration")({
  head: () => ({ meta: [{ title: "Administration — AllMedical" }] }),
  component: AdminPage,
});

const users = [
  { name: "Sophie Martin", email: "sophie.martin@allmedical.fr", role: "Admin", dep: "Direction Marketing", last: "Maintenant" },
  { name: "Marie Dubois", email: "marie.dubois@allmedical.fr", role: "Marketing", dep: "Community Mgr", last: "il y a 12 min" },
  { name: "Thomas Renard", email: "thomas.renard@allmedical.fr", role: "Traffic Manager", dep: "Marketing Digital", last: "il y a 1 h" },
  { name: "Camille Petit", email: "camille.petit@allmedical.fr", role: "Marchés Publics", dep: "Commercial", last: "il y a 3 h" },
  { name: "Jean-Luc Roux", email: "jl.roux@allmedical.fr", role: "Direction", dep: "Direction Générale", last: "hier" },
  { name: "Léa Bernard", email: "lea.bernard@allmedical.fr", role: "Graphiste", dep: "Studio créa", last: "hier" },
];

const audit = [
  { who: "Sophie M.", action: "a activé l'automatisme « Nouvel AO → Direction »", time: "14:42" },
  { who: "Système", action: "a indexé 12 nouveaux documents dans la base de connaissances", time: "14:18" },
  { who: "Marie D.", action: "a validé 9 publications LinkedIn", time: "13:55" },
  { who: "Agent Traffic Mgr", action: "a augmenté le budget de la campagne « Lead magnet » de +20%", time: "13:22" },
  { who: "Thomas R.", action: "a modifié les permissions de l'utilisateur Léa Bernard", time: "12:08" },
  { who: "Camille P.", action: "a téléchargé le DCE de l'AO CHU Lyon", time: "11:30" },
];

function AdminPage() {
  return (
    <AppShell
      title="Administration"
      description="Utilisateurs, rôles, audit et abonnements."
      actions={<Button className="bg-gradient-primary"><UserPlus className="h-4 w-4 mr-1.5" />Inviter</Button>}
    >
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="roles">Rôles & permissions</TabsTrigger>
          <TabsTrigger value="audit">Journal d'activité</TabsTrigger>
          <TabsTrigger value="billing">Abonnement</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-4">
          <Card className="shadow-card border-border/60 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr><th className="text-left p-3">Utilisateur</th><th className="text-left p-3">Rôle</th><th className="text-left p-3">Département</th><th className="text-left p-3">Dernière connexion</th></tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.email} className="border-t border-border/60 hover:bg-muted/30">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{u.name.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                        <div><div className="font-medium">{u.name}</div><div className="text-xs text-muted-foreground">{u.email}</div></div>
                      </div>
                    </td>
                    <td className="p-3"><Badge variant="outline" className="text-[10px]">{u.role}</Badge></td>
                    <td className="p-3 text-muted-foreground">{u.dep}</td>
                    <td className="p-3 text-muted-foreground">{u.last}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { r: "Admin", perms: ["Tout"], color: "bg-destructive/10 text-destructive" },
              { r: "Marketing", perms: ["Community Mgr", "Validation", "Documents"], color: "bg-primary/10 text-primary" },
              { r: "Traffic Manager", perms: ["Campagnes", "Budgets", "Optimisations"], color: "bg-turquoise/15 text-turquoise" },
              { r: "Marchés Publics", perms: ["AO", "Chat doc.", "Échéances"], color: "bg-warning/15 text-warning-foreground" },
              { r: "Direction", perms: ["Lecture", "Rapports", "Approbations"], color: "bg-chart-5/15 text-chart-5" },
              { r: "Graphiste", perms: ["Bibliothèque médias", "Tâches"], color: "bg-success/10 text-success" },
            ].map((r) => (
              <Card key={r.r} className="p-5 shadow-card border-border/60">
                <div className="flex items-center gap-2 mb-3"><ShieldCheck className="h-4 w-4" /><h3 className="font-semibold">{r.r}</h3></div>
                <div className="flex flex-wrap gap-1.5">{r.perms.map(p => <Badge key={p} className={`${r.color} border-0 text-[10px]`}>{p}</Badge>)}</div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audit" className="mt-4">
          <Card className="shadow-card border-border/60">
            <div className="p-4 border-b flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /><h3 className="font-semibold">Audit logs — 13 décembre 2026</h3></div>
            <ul className="divide-y">
              {audit.map((a, i) => (
                <li key={i} className="px-4 py-3 flex items-center gap-4 text-sm hover:bg-muted/30">
                  <span className="font-mono text-xs text-muted-foreground w-12">{a.time}</span>
                  <span className="font-medium">{a.who}</span>
                  <span className="text-muted-foreground flex-1">{a.action}</span>
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-4 grid gap-4 lg:grid-cols-2">
          <Card className="p-6 shadow-card border-border/60 bg-gradient-to-br from-primary/5 to-turquoise/5">
            <Badge className="bg-gradient-primary text-primary-foreground border-0">Plan Entreprise</Badge>
            <h3 className="mt-3 text-2xl font-bold">€ 1 290 <span className="text-base font-normal text-muted-foreground">/ mois</span></h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>✔ 3 agents IA actifs</li>
              <li>✔ Utilisateurs illimités</li>
              <li>✔ 500 000 crédits IA / mois</li>
              <li>✔ SSO Microsoft & Google</li>
              <li>✔ Support prioritaire</li>
              <li>✔ Conformité HDS / RGPD</li>
            </ul>
            <Button variant="outline" className="mt-5 w-full"><CreditCard className="h-4 w-4 mr-1.5" />Gérer l'abonnement</Button>
          </Card>
          <Card className="p-6 shadow-card border-border/60">
            <h3 className="font-semibold mb-4">Consommation IA — décembre</h3>
            {[
              { l: "Community Manager", v: 184000, max: 250000 },
              { l: "Traffic Manager", v: 92000, max: 150000 },
              { l: "Marchés Publics", v: 138000, max: 100000 },
            ].map((u) => (
              <div key={u.l} className="mb-4">
                <div className="flex justify-between text-sm mb-1"><span>{u.l}</span><span className="text-muted-foreground">{u.v.toLocaleString()} / {u.max.toLocaleString()}</span></div>
                <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-gradient-primary" style={{ width: `${Math.min(100, u.v / u.max * 100)}%` }} /></div>
              </div>
            ))}
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
