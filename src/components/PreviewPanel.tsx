"use client";

import { useState } from "react";
import {
  Eye,
  Code,
  Terminal,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  Copy,
  Check,
  Play,
} from "lucide-react";

interface PreviewPanelProps {
  currentCode: string;
  activeFilePath: string;
  files: Record<string, string>;
  onSelectFile: (path: string) => void;
}

export function PreviewPanel({
  currentCode,
  activeFilePath,
  files,
  onSelectFile,
}: PreviewPanelProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "terminal">(
    "preview",
  );
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getViewportWidth = () => {
    switch (viewport) {
      case "mobile":
        return "max-w-[375px]";
      case "tablet":
        return "max-w-[768px]";
      default:
        return "w-full";
    }
  };

  return (
    <main className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
      {/* Panel Toolbar */}
      <div className="h-11 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 flex items-center justify-between">
        {/* View Tabs */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "preview"
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-blue-500" />
            <span>Interactive Preview</span>
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "code"
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <Code className="w-3.5 h-3.5 text-purple-500" />
            <span>Code Editor</span>
          </button>
          <button
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "terminal"
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-500" />
            <span>Logs</span>
          </button>
        </div>

        {/* Viewport Toggles (For Preview Tab) */}
        {activeTab === "preview" && (
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-lg border border-zinc-200 dark:border-zinc-700/50">
            <button
              onClick={() => setViewport("desktop")}
              className={`p-1 rounded ${
                viewport === "desktop"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              }`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport("tablet")}
              className={`p-1 rounded ${
                viewport === "tablet"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              }`}
              title="Tablet View"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport("mobile")}
              className={`p-1 rounded ${
                viewport === "mobile"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Code Tab Actions */}
        {activeTab === "code" && (
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy Code
              </>
            )}
          </button>
        )}
      </div>

      {/* Main Content View */}
      <div className="flex-1 overflow-hidden relative p-4 flex items-center justify-center">
        {activeTab === "preview" && (
          <div
            className={`h-full ${getViewportWidth()} transition-all duration-300 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black shadow-2xl overflow-hidden flex flex-col`}
          >
            {/* Mock Browser Header */}
            <div className="h-8 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="text-[11px] font-mono text-zinc-400 bg-white dark:bg-zinc-950 px-3 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-800">
                http://localhost:3000
              </div>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </div>

            {/* Sandbox Canvas */}
            <div className="flex-1 overflow-auto">
              <div
                dangerouslySetInnerHTML={{
                  __html: renderMockPreview(currentCode),
                }}
              />
            </div>
          </div>
        )}

        {activeTab === "code" && (
          <div className="w-full h-full flex rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-zinc-100 overflow-hidden font-mono text-xs">
            {/* File List */}
            <div className="w-56 border-r border-zinc-800 bg-zinc-950 p-2 space-y-1">
              <div className="text-[10px] uppercase font-bold text-zinc-500 px-2 py-1">
                Explorer
              </div>
              {Object.keys(files).map((filePath) => (
                <button
                  key={filePath}
                  onClick={() => onSelectFile(filePath)}
                  className={`w-full text-left px-2 py-1.5 rounded text-xs transition ${
                    activeFilePath === filePath
                      ? "bg-purple-950/80 text-purple-300 font-semibold"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                  }`}
                >
                  {filePath}
                </button>
              ))}
            </div>

            {/* Code Content */}
            <div className="flex-1 p-4 overflow-auto">
              <pre className="text-zinc-300 leading-relaxed whitespace-pre-wrap font-mono">
                {currentCode}
              </pre>
            </div>
          </div>
        )}

        {activeTab === "terminal" && (
          <div className="w-full h-full rounded-xl border border-zinc-800 bg-black p-4 font-mono text-xs text-emerald-400 space-y-2 overflow-auto">
            <div className="flex items-center justify-between text-zinc-500 pb-2 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Play className="w-3.5 h-3.5 text-emerald-500" />
                <span>Next.js Turbopack Development Server</span>
              </div>
              <span>Ready on port 3000</span>
            </div>
            <div className="text-zinc-400">▲ Next.js 16.3.4 (Turbopack)</div>
            <div>✓ Compiled / in 420ms</div>
            <div className="text-zinc-500">GET / 200 in 18ms</div>
            <div className="text-emerald-500">
              ✓ Vercel AI Gateway connected
            </div>
            <div className="text-zinc-400">Ready for user interactions...</div>
          </div>
        )}
      </div>
    </main>
  );
}

function renderMockPreview(code: string): string {
  // Safe simple parser or styled fallback for visual feedback in workspace
  if (code.includes("SaaS Landing Page") || code.includes("Modern SaaS")) {
    return `
      <div style="background-color: #09090b; color: white; min-height: 100%; padding: 2.5rem; font-family: system-ui, sans-serif;">
        <div style="max-width: 800px; margin: 0 auto; text-align: center;">
          <span style="background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); padding: 4px 12px; rounded: 9999px; font-size: 12px; font-weight: 600; display: inline-block; border-radius: 999px; margin-bottom: 1rem;">🚀 Next.js 16 Vibe Coder</span>
          <h1 style="font-size: 2.75rem; font-weight: 800; line-height: 1.2; margin-bottom: 1rem; background: linear-gradient(to right, #ffffff, #a1a1aa); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Build Production Next.js Apps at Light Speed</h1>
          <p style="color: #a1a1aa; font-size: 1.125rem; margin-bottom: 2rem;">Full-featured open source vibe coding environment. BYOK powered by Vercel AI Gateway.</p>
          <div style="display: flex; justify-content: center; gap: 1rem;">
            <button style="background: #ffffff; color: #000000; padding: 10px 24px; border-radius: 8px; font-weight: 600; border: none; cursor: pointer;">Get Started Free</button>
            <button style="background: rgba(255,255,255,0.08); color: #ffffff; padding: 10px 24px; border-radius: 8px; font-weight: 600; border: 1px solid rgba(255,255,255,0.15); cursor: pointer;">Star on GitHub</button>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div style="background-color: #09090b; color: #f4f4f5; min-height: 100%; padding: 3rem; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center;">
      <div style="text-align: center; max-width: 500px;">
        <div style="font-size: 2.5rem; margin-bottom: 1rem;">⚡</div>
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; color: #ffffff;">Craft Workspace Active</h2>
        <p style="color: #71717a; font-size: 0.875rem;">Enter a prompt in the left sidebar to generate or modify your Next.js components live.</p>
      </div>
    </div>
  `;
}
