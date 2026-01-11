"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { getAuthHeaders } from "@/lib/api-client";
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
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start closed, will open when threads exist
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const placeholderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const charIndexRef = useRef(0);
  const isTypingRef = useRef(true);

  const firstName = profile?.first_name || "Serhat";
  const hasThreads = threads.length > 0;
  const showSidebar = hasThreads && sidebarOpen;

  // Load threads on mount
  useEffect(() => {
    if (user) {
      loadThreads();
    }
  }, [user]);

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

  // Auto-open sidebar when first thread is created
  useEffect(() => {
    if (hasThreads && !sidebarOpen) {
      setSidebarOpen(true);
    }
  }, [hasThreads]);

  // Animated placeholder typing effect
  useEffect(() => {
    if (hasThreads || input !== "") {
      setAnimatedPlaceholder("");
      if (placeholderTimeoutRef.current) {
        clearTimeout(placeholderTimeoutRef.current);
      }
      return;
    }

    const currentPrompt = QUICK_PROMPTS[currentPromptIndex];
    charIndexRef.current = 0;
    isTypingRef.current = true;

    const animate = () => {
      if (isTypingRef.current) {
        // Typing phase
        if (charIndexRef.current <= currentPrompt.length) {
          setAnimatedPlaceholder(currentPrompt.slice(0, charIndexRef.current));
          charIndexRef.current++;
          placeholderTimeoutRef.current = setTimeout(animate, 50);
        } else {
          // Wait before deleting
          placeholderTimeoutRef.current = setTimeout(() => {
            isTypingRef.current = false;
            charIndexRef.current = currentPrompt.length;
            animate();
          }, 2000);
        }
      } else {
        // Deleting phase
        if (charIndexRef.current > 0) {
          charIndexRef.current--;
          setAnimatedPlaceholder(currentPrompt.slice(0, charIndexRef.current));
          placeholderTimeoutRef.current = setTimeout(animate, 30);
        } else {
          // Move to next prompt
          setCurrentPromptIndex((prev) => (prev + 1) % QUICK_PROMPTS.length);
        }
      }
    };

    animate();

    return () => {
      if (placeholderTimeoutRef.current) {
        clearTimeout(placeholderTimeoutRef.current);
      }
    };
  }, [hasThreads, currentPromptIndex, input]);

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
      const loadedThreads = data.threads || [];
      setThreads(loadedThreads);

      // Auto-select first thread if exists and none selected
      if (loadedThreads.length > 0 && !selectedThreadId) {
        setSelectedThreadId(loadedThreads[0].id);
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
      setSidebarOpen(true);
    } catch (err: any) {
      console.error("Error creating thread:", err);
      setError(err.message || "Yeni case oluşturulamadı");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = async (prompt: string) => {
    if (!hasThreads) {
      await sendFirstMessage(prompt);
    } else if (selectedThreadId) {
      await sendMessage(prompt, selectedThreadId, false);
    }
  };

  const sendFirstMessage = async (messageText: string) => {
    try {
      setIsLoading(true);
      setError("");

      // Create new thread first
      const headers = await getAuthHeaders();
      const createResponse = await fetch("/api/cases", {
        method: "POST",
        headers,
        body: JSON.stringify({ title: "Yeni Case" }),
      });

      if (!createResponse.ok) {
        throw new Error("Case oluşturulamadı");
      }

      const { thread } = await createResponse.json();
      
      // Set selected thread and reload threads to show sidebar
      setSelectedThreadId(thread.id);
      setSidebarOpen(true);
      
      // Reload threads to update UI
      await loadThreads();

      // Add user message to UI immediately
      const userMessage: Message = {
        id: `temp-${Date.now()}`,
        role: "user",
        content: messageText,
        created_at: new Date().toISOString(),
      };
      setMessages([userMessage]);
      setInput("");

      // Send message to API
      const chatResponse = await fetch("/api/chat", {
        method: "POST",
        headers,
        body: JSON.stringify({
          threadId: thread.id,
          message: messageText,
          isFirstMessage: true,
        }),
      });

      if (!chatResponse.ok) {
        const errorData = await chatResponse.json().catch(() => ({}));
        throw new Error(errorData.error || "Mesaj gönderilemedi");
      }

      const chatData = await chatResponse.json();
      
      // Add assistant message to UI
      const assistantMessage: Message = {
        id: chatData.message.id || `assistant-${Date.now()}`,
        role: "assistant",
        content: chatData.message.content,
        created_at: chatData.message.created_at || new Date().toISOString(),
      };
      
      setMessages([userMessage, assistantMessage]);

      // Reload threads to update title
      await loadThreads();
    } catch (err: any) {
      console.error("Error sending first message:", err);
      setError(err.message || "Mesaj gönderilemedi");
      setMessages([]);
    } finally {
      setIsLoading(false);
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
    if (!input.trim() || isLoading) return;

    const messageText = input.trim();

    if (!hasThreads) {
      await sendFirstMessage(messageText);
    } else if (selectedThreadId) {
      await sendMessage(messageText, selectedThreadId, false);
    }
  };

  const selectedThread = threads.find((t) => t.id === selectedThreadId);

  return (
    <>
      {/* Animated Background Elements - Same as homepage */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#DEFF37]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#DEFF37]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#DEFF37 1px, transparent 1px), linear-gradient(90deg, #DEFF37 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}></div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar - Only render when threads exist */}
      {hasThreads && (
        <aside
          className={`bg-zinc-900 border-r border-zinc-800 flex flex-col transition-all duration-300 ease-in-out ${
            showSidebar ? "w-64" : "w-0"
          } overflow-hidden`}
        >
          {/* Header */}
          <div className={`p-4 border-b border-zinc-800 ${showSidebar ? "opacity-100" : "opacity-0"} transition-opacity whitespace-nowrap`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white">Case'lerim</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors"
                title="Sidebar'ı Kapat"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <button
              onClick={createNewThread}
              disabled={isLoading}
              className="w-full px-4 py-2.5 bg-[#DEFF37] text-black font-semibold rounded-lg hover:bg-[#DEFF37]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Yeni Case
            </button>
          </div>

          {/* Thread List */}
          <div className={`flex-1 overflow-y-auto ${showSidebar ? "opacity-100" : "opacity-0"} transition-opacity`}>
            {isLoadingThreads ? (
              <div className="p-4 text-center">
                <div className="w-6 h-6 border-2 border-[#DEFF37] border-t-transparent rounded-full animate-spin mx-auto"></div>
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
      )}

      {/* Sidebar Toggle Button - Only show when threads exist but sidebar is closed */}
      {hasThreads && !sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="absolute left-0 top-4 z-10 p-2 bg-zinc-900 border border-zinc-800 rounded-r-lg hover:bg-zinc-800 transition-colors"
          title="Case'leri Göster"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Main Content - Chat */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {!hasThreads ? (
          /* Empty State - No threads, sidebar hidden, full width */
          <>
            <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
              <div className="max-w-3xl w-full">
                <div className="text-center mb-12">
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                    Bugün ne tasarlıyoruz {firstName}?
                  </h1>
                  <p className="text-gray-400 text-lg md:text-xl">
                    Case Atölyesi, portfolyon için gerçekçi bir problemle başlamana yardımcı olur. Biraz anlat, gerisini birlikte şekillendirelim.
                  </p>
                </div>

                {/* Input Area - Moved below title and subtitle */}
                <div className="max-w-3xl mx-auto">
                  {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="flex gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={animatedPlaceholder || "Herhangi bir şey sor"}
                        disabled={isLoading}
                        className="w-full px-5 py-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#DEFF37]/50 focus:bg-black/30 transition-all disabled:opacity-50 text-lg shadow-lg"
                        autoFocus
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="px-8 py-4 bg-[#DEFF37] text-black font-semibold rounded-xl hover:bg-[#DEFF37]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : !selectedThread ? (
          /* Empty State - Threads exist but none selected */
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-2xl w-full text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Bir case seçin</h2>
              <p className="text-gray-400 mb-8">Devam etmek için bir case seçin veya yeni bir case oluşturun.</p>
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
                    <p className="text-gray-400">Henüz mesaj yok</p>
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
            <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-md">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Mesajınızı yazın..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#DEFF37]/50 focus:bg-black/30 transition-all disabled:opacity-50 shadow-lg"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-6 py-3 bg-[#DEFF37] text-black font-semibold rounded-xl hover:bg-[#DEFF37]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  Gönder
                </button>
              </form>
            </div>
          </>
        )}
      </main>
      </div>
    </>
  );
}
