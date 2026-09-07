"use client";

import { useState } from "react";
import {
  ArrowUp,
  User,
  Bot,
  RefreshCw,
  Code2,
  Sparkles,
  Rocket,
  Eye,
  Code,
  Terminal,
  ExternalLink,
  LogIn,
} from "lucide-react";
import { Message } from "@/components/Sidebar";

interface ChatWorkspaceProps {
  messages: Message[];
  onSendMessage: (prompt: string) => void;
  isGenerating: boolean;
  files: Record<string, string>;
  activeFilePath: string;
  onSelectFile: (path: string) => void;
  onDeploy: () => void;
  isDeploying?: boolean;
  onSignIn: () => void;
  isLoggedIn?: boolean;
}

const QUICK_STARTS = [
  {
    label: "SaaS Landing Page",
    prompt:
      "Build a Next.js SaaS landing page with dark mode, features, and pricing",
  },
  {
    label: "Dashboard",
    prompt:
      "Create an interactive analytics dashboard with real-time KPI cards",
  },
  {
    label: "E-Commerce",
    prompt:
      "Design a modern e-commerce checkout page with a cart preview drawer",
  },
  {
    label: "Docs Layout",
    prompt:
      "Create a developer documentation layout with sidebar and code snippets",
  },
];

export function ChatWorkspace({
  messages,
  onSendMessage,
  isGenerating,
  files,
  activeFilePath,
  onSelectFile,
  onDeploy,
  isDeploying = false,
  onSignIn,
  isLoggedIn = false,
}: ChatWorkspaceProps) {
  const [prompt, setPrompt] = useState("");
  const [rightTab, setRightTab] = useState<"preview" | "code" | "terminal">(
    "preview",
  );

  const hasStarted = messages.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    onSendMessage(prompt.trim());
    setPrompt("");
  };

  return (
    <div className="flex-1 flex h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      {/* Chat Section */}
      <div
        className={`flex flex-col h-full transition-all duration-300 ${hasStarted ? "w-full lg:w-1/2 border-r border-zinc-800" : "w-full"}`}
      >
        {/* Top Minimal Toolbar */}
        <div className="h-14 border-b border-zinc-900/80 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm tracking-tight text-white">
              Craft
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isLoggedIn && (
              <button
                onClick={onSignIn}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white text-black hover:bg-zinc-200 transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {hasStarted && (
              <button
                onClick={onDeploy}
                disabled={isDeploying}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-100 text-black hover:bg-zinc-300 transition disabled:opacity-50"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>{isDeploying ? "Deploying..." : "Deploy"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Chat / Welcome Center Area */}
        {!hasStarted ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 overflow-y-auto">
            <div className="w-full max-w-2xl space-y-8 text-center">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                What do you want to create?
              </h1>

              {/* Sleek v0-style Input Box */}
              <form onSubmit={handleSubmit} className="text-left w-full">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-2xl p-4 focus-within:border-zinc-600 focus-within:ring-1 focus-within:ring-zinc-600 transition-all">
                  <textarea
                    rows={3}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask Craft to build anything in Next.js..."
                    className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 resize-none focus:outline-none leading-relaxed"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                  <div className="flex items-center justify-between pt-3 mt-1 border-t border-zinc-800/60">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-400 bg-zinc-800/80 px-2.5 py-1 rounded-full border border-zinc-700/60">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        Next.js 16 + React 19
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        disabled={!prompt.trim() || isGenerating}
                        className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition disabled:opacity-30 disabled:hover:bg-white"
                        title="Send prompt"
                      >
                        <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Quick Pills (v0-style) */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {QUICK_STARTS.map((starter, i) => (
                  <button
                    key={i}
                    onClick={() => onSendMessage(starter.prompt)}
                    className="px-3.5 py-1.5 rounded-full border border-zinc-800/90 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-700 text-xs text-zinc-400 hover:text-zinc-200 transition"
                  >
                    {starter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Active Chat Stream */
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs sm:text-sm ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === "user"
                        ? "bg-white text-black"
                        : "bg-zinc-800 text-zinc-300 border border-zinc-700"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User className="w-3.5 h-3.5" />
                    ) : (
                      <Bot className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-zinc-800 text-white"
                        : "bg-zinc-900/90 border border-zinc-800 text-zinc-200"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    {msg.filesChanged && msg.filesChanged.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-zinc-800/80 flex items-center gap-1.5 flex-wrap">
                        <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="text-[11px] text-zinc-400">
                          Updated:
                        </span>
                        {msg.filesChanged.map((f, idx) => (
                          <span
                            key={idx}
                            onClick={() => onSelectFile(f)}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 cursor-pointer hover:border-zinc-500 transition"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isGenerating && (
                <div className="flex items-center gap-2 text-xs text-zinc-400 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 w-fit">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-zinc-300" />
                  <span>Crafting components...</span>
                </div>
              )}
            </div>

            {/* Bottom Sticky Input for Active Chat */}
            <div className="p-3 border-t border-zinc-900 bg-zinc-950">
              <form onSubmit={handleSubmit} className="relative">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 px-4 py-2.5 flex items-center gap-2 focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700 transition">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask a follow-up or suggest changes..."
                    className="flex-1 bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!prompt.trim() || isGenerating}
                    className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition disabled:opacity-30 disabled:hover:bg-white shrink-0"
                  >
                    <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Right-hand Output Panel (Reveals once chat starts) */}
      {hasStarted && (
        <div className="hidden lg:flex flex-1 flex-col h-full bg-zinc-950 overflow-hidden">
          {/* Panel Header */}
          <div className="h-12 border-b border-zinc-900 px-4 flex items-center justify-between shrink-0 bg-zinc-950">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setRightTab("preview")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  rightTab === "preview"
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-blue-400" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setRightTab("code")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  rightTab === "code"
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Code className="w-3.5 h-3.5 text-purple-400" />
                <span>Code</span>
              </button>
              <button
                onClick={() => setRightTab("terminal")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  rightTab === "terminal"
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Logs</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
              <span>Next.js 16</span>
            </div>
          </div>

          {/* Panel Body */}
          <div className="flex-1 p-3 overflow-hidden flex flex-col">
            {rightTab === "preview" && (
              <div className="flex-1 rounded-xl border border-zinc-800 bg-black overflow-hidden flex flex-col">
                <div className="h-8 border-b border-zinc-800/80 px-3 bg-zinc-900/60 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-600" />
                    <span className="w-2 h-2 rounded-full bg-zinc-600" />
                    <span className="w-2 h-2 rounded-full bg-zinc-600" />
                  </div>
                  <span>http://localhost:3000</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </div>
                <div className="flex-1 overflow-auto">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: renderMockPreview(files[activeFilePath] || ""),
                    }}
                  />
                </div>
              </div>
            )}

            {rightTab === "code" && (
              <div className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900/90 overflow-hidden flex font-mono text-xs">
                <div className="w-48 border-r border-zinc-800 bg-zinc-950 p-2 space-y-0.5">
                  <div className="text-[10px] uppercase font-bold text-zinc-500 px-2 py-1">
                    Files
                  </div>
                  {Object.keys(files).map((filePath) => (
                    <button
                      key={filePath}
                      onClick={() => onSelectFile(filePath)}
                      className={`w-full text-left px-2 py-1.5 rounded text-xs truncate transition ${
                        activeFilePath === filePath
                          ? "bg-zinc-800 text-white"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {filePath}
                    </button>
                  ))}
                </div>
                <div className="flex-1 p-3 overflow-auto">
                  <pre className="text-zinc-300 leading-relaxed font-mono whitespace-pre-wrap">
                    {files[activeFilePath]}
                  </pre>
                </div>
              </div>
            )}

            {rightTab === "terminal" && (
              <div className="flex-1 rounded-xl border border-zinc-800 bg-black p-4 font-mono text-xs text-emerald-400 space-y-2 overflow-auto">
                <div className="text-zinc-500 pb-2 border-b border-zinc-800">
                  Next.js Turbopack Development Server
                </div>
                <div className="text-zinc-400">
                  ▲ Next.js 16.3.4 (Turbopack)
                </div>
                <div>✓ Compiled {activeFilePath} in 320ms</div>
                <div className="text-zinc-500">GET / 200 in 15ms</div>
                <div className="text-emerald-500">
                  ✓ Vercel AI Gateway connected
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function renderMockPreview(code: string): string {
  if (code.includes("SaaS") || code.includes("Landing")) {
    return `
      <div style="background-color: #09090b; color: white; min-height: 100%; padding: 2.5rem; font-family: system-ui, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; text-align: center;">
          <span style="background: rgba(255, 255, 255, 0.08); color: #e4e4e7; border: 1px solid rgba(255, 255, 255, 0.15); padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 600; display: inline-block; margin-bottom: 1.25rem;">Next.js 16 App</span>
          <h1 style="font-size: 2.25rem; font-weight: 700; line-height: 1.2; margin-bottom: 1rem;">Build Production Next.js Apps at Light Speed</h1>
          <p style="color: #a1a1aa; font-size: 0.95rem; margin-bottom: 2rem;">Full-featured open source vibe coding environment with zero subscriptions.</p>
          <div style="display: flex; justify-content: center; gap: 0.75rem;">
            <button style="background: #ffffff; color: #000000; padding: 8px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; border: none; cursor: pointer;">Get Started</button>
            <button style="background: rgba(255,255,255,0.06); color: #ffffff; padding: 8px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; border: 1px solid rgba(255,255,255,0.12); cursor: pointer;">Learn More</button>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div style="background-color: #09090b; color: #f4f4f5; min-height: 100%; padding: 3rem; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center;">
      <div style="text-align: center; max-width: 450px;">
        <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: #ffffff;">Craft Live Workspace</h2>
        <p style="color: #71717a; font-size: 0.825rem;">Send a prompt to generate or update the Next.js components in real time.</p>
      </div>
    </div>
  `;
}
