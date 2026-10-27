"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function AdminLoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password || loading) return;
    setLoading(true);

    try {
      const response = await fetch("/admin/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Welcome back",
          description: "Redirecting to dashboard…",
        });
        router.push("/admin");
        router.refresh();
      } else {
        setLoading(false);
        toast({
          title: "Login failed",
          description: result.message || "Invalid password.",
          variant: "destructive",
        });
      }
    } catch {
      setLoading(false);
      toast({
        title: "Network error",
        description: "Please check your connection.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            placeholder="••••••••••••"
            className="pl-10 pr-10 h-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading || !password}
        className="w-full h-11 bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
      >
        {loading ? (
          <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Signing in…</>
        ) : (
          <>Sign In</>
        )}
      </Button>
    </form>
  );
}
