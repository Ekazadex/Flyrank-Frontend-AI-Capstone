"use client";

import React, { useState, useEffect, useCallback } from 'react';
import StreamingChat from '@/components/StreamingChat';
import type { ChatSession, AppLanguage } from '@/types/chat';
import {
  SESSIONS_STORAGE_KEY,
  ACTIVE_SESSION_STORAGE_KEY,
  LANGUAGE_STORAGE_KEY,
  I18N_DICTIONARY,
} from '@/types/chat';
import type { Message } from 'ai';
import {
  Plus,
  Terminal,
  PanelLeftClose,
  PanelLeft,
  Trash2,
  Globe,
  MessageSquare,
  Search,
  Check,
  X,
  Edit2,
  Sparkles,
} from 'lucide-react';

function createNewSession(lang: AppLanguage): ChatSession {
  const now = Date.now();
  return {
    id: `session_${now}_${Math.random().toString(36).substring(2, 7)}`,
    title: lang === 'id' ? 'Percakapan Baru' : 'New Conversation',
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
}

function formatRelativeTime(timestamp: number, lang: AppLanguage): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return lang === 'id' ? 'Baru saja' : 'Just now';
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export default function ChatPage() {
  const [lang, setLang] = useState<AppLanguage>(() => {
    if (typeof window === 'undefined') return 'id';
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored === 'en' || stored === 'id') return stored;
    } catch {
      // fallback
    }
    return 'id';
  });

  const t = I18N_DICTIONARY[lang];

  // Load sessions: allow 0 sessions if user cleared all
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    if (typeof window === 'undefined') return [createNewSession('id')];
    try {
      const stored = localStorage.getItem(SESSIONS_STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return [createNewSession('id')];
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    if (typeof window === 'undefined') return sessions[0]?.id || '';
    try {
      const savedActive = localStorage.getItem(ACTIVE_SESSION_STORAGE_KEY);
      if (savedActive && sessions.some((s) => s.id === savedActive)) {
        return savedActive;
      }
    } catch {
      // fallback
    }
    return sessions[0]?.id || '';
  });

  // Sidebar visibility: open by default on desktop/tablet, hidden on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 768;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  // Keyboard shortcut Ctrl+B / Cmd+B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsSidebarOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync sessions to localStorage (saves even when empty array)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
      } catch (err) {
        console.error('Failed to sync sessions to localStorage:', err);
      }
    }
  }, [sessions]);

  // Sync activeSessionId to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(ACTIVE_SESSION_STORAGE_KEY, activeSessionId);
      } catch (err) {
        console.error('Failed to sync active session ID:', err);
      }
    }
  }, [activeSessionId]);

  const activeSession =
    sessions.find((s) => s.id === activeSessionId) ||
    (sessions.length > 0 ? sessions[0] : null);

  const toggleLanguage = () => {
    const nextLang: AppLanguage = lang === 'id' ? 'en' : 'id';
    setLang(nextLang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLang);
    } catch {
      // ignore
    }
  };

  // Callback to update messages for a specific session with strict bailout guard
  const handleUpdateSessionMessages = useCallback(
    (sessionId: string, newMessages: Message[]) => {
      setSessions((prev) => {
        const target = prev.find((s) => s.id === sessionId);
        if (!target) return prev;

        // Bail out if messages are identical to break any recursive render cycles
        if (target.messages === newMessages) return prev;
        if (
          target.messages.length === newMessages.length &&
          target.messages.every(
            (m, i) =>
              m.id === newMessages[i]?.id &&
              m.content === newMessages[i]?.content &&
              m.role === newMessages[i]?.role
          )
        ) {
          return prev;
        }

        // Auto-generate title from the first user message if title is default
        let title = target.title;
        if (
          (title === 'Percakapan Baru' ||
            title === 'New Conversation' ||
            title === 'Sesi Audit Baru' ||
            title === 'New Audit Session' ||
            !title) &&
          newMessages.length > 0
        ) {
          const firstUserMsg = newMessages.find((m) => m.role === 'user');
          if (firstUserMsg && firstUserMsg.content) {
            title =
              firstUserMsg.content.slice(0, 32) +
              (firstUserMsg.content.length > 32 ? '...' : '');
          }
        }

        return prev.map((s) =>
          s.id === sessionId
            ? {
                ...s,
                title,
                updatedAt: Date.now(),
                messages: newMessages,
              }
            : s
        );
      });
    },
    []
  );

  const handleNewSession = () => {
    const fresh = createNewSession(lang);
    setSessions((prev) => [fresh, ...prev]);
    setActiveSessionId(fresh.id);
  };

  // Delete session: allow list to become completely 0 conversations until user clicks New
  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSessions((prev) => {
      const remaining = prev.filter((s) => s.id !== id);
      if (remaining.length === 0) {
        setActiveSessionId('');
        return [];
      }
      if (activeSessionId === id) {
        setActiveSessionId(remaining[0].id);
      }
      return remaining;
    });
  };

  const startEditing = (s: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(s.id);
    setEditingTitle(s.title);
  };

  const saveEditing = (id: string, e?: React.MouseEvent | React.FormEvent) => {
    if (e) e.stopPropagation();
    if (editingTitle.trim()) {
      setSessions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, title: editingTitle.trim() } : s))
      );
    }
    setEditingId(null);
  };

  // Clear current chat: resets messages, title, and generates new clean session ID
  const handleClearCurrentChat = () => {
    if (!activeSession) return;
    const freshSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSession.id
          ? {
              ...s,
              id: freshSessionId,
              title: lang === 'id' ? 'Percakapan Baru' : 'New Conversation',
              messages: [],
              updatedAt: Date.now(),
            }
          : s
      )
    );
    setActiveSessionId(freshSessionId);
  };

  const filteredSessions = sessions.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[100dvh] w-full bg-[#08090E] text-slate-100 flex overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Mobile Backdrop Overlay (< 768px) */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Collapsible Sidebar */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 z-50 flex flex-col bg-[#0C0E14] border-r border-[#1B202E] transition-all duration-300 ease-in-out ${
          isSidebarOpen
            ? 'w-72 sm:w-80 translate-x-0 opacity-100'
            : '-translate-x-full md:translate-x-0 md:w-0 md:border-none md:overflow-hidden md:opacity-0 pointer-events-none md:pointer-events-auto'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-3.5 border-b border-[#1B202E] flex items-center justify-between min-w-[280px]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white tracking-tight">{t.appTitle}</span>
              <p className="text-[10px] text-slate-400 font-mono">{t.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Action: New Chat & Search Bar */}
        <div className="p-3 min-w-[280px]">
          <button
            type="button"
            onClick={() => {
              handleNewSession();
              if (window.innerWidth < 768) setIsSidebarOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-md shadow-indigo-950/40 transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>{t.newChat}</span>
          </button>

          {sessions.length > 2 && (
            <div className="relative mt-2">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-[#121622] border border-[#1E2536] rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500/60 transition-colors"
              />
            </div>
          )}
        </div>

        {/* Thread History List */}
        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-1 min-w-[280px]">
          <div className="px-2 py-1.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>{t.historyTitle}</span>
            <span className="font-mono text-[10px]">{sessions.length} {t.threadsCount}</span>
          </div>

          {filteredSessions.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400">
              {t.emptyThreads}
            </div>
          ) : (
            filteredSessions.map((s) => {
              const isActive = s.id === activeSessionId;
              const isEditing = s.id === editingId;

              return (
                <div
                  key={s.id}
                  onClick={() => {
                    setActiveSessionId(s.id);
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                  className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-xs transition-all ${
                    isActive
                      ? 'bg-[#181D2B] text-white border border-indigo-500/40 shadow-sm'
                      : 'text-slate-300 hover:bg-[#131722] hover:text-white border border-transparent'
                  }`}
                >
                  {isEditing ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        saveEditing(s.id);
                      }}
                      className="flex items-center gap-1.5 w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        autoFocus
                        className="flex-1 bg-slate-900 border border-indigo-500 rounded px-2 py-0.5 text-xs text-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={(e) => saveEditing(s.id, e)}
                        className="text-emerald-400 hover:text-emerald-300 p-0.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(null);
                        }}
                        className="text-slate-400 hover:text-slate-200 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  ) : (
                    <>
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <MessageSquare
                          className={`w-3.5 h-3.5 flex-shrink-0 ${
                            isActive ? 'text-indigo-400' : 'text-slate-500'
                          }`}
                        />
                        <div className="truncate flex-1">
                          <p className="truncate font-medium">{s.title}</p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5 font-mono">
                            <span>{s.messages.length} {t.turnsCount}</span>
                            <span>•</span>
                            <span>{formatRelativeTime(s.updatedAt || s.createdAt, lang)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions: Rename / Delete */}
                      <div
                        className={`flex items-center gap-1 ml-2 transition-opacity ${
                          isActive
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={(e) => startEditing(s, e)}
                          title={t.renameChat}
                          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteSession(s.id, e)}
                          title={t.deleteChat}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors z-10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#1B202E] bg-[#0A0C12] min-w-[280px]">
          <div className="flex items-center justify-between px-1 text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {t.localSynced}
            </span>
            <span>{sessions.length} {t.threadsCount}</span>
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-14 sm:h-15 border-b border-[#1A1F2E] bg-[#0C0E15]/95 px-3 sm:px-6 flex items-center justify-between backdrop-blur-md z-20 flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            {/* Sidebar Toggle Button */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              title={isSidebarOpen ? t.hideSidebar : t.showSidebar}
              aria-label={isSidebarOpen ? t.hideSidebar : t.showSidebar}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/70 transition-colors border border-transparent hover:border-slate-700/50"
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
              ) : (
                <PanelLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
              )}
            </button>

            {/* Thread Title */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xs sm:text-sm font-semibold text-white truncate max-w-[170px] sm:max-w-xs md:max-w-md">
                  {activeSession ? activeSession.title : (lang === 'id' ? 'Tidak Ada Percakapan' : 'No Conversation')}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Terminal className="w-2.5 h-2.5" />
                  Gemini 1.5 Flash
                </span>
              </div>
            </div>
          </div>

          {/* Right Header Action Items */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Language Switcher (EN / ID) */}
            <button
              type="button"
              onClick={toggleLanguage}
              title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
              aria-label="Toggle language"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#121622] hover:bg-[#1A2030] border border-[#20273D] text-xs font-mono transition-colors shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-semibold text-white">
                {lang === 'id' ? 'ID' : 'EN'}
              </span>
              <span className="text-[10px] text-slate-400">
                /{lang === 'id' ? 'EN' : 'ID'}
              </span>
            </button>

            {/* Clear Chat Button (Instant reset, visible only when active session has messages) */}
            {activeSession && activeSession.messages.length > 0 && (
              <button
                type="button"
                onClick={handleClearCurrentChat}
                title={t.clearChat}
                aria-label={t.clearChat}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 text-xs transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">{t.clearChat}</span>
              </button>
            )}

            {/* Quick New Chat Button */}
            <button
              type="button"
              onClick={handleNewSession}
              title={t.newChat}
              aria-label={t.newChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-sm transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{t.newChatShort}</span>
            </button>
          </div>
        </header>

        {/* Streaming Conversation Body */}
        <main className="flex-1 min-h-0 overflow-hidden relative flex flex-col">
          {activeSession ? (
            <StreamingChat
              key={activeSession.id}
              session={activeSession}
              lang={lang}
              onUpdateSessionMessages={handleUpdateSessionMessages}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center my-auto">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shadow-xl shadow-indigo-950/30">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                {lang === 'id' ? 'Tidak Ada Percakapan Aktif' : 'No Active Conversation'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-sm leading-relaxed">
                {lang === 'id'
                  ? 'Semua riwayat percakapan telah dihapus. Klik tombol di bawah untuk membuat percakapan baru.'
                  : 'All conversations have been removed. Click below to start a new chat session.'}
              </p>
              <button
                type="button"
                onClick={handleNewSession}
                className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium shadow-lg shadow-indigo-950/40 transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>{t.newChat}</span>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
