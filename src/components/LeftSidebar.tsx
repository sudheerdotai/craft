"use client";

import { Plus, MessageSquare, GitBranch, LogOut } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";

export interface ChatSession {
  id: string;
  title: string;
  updatedAt: string;
}

interface LeftSidebarProps {
  sessions: ChatSession[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
}

export function LeftSidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
}: LeftSidebarProps) {
  const { data: session } = useSession();

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col h-screen shrink-0 text-zinc-300 select-none">
      {/* Top Header / App Name & New Chat */}
      <div className="p-3 border-b border-zinc-900 flex items-center justify-between">
        <span className="font-semibold text-sm tracking-tight text-white px-2">
          Craft
        </span>
        <button
          onClick={onNewChat}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 transition shadow-xs"
          title="New Chat"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Chat History List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <div className="text-[11px] font-medium text-zinc-500 px-2 py-1 uppercase tracking-wider">
          Recent Chats
        </div>
        {sessions.length === 0 ? (
          <div className="px-3 py-6 text-center text-xs text-zinc-600">
            No previous chats
          </div>
        ) : (
          sessions.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectSession(s.id)}
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-left truncate transition ${
                activeSessionId === s.id
                  ? "bg-zinc-800/90 text-white font-medium"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-70" />
              <span className="truncate">{s.title}</span>
            </button>
          ))
        )}
      </div>

      {/* Bottom Profile Section */}
      <div className="p-3 border-t border-zinc-900 space-y-2 bg-zinc-950">
        {session?.user && (
          <div className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
            <div className="truncate text-xs font-medium text-zinc-300">
              {session.user.name || session.user.email}
            </div>
            <button
              onClick={() => signOut()}
              className="text-zinc-500 hover:text-zinc-300 p-1"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-zinc-600">
          <span>v0.1.0</span>
          <a
            href="https://github.com/sudheerdotai/craft"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-zinc-400"
          >
            <GitBranch className="w-3 h-3" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
