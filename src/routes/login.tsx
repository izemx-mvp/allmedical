import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Stethoscope, ShieldCheck, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Connexion — AllMedical AI Hub" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-hero text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 backdrop-blur">
            <Stethoscope className="h-6 w-6" />
          </div>
          <div>
            <div className="text-lg font-bold">AllMedical</div>
            <div className="text-xs opacity-80">AI Hub</div>
          </div>
        </div>
        <div className="relative z-10 space-y-6 max-w-md">
          <h2 className="text-4xl font-bold leading-tight">L'intelligence artificielle au service du secteur dentaire.</h2>
          <p className="text-base opacity-90">Centralisez vos agents IA marketing, publicité et marchés publics dans une seule plateforme.</p>
          <div className="space-y-3 pt-4">
            {[
              { i: Sparkles, t: "3 agents IA spécialisés métier" },
              { i: ShieldCheck, t: "Conformité HDS & RGPD" },
              { i: Lock, t: "Double authentification Microsoft / Google" },
            ].map(({ i: Icon, t }) => (
              <div key={t} className="flex items-center gap-3 text-sm opacity-95">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/15"><Icon className="h-4 w-4" /></div>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-xs opacity-70">© 2026 AllMedical · Tous droits réservés</div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12">
        <Card className="w-full max-w-md p-8 shadow-elegant border-border/60">
          <div className="lg:hidden mb-6 flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary">
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold">AllMedical AI Hub</span>
          </div>
          <h1 className="text-2xl font-bold">Connexion</h1>
          <p className="mt-1 text-sm text-muted-foreground">Accédez à votre espace AllMedical.</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-10">
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24"><path fill="#F25022" d="M1 1h10v10H1z"/><path fill="#7FBA00" d="M13 1h10v10H13z"/><path fill="#00A4EF" d="M1 13h10v10H1z"/><path fill="#FFB900" d="M13 13h10v10H13z"/></svg>
              Microsoft
            </Button>
            <Button variant="outline" className="h-10">
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
              Google
            </Button>
          </div>

          <div className="my-5 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">ou avec votre email</span>
            <Separator className="flex-1" />
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate({ to: "/" }); }}>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email professionnel</Label>
              <Input id="email" type="email" placeholder="prenom.nom@allmedical.fr" defaultValue="sophie.martin@allmedical.fr" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <button type="button" className="text-xs text-primary hover:underline">Oublié ?</button>
              </div>
              <Input id="password" type="password" defaultValue="••••••••••" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="2fa" defaultChecked />
              <Label htmlFor="2fa" className="text-sm font-normal cursor-pointer">Activer la double authentification (2FA)</Label>
            </div>
            <Button type="submit" className="w-full h-10 bg-gradient-primary hover:opacity-95 shadow-elegant">
              Se connecter
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            En continuant, vous acceptez les <Link to="/" className="underline">CGU</Link> et la <Link to="/" className="underline">politique de confidentialité</Link>.
          </p>
        </Card>
      </div>
    </div>
  );
}
