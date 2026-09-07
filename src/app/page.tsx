"use client";

import { useState } from "react";
import { LeftSidebar, ChatSession } from "@/components/LeftSidebar";
import { ChatWorkspace } from "@/components/ChatWorkspace";
import { Message } from "@/components/Sidebar";
import { AuthModal } from "@/components/AuthModal";
import { useSession } from "@/lib/auth-client";

const DEFAULT_FILES: Record<string, string> = {
  "src/app/page.tsx": `'use client';

import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Welcome to Your Next.js App
        </h1>
        <p className="text-zinc-400 text-sm">
          Built with React 19, Tailwind CSS v4, and App Router.
        </p>
      </div>
    </main>
  );
}`,
  "src/app/globals.css": `@import "tailwindcss";`,
};

export default function Home() {
  const { data: session } = useSession();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>("default");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [files, setFiles] = useState<Record<string, string>>(DEFAULT_FILES);
  const [activeFilePath, setActiveFilePath] = useState("src/app/page.tsx");

  const handleSendMessage = (prompt: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsGenerating(true);

    if (sessions.length === 0 || activeSessionId === "default") {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: prompt.slice(0, 32) + (prompt.length > 32 ? "..." : ""),
        updatedAt: "Just now",
      };
      setSessions([newSession]);
      setActiveSessionId(newSession.id);
    }

    setTimeout(() => {
      let updatedPageCode = files["src/app/page.tsx"];

      if (
        prompt.toLowerCase().includes("saas") ||
        prompt.toLowerCase().includes("landing")
      ) {
        updatedPageCode = `'use client';

import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans">
      <section className="py-20 px-6 max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Craft Production Next.js Apps at Light Speed
        </h1>
        <p className="text-base text-zinc-400 max-w-xl mx-auto">
          Full-featured open-source vibe coding tool with BYOK model and Vercel AI Gateway.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button className="px-5 py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition">
            Get Started
          </button>
          <button className="px-5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-medium text-xs hover:bg-zinc-800 transition">
            Learn More
          </button>
        </div>
      </section>
    </main>
  );
}`;
      }

      setFiles((prev) => ({
        ...prev,
        "src/app/page.tsx": updatedPageCode,
      }));

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: `Crafted component with Next.js 16 and Tailwind CSS. Updated page layout according to your specifications.`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        filesChanged: ["src/app/page.tsx"],
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsGenerating(false);
    }, 1200);
  };

  const handleNewChat = () => {
    setMessages([]);
    setActiveSessionId(Date.now().toString());
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      alert("🚀 Deployment initiated to Vercel!");
    }, 2000);
  };

  const isLoggedIn = !!session?.user;

  return (
    <div className="h-screen w-screen flex bg-zinc-950 text-zinc-100 overflow-hidden font-sans antialiased">
      {/* Sidebar only renders after login */}
      {isLoggedIn && (
        <LeftSidebar
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSelectSession={(id) => setActiveSessionId(id)}
          onNewChat={handleNewChat}
        />
      )}

      <ChatWorkspace
        messages={messages}
        onSendMessage={handleSendMessage}
        isGenerating={isGenerating}
        files={files}
        activeFilePath={activeFilePath}
        onSelectFile={(path) => setActiveFilePath(path)}
        onDeploy={handleDeploy}
        isDeploying={isDeploying}
        onSignIn={() => setIsAuthModalOpen(true)}
        isLoggedIn={isLoggedIn}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
