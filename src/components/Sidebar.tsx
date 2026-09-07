"use client";

import { useState } from "react";
import { Send, Bot, User, Sparkles, Code2, Zap, RefreshCw } from "lucide-react";

export interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  filesChanged?: string[];
}

interface SidebarProps {
  messages: Message[];
  onSendMessage: (prompt: string, model: string) => void;
  isGenerating: boolean;
}

const PROMPT_SUGGESTIONS = [
  {
    title: "✨ SaaS Landing Page",
    prompt:
      "Create a modern dark-mode SaaS landing page for a Next.js developer tool with hero section, feature grid, and pricing cards.",
  },
  {
    title: "📊 Analytics Dashboard",
    prompt:
      "Build an interactive analytics dashboard with metric summary cards, chart placeholders, recent activity feed, and sidebar navigation.",
  },
  {
    title: "🛒 E-Commerce Showcase",
    prompt:
      "Create an e-commerce product showcase page with image gallery, product selection options, reviews section, and shopping cart drawer.",
  },
  {
    title: "🤖 AI Chat Interface",
    prompt:
      "Design a clean AI chat assistant interface with message bubbles, code block formatting, model selector, and responsive layout.",
  },
];

export function Sidebar({
  messages,
  onSendMessage,
  isGenerating,
}: SidebarProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("claude-3.5-sonnet");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    onSendMessage(prompt.trim(), selectedModel);
    setPrompt("");
  };

  return (
    <aside className="w-full lg:w-96 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Model & Gateway Selection */}
      <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <Bot className="w-4 h-4 text-purple-500" />
          <span>Model:</span>
        </div>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="text-xs font-medium bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1 text-zinc-900 dark:text-zinc-100 focus:outline-none"
        >
          <option value="claude-3.5-sonnet">
            Claude 3.5 Sonnet (Anthropic)
          </option>
          <option value="gpt-4o">GPT-4o (OpenAI)</option>
          <option value="gemini-1.5-pro">Gemini 1.5 Pro (Google)</option>
          <option value="vercel-ai-gateway">Vercel AI Gateway</option>
        </select>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="space-y-4 py-6">
            <div className="p-4 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 text-center space-y-2">
              <div className="p-2 w-fit mx-auto rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                What do you want to build?
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
                Describe your Next.js feature or UI component in plain text and
                Craft will build it live.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-1">
                Quick Prompts
              </div>
              <div className="grid grid-cols-1 gap-2">
                {PROMPT_SUGGESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPrompt(item.prompt);
                    }}
                    className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left transition space-y-1 group"
                  >
                    <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2">
                      {item.prompt}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs ${
                msg.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg h-fit ${
                  msg.sender === "user"
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-purple-600 text-white"
                }`}
              >
                {msg.sender === "user" ? (
                  <User className="w-3.5 h-3.5" />
                ) : (
                  <Bot className="w-3.5 h-3.5" />
                )}
              </div>
              <div
                className={`flex-1 rounded-xl p-3 border space-y-1.5 ${
                  msg.sender === "user"
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-transparent"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] opacity-60">
                  <span>{msg.sender === "user" ? "You" : "Craft AI"}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div className="leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </div>

                {msg.filesChanged && msg.filesChanged.length > 0 && (
                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
                    <div className="text-[10px] font-semibold text-purple-500 flex items-center gap-1">
                      <Code2 className="w-3 h-3" /> Files Updated:
                    </div>
                    {msg.filesChanged.map((file, i) => (
                      <div
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                      >
                        {file}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {isGenerating && (
          <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400 p-3 rounded-lg bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-900">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Crafting components & layout...</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="relative">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to build or change..."
              className="w-full p-3 pr-10 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={!prompt.trim() || isGenerating}
              className="absolute right-2.5 bottom-3.5 p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" /> BYOK Active
            </span>
          </div>
        </form>
      </div>
    </aside>
  );
}
