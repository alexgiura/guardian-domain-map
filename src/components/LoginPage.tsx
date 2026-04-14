import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, User } from "lucide-react";
import dnscLogo from "@/assets/dnsc-logo.svg";

interface LoginPageProps {
  onLogin: (username: string) => void;
}

const VALID_USER = "admin";
const VALID_PASS = "admin";

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === VALID_USER && password === VALID_PASS) {
      onLogin(username);
    } else {
      setError("Utilizator sau parolă incorectă");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="w-full max-w-sm">
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-8">
          <img src={dnscLogo} alt="DNSC" className="h-20 w-20 rounded-full mb-4" />
          <p className="text-sm text-muted-foreground">Autentifică-te pentru a continua</p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl shadow-xl border border-border/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Utilizator
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(""); }}
                  placeholder="Introdu utilizatorul"
                  className="pl-10 h-11 rounded-xl bg-muted/30 border-border/50 focus-visible:ring-primary/30"
                  autoFocus
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Parolă
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="Introdu parola"
                  className="pl-10 h-11 rounded-xl bg-muted/30 border-border/50 focus-visible:ring-primary/30"
                />
              </div>
            </div>
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm px-3 py-2 rounded-lg text-center">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full h-11 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-shadow">
              Autentificare
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground/60 mt-6">
          © 2026 DNSC — Directoratul Național de Securitate Cibernetică
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
