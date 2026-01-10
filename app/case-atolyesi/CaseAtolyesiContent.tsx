"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { apiRequest, getAuthHeaders } from "@/lib/api-client";
import ReactMarkdown from "react-markdown";

interface CaseThread {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

const QUICK_PROMPTS = [
  "Fintech onboarding için bir case üretelim",
  "B2B dashboard problemi çalışmak istiyorum",
  "E-commerce checkout iyileştirme case'i yapalım",
  "Mobil health app için problem bulalım",
];

export default function CaseAtolyesiContent() {
  const { user, profile } = useAuth();
  const [threads, setThreads] = useState<CaseThread[]>([]);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoadingThreads, setIsLoadingThreads] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const firstName = profile?.first_name || "Serhat";

  // Load threads on mount
  useEffect(() => {
    loadThreads();
  }, []);

  // Load messages when thread is selected
  useEffect(() => {
    if (selectedThreadId) {
      loadMessages(selectedThreadId);
    } else {
      setMessages([]);
    }
  }, [selectedThreadId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadThreads = async () => {
    try {
      setIsLoadingThreads(true);
      const headers = await getAuthHeaders();
      const response = await fetch("/api/cases", {
        headers,
      });

      if (!response.ok) {
        throw new Error("Threads yüklenemedi");
      }

      const data = await response.json();
      setThreads(data.threads || []);

      // Auto-select first thread if exists
      if (data.threads && data.threads.length > 0 && !selectedThreadId) {
        setSelectedThreadId(data.threads[0].id);
      }
    } catch (err: any) {
      console.error("Error loading threads:", err);
      setError(err.message || "Threads yüklenemedi");
    } finally {
      setIsLoadingThreads(false);
    }
  };

  const loadMessages = async (threadId: string) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`/api/cases/${threadId}/messages`, {
        headers,
      });

      if (!response.ok) {
        throw new Error("Mesajlar yüklenemedi");
      }

      const data = await response.json();
      setMessages(data.messages || []);
    } catch (err: any) {
      console.error("Error loading messages:", err);
      setError(err.message || "Mesajlar yüklenemedi");
    }
  };

  const createNewThread = async () => {
    try {
      setIsLoading(true);
      setError("");
      const headers = await getAuthHeaders();
      
      const response = await fetch("/api/cases", {
        method: "POST",
        headers,
        body: JSON.stringify({ title: "Yeni Case" }),
      });

      if (!response.ok) {
        throw new Error("Yeni case oluşturulamadı");
      }

      const data = await response.json();
      await loadThreads();
      setSelectedThreadId(data.thread.id);
      setMessages([]);
    } catch (err: any) {
      console.error("Error creating thread:", err);
      setError(err.message || "Yeni case oluşturulamadı");
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = async (prompt: string) => {
    // Create new thread if none selected
    if (!selectedThreadId) {
      try {
        setIsLoading(true);
        const headers = await getAuthHeaders();
        
        const response = await fetch("/api/cases", {
          method: "POST",
          headers,
          body: JSON.stringify({ title: "Yeni Case" }),
        });

        if (!response.ok) {
          throw new Error("Yeni case oluşturulamadı");
        }

        const data = await response.json();
        setSelectedThreadId(data.thread.id);
        await sendMessage(prompt, data.thread.id, true);
      } catch (err: any) {
        console.error("Error creating thread:", err);
        setError(err.message || "Yeni case oluşturulamadı");
        setIsLoading(false);
      }
    } else {
      await sendMessage(prompt, selectedThreadId, false);
    }
  };

  const sendMessage = async (messageText: string, threadId: string, isFirstMessage: boolean) => {
    try {
      setIsLoading(true);
      setError("");

      // Add user message to UI immediately
      const userMessage: Message = {
        id: `temp-${Date.now()}`,
        role: "user",
        content: messageText,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      const headers = await getAuthHeaders();
      const response = await fetch("/api/chat", {
        method: "POST",
        headers,
        body: JSON.stringify({
          threadId,
          message: messageText,
          isFirstMessage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Mesaj gönderilemedi");
      }

      const data = await response.json();
      
      // Add assistant message to UI
      const assistantMessage: Message = {
        id: data.message.id || `assistant-${Date.now()}`,
        role: "assistant",
        content: data.message.content,
        created_at: data.message.created_at || new Date().toISOString(),
      };
      
      setMessages((prev) => {
        // Remove temp user message and add real ones
        const filtered = prev.filter((m) => !m.id.startsWith("temp"));
        return [...filtered, userMessage, assistantMessage];
      });

      // Reload threads to update titles
      await loadThreads();
    } catch (err: any) {
      console.error("Error sending message:", err);
      setError(err.message || "Mesaj gönderilemedi");
      // Remove temp message on error
      setMessages((prev) => prev.filter((m) => !m.id.startsWith("temp")));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !selectedThreadId) return;

    await sendMessage(input.trim(), selectedThreadId, false);
  };

  const selectedThread = threads.find((t) => t.id === selectedThreadId);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Case List */}
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-zinc-800">
            <button
              onClick={createNewThread}
              disabled={isLoading}
              className="w-full px-4 py-2.5 bg-[#DEFF37] text-black font-semibold rounded-lg hover:bg-[#DEFF37]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Yeni Case
            </button>
          </div>

          {/* Thread List */}
          <div className="flex-1 overflow-y-auto">
            {isLoadingThreads ? (
              <div className="p-4 text-center">
                <div className="w-6 h-6 border-2 border-[#DEFF37] border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : threads.length === 0 ? (
              <div className="p-4 text-center text-gray-400 text-sm">
                Henüz case yok
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {threads.map((thread) => (
                  <button
                    key={thread.id}
                    onClick={() => setSelectedThreadId(thread.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedThreadId === thread.id
                        ? "bg-[#DEFF37]/20 border border-[#DEFF37]/30"
                        : "bg-zinc-800/50 hover:bg-zinc-800"
                    }`}
                  >
                    <div className="font-medium text-white text-sm mb-1 truncate">
                      {thread.title}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(thread.updated_at).toLocaleDateString("tr-TR")}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Main Content - Chat */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {!selectedThread ? (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="max-w-2xl w-full text-center">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Bugün ne tasarlıyoruz {firstName}?
                </h1>
                <p className="text-gray-400 text-lg mb-8">
                  Case Atölyesi, portfolyon için gerçekçi bir problemle başlamana yardımcı olur. Biraz anlat, gerisini birlikte şekillendirelim.
                </p>

                {/* Quick Prompts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {QUICK_PROMPTS.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickPrompt(prompt)}
                      disabled={isLoading}
                      className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-left hover:border-[#DEFF37]/50 hover:bg-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <p className="text-white text-sm">{prompt}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Chat Interface */
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
                <h2 className="text-xl font-bold text-white">{selectedThread.title}</h2>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <p className="text-gray-400 mb-4">Henüz mesaj yok</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                        {QUICK_PROMPTS.map((prompt, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickPrompt(prompt)}
                            disabled={isLoading}
                            className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-left hover:border-[#DEFF37]/50 hover:bg-zinc-900 transition-all text-sm text-white disabled:opacity-50"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-3xl ${
                            message.role === "user"
                              ? "bg-[#DEFF37] text-black"
                              : "bg-zinc-800 text-white"
                          } rounded-2xl px-4 py-3`}
                        >
                          {message.role === "assistant" ? (
                            <ReactMarkdown className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:text-gray-300 prose-code:text-[#DEFF37] prose-pre:bg-zinc-900 prose-pre:text-gray-300">
                              {message.content}
                            </ReactMarkdown>
                          ) : (
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-zinc-800 text-white rounded-2xl px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                            <span className="text-gray-400 text-sm ml-2">Yazıyor...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mx-6 mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Mesajınızı yazın..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DEFF37] transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="px-6 py-3 bg-[#DEFF37] text-black font-semibold rounded-lg hover:bg-[#DEFF37]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Gönder
                  </button>
                </form>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
