"use client";

import { useState } from "react";
import { X, Key, Shield, Check, ExternalLink, Zap } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [keys, setKeys] = useState(() => {
    if (typeof window !== "undefined") {
      return {
        vercelToken: localStorage.getItem("craft_vercel_token") || "",
        anthropicKey: localStorage.getItem("craft_anthropic_key") || "",
        openAiKey: localStorage.getItem("craft_openai_key") || "",
        openRouterKey: localStorage.getItem("craft_openrouter_key") || "",
        geminiKey: localStorage.getItem("craft_gemini_key") || "",
      };
    }
    return {
      vercelToken: "",
      anthropicKey: "",
      openAiKey: "",
      openRouterKey: "",
      geminiKey: "",
    };
  });
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("craft_vercel_token", keys.vercelToken);
      localStorage.setItem("craft_anthropic_key", keys.anthropicKey);
      localStorage.setItem("craft_openai_key", keys.openAiKey);
      localStorage.setItem("craft_openrouter_key", keys.openRouterKey);
      localStorage.setItem("craft_gemini_key", keys.geminiKey);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                API Keys & Settings (BYOK)
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Your keys are stored exclusively in your browser session.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
          {/* Vercel OAuth Token */}
          <div className="p-4 rounded-xl bg-linear-to-r from-zinc-900 to-zinc-950 text-white border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium text-sm">
                <Zap className="w-4 h-4 text-amber-400" />
                Vercel OAuth Token / AI Gateway
              </div>
              <a
                href="https://vercel.com/account/tokens"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition"
              >
                Get Token <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="password"
              placeholder="vercel_..."
              value={keys.vercelToken}
              onChange={(e) =>
                setKeys({ ...keys, vercelToken: e.target.value })
              }
              className="w-full px-3 py-2 text-sm rounded-lg bg-zinc-800/80 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <p className="text-xs text-zinc-400">
              Enables Vercel AI Gateway, 1-click deployments, Postgres & Blob
              storage.
            </p>
          </div>

          {/* Anthropic API Key */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
              <span>Anthropic API Key (Claude)</span>
              <a
                href="https://console.anthropic.com/"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 flex items-center gap-0.5"
              >
                Console <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </label>
            <input
              type="password"
              placeholder="sk-ant-..."
              value={keys.anthropicKey}
              onChange={(e) =>
                setKeys({ ...keys, anthropicKey: e.target.value })
              }
              className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* OpenAI API Key */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
              <span>OpenAI API Key (GPT-4o)</span>
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 flex items-center gap-0.5"
              >
                Platform <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </label>
            <input
              type="password"
              placeholder="sk-..."
              value={keys.openAiKey}
              onChange={(e) => setKeys({ ...keys, openAiKey: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* OpenRouter API Key */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
              <span>OpenRouter API Key</span>
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 flex items-center gap-0.5"
              >
                Keys <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </label>
            <input
              type="password"
              placeholder="sk-or-..."
              value={keys.openRouterKey}
              onChange={(e) =>
                setKeys({ ...keys, openRouterKey: e.target.value })
              }
              className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Google Gemini API Key */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
              <span>Google Gemini API Key</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 flex items-center gap-0.5"
              >
                AI Studio <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={keys.geminiKey}
              onChange={(e) => setKeys({ ...keys, geminiKey: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
            <Shield className="w-3.5 h-3.5" />
            <span>100% BYOK & Private</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition flex items-center gap-1.5"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  Saved!
                </>
              ) : (
                "Save Keys"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
