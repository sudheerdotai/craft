"use client";

import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSocialSignIn = async (
    provider: "vercel" | "github" | "google",
  ) => {
    try {
      setLoading(provider);
      setError(null);
      await signIn.social({
        provider,
        callbackURL:
          typeof window !== "undefined" ? window.location.origin : "/",
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : `Failed to sign in with ${provider}`;
      setError(message);
      setLoading(null);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      setLoading("email");
      setError(null);
      if (isSignUp) {
        await (
          signIn as unknown as {
            email: (opts: Record<string, string>) => Promise<void>;
          }
        ).email({
          email,
          password,
          name: email.split("@")[0],
        });
      } else {
        await (
          signIn as unknown as {
            email: (opts: Record<string, string>) => Promise<void>;
          }
        ).email({
          email,
          password,
        });
      }
      onClose();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Authentication failed";
      setError(message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-sm border-zinc-800 bg-zinc-950 p-6 text-zinc-100">
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="text-xl font-bold tracking-tight text-white">
            {isSignUp ? "Create an account" : "Welcome back"}
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-400">
            Sign in to start vibe coding with Craft
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-2.5 rounded-lg bg-destructive/20 border border-destructive/50 text-destructive-foreground text-xs text-center">
            {error}
          </div>
        )}

        {/* Social Logins */}
        <div className="space-y-2 pt-2">
          {/* Sign in with Vercel */}
          <Button
            type="button"
            variant="default"
            onClick={() => handleSocialSignIn("vercel")}
            disabled={!!loading}
            className="w-full flex items-center justify-center gap-2.5 bg-white text-black hover:bg-zinc-200 text-xs font-semibold"
          >
            {loading === "vercel" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 1L24 22H0L12 1Z" />
              </svg>
            )}
            <span>Continue with Vercel</span>
          </Button>

          {/* Sign in with GitHub */}
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialSignIn("github")}
            disabled={!!loading}
            className="w-full flex items-center justify-center gap-2.5 border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 text-xs font-semibold"
          >
            {loading === "github" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            )}
            <span>Continue with GitHub</span>
          </Button>

          {/* Sign in with Google */}
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialSignIn("google")}
            disabled={!!loading}
            className="w-full flex items-center justify-center gap-2.5 border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 text-xs font-semibold"
          >
            {loading === "google" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>Continue with Google</span>
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-3">
          <Separator className="flex-1 bg-zinc-800" />
          <span className="px-3 text-[11px] text-zinc-500 uppercase tracking-wider">
            or email
          </span>
          <Separator className="flex-1 bg-zinc-800" />
        </div>

        {/* Email form */}
        <form onSubmit={handleEmailAuth} className="space-y-3">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-500 text-xs h-9"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-500 text-xs h-9"
          />
          <Button
            type="submit"
            disabled={loading === "email"}
            className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium h-9"
          >
            {loading === "email" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Mail className="w-3.5 h-3.5" />
            )}
            <span>{isSignUp ? "Create Account" : "Sign in with Email"}</span>
          </Button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-zinc-400 hover:text-white transition"
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
