"use client";

import { Sparkles, Key, Rocket, Layers, GitBranch, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "@/lib/auth-client";

interface HeaderProps {
  onOpenSettings: () => void;
  onDeploy: () => void;
  isDeploying?: boolean;
}

export function Header({
  onOpenSettings,
  onDeploy,
  isDeploying = false,
}: HeaderProps) {
  const { data: session } = useSession();

  const handleVercelSignIn = async () => {
    try {
      await signIn.social({
        provider: "vercel",
      });
    } catch (err) {
      console.error("Vercel sign-in error:", err);
    }
  };

  return (
    <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-4 flex items-center justify-between sticky top-0 z-40">
      {/* Brand & Tagline */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-50">
          <div className="p-1.5 rounded-lg bg-linear-to-tr from-purple-600 via-indigo-500 to-blue-500 text-white shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <span>Craft</span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            Next.js Vibe Coder
          </span>
        </div>
      </div>

      {/* Center Actions */}
      <div className="hidden md:flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <Layers className="w-3.5 h-3.5 text-zinc-400" />
          Next.js 16 + React 19 + Tailwind v4
        </span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/sudheerdotai/craft"
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
          title="GitHub Repository"
        >
          <GitBranch className="w-4 h-4" />
        </a>

        {session?.user ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-medium">
              {session.user.name || session.user.email}
            </span>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-zinc-200"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleVercelSignIn}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <path d="M12 1L24 22H0L12 1Z" />
            </svg>
            <span>Sign in with Vercel</span>
          </button>
        )}

        <button
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition"
        >
          <Key className="w-3.5 h-3.5 text-amber-500" />
          <span>BYOK Keys</span>
        </button>

        <button
          onClick={onDeploy}
          disabled={isDeploying}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition shadow-sm disabled:opacity-50"
        >
          <Rocket className="w-3.5 h-3.5 text-blue-400 dark:text-blue-600" />
          <span>{isDeploying ? "Deploying..." : "Deploy"}</span>
        </button>
      </div>
    </header>
  );
}
