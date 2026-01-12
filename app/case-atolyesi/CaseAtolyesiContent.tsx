"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
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

const THINKING_STEPS = [
  "Case'i düşünüyorum...",
  "Problemi netleştiriyorum...",
  "Şablonu oluşturuyorum...",
  "Kapsamı belirliyorum...",
  "Portfolyo yapısını hazırlıyorum...",
];

// Thinking steps animation component with typewriter effect
function ThinkingStepsAnimation() {
  const [displayText, setDisplayText] = useState("");
  const stepRef = useRef(0);
  const charIndexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = useRef(true);
  const isDeletingRef = useRef(false);

  useEffect(() => {
    const type = () => {
      const currentText = THINKING_STEPS[stepRef.current];
      
      if (charIndexRef.current <= currentText.length) {
        setDisplayText(currentText.slice(0, charIndexRef.current));
        charIndexRef.current++;
        timeoutRef.current = setTimeout(type, 50); // Typing speed: 50ms per character
      } else {
        // Finished typing, wait then start deleting
        isTypingRef.current = false;
        timeoutRef.current = setTimeout(() => {
          isDeletingRef.current = true;
          deleteText();
        }, 2000); // Wait 2 seconds before deleting
      }
    };

    const deleteText = () => {
      const currentText = THINKING_STEPS[stepRef.current];
      
      if (charIndexRef.current > 0) {
        charIndexRef.current--;
        setDisplayText(currentText.slice(0, charIndexRef.current));
        timeoutRef.current = setTimeout(deleteText, 30); // Deleting speed: 30ms per character
      } else {
        // Finished deleting, move to next step
        isDeletingRef.current = false;
        stepRef.current = (stepRef.current + 1) % THINKING_STEPS.length;
        charIndexRef.current = 0;
        isTypingRef.current = true;
        // Start typing next step
        timeoutRef.current = setTimeout(type, 300);
      }
    };

    // Start typing
    type();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []); // Run only once on mount

  return (
    <div className="text-sm text-white font-medium">
      {displayText}
      <span className="animate-pulse">|</span>
    </div>
  );
}

export default function CaseAtolyesiContent() {
  const { user, profile } = useAuth();
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);
  
  const [threads, setThreads] = useState<CaseThread[]>([]);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoadingThreads, setIsLoadingThreads] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const placeholderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const charIndexRef = useRef(0);
  const isTypingRef = useRef(true);

  const firstName = profile?.first_name || "Serhat";
  const hasThreads = threads.length > 0;
  const showSidebar = hasThreads && sidebarOpen;
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadThreads = useCallback(async () => {
    try {
      setIsLoadingThreads(true);
      setError("");
      
      const headers = await getAuthHeaders();
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch("/api/cases", {
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle 204 No Content
      if (response.status === 204) {
        console.warn("Received 204 No Content from /api/cases");
        setThreads([]);
        setIsLoadingThreads(false);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Threads yüklenemedi (${response.status})`);
      }

      // Check content-type before parsing
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Unexpected response type from /api/cases:", contentType);
        setThreads([]);
        setIsLoadingThreads(false);
        return;
      }

      const data = await response.json();
      const loadedThreads = data.threads || [];
      setThreads(loadedThreads);

      if (loadedThreads.length > 0) {
        setSidebarOpen(true);
      }
    } catch (err: any) {
      console.error("Error loading threads:", err);
      if (err.name === 'AbortError') {
        setError("İstek zaman aşımına uğradı. Lütfen tekrar deneyin.");
      } else {
        setError(err.message || "Threads yüklenemedi");
      }
      setThreads([]);
    } finally {
      setIsLoadingThreads(false);
    }
  }, []);

  // Reset state when navigating to this page or on mount
  useEffect(() => {
    const isRouteChange = prevPathnameRef.current !== null && prevPathnameRef.current !== pathname;
    const isFirstMount = prevPathnameRef.current === null;
    
    if (isRouteChange || isFirstMount) {
      // Route changed or first mount - reset state
      setThreads([]);
      setSelectedThreadId(null);
      setMessages([]);
      setInput("");
      setIsLoading(false);
      setError("");
      setIsLoadingThreads(true);
      setSidebarOpen(false);
      
      // Load threads if user is available
      if (user) {
        loadThreads();
      } else {
        setIsLoadingThreads(false);
      }
    }
    prevPathnameRef.current = pathname;
  }, [pathname, user, loadThreads]);

  // Load threads when user is available (fallback for when route doesn't change)
  useEffect(() => {
    if (user && prevPathnameRef.current === pathname) {
      loadThreads();
    } else if (!user) {
      setIsLoadingThreads(false);
    }
  }, [user, loadThreads, pathname]);

  // Load messages when thread is selected (but not if we're in the middle of sending a message)
  const isSendingMessageRef = useRef(false);
  
  useEffect(() => {
    if (selectedThreadId && !isSendingMessageRef.current) {
      loadMessages(selectedThreadId);
    } else if (!selectedThreadId) {
      setMessages([]);
    }
  }, [selectedThreadId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-open sidebar when threads exist
  useEffect(() => {
    if (hasThreads && !sidebarOpen) {
      setSidebarOpen(true);
    }
  }, [hasThreads, sidebarOpen]);

  // Animated placeholder typing effect - only when no thread is selected and input is empty
  useEffect(() => {
    // Stop animation if input has text or a thread is selected
    if (input !== "" || selectedThreadId) {
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
  }, [selectedThreadId, currentPromptIndex, input]);

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
    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      setIsLoading(true);
      setError("");
      isSendingMessageRef.current = true; // Prevent loadMessages from being called

      // Create new thread first
      const headers = await getAuthHeaders();
      const createResponse = await fetch("/api/cases", {
        method: "POST",
        headers,
        body: JSON.stringify({ title: "Yeni Case" }),
        signal: abortController.signal,
      });

      if (!createResponse.ok) {
        throw new Error("Case oluşturulamadı");
      }

      const { thread } = await createResponse.json();
      
      // Add user message to UI immediately BEFORE setting selectedThreadId
      const userMessage: Message = {
        id: `temp-${Date.now()}`,
        role: "user",
        content: messageText,
        created_at: new Date().toISOString(),
      };
      setMessages([userMessage]);
      setInput("");
      
      // Set selected thread and show sidebar (this will trigger useEffect but isSendingMessageRef prevents loadMessages)
      setSelectedThreadId(thread.id);
      setSidebarOpen(true);
      
      // Update threads list optimistically
      const newThread: CaseThread = {
        id: thread.id,
        title: thread.title || "Yeni Case",
        created_at: thread.created_at || new Date().toISOString(),
        updated_at: thread.updated_at || new Date().toISOString(),
      };
      setThreads((prev) => [newThread, ...prev]);

      // Send message to API
      const chatResponse = await fetch("/api/chat", {
        method: "POST",
        headers,
        body: JSON.stringify({
          threadId: thread.id,
          message: messageText,
          isFirstMessage: true,
        }),
        signal: abortController.signal,
      });

      if (!chatResponse.ok) {
        const errorData = await chatResponse.json().catch(() => ({}));
        console.error("Chat API error response:", {
          status: chatResponse.status,
          statusText: chatResponse.statusText,
          errorData,
        });
        throw new Error(errorData.error || `Mesaj gönderilemedi (${chatResponse.status})`);
      }

      // Handle 204 No Content - response has no body
      if (chatResponse.status === 204) {
        console.warn("Received 204 No Content - API returned no body");
        throw new Error("Yanıt alınamadı. Lütfen tekrar deneyin.");
      }

      // Check if response has content before parsing
      const contentType = chatResponse.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Unexpected response type:", contentType);
        throw new Error("Geçersiz yanıt formatı. Lütfen tekrar deneyin.");
      }

      const chatData = await chatResponse.json();
      
      // Add assistant message to UI with animation
      const assistantMessage: Message = {
        id: chatData.message.id || `assistant-${Date.now()}`,
        role: "assistant",
        content: chatData.message.content,
        created_at: chatData.message.created_at || new Date().toISOString(),
      };
      
      setMessages([userMessage, assistantMessage]);

      // Update thread title if it was generated
      if (chatData.threadTitle) {
        setThreads((prev) =>
          prev.map((t) =>
            t.id === thread.id ? { ...t, title: chatData.threadTitle } : t
          )
        );
      }
    } catch (err: any) {
      console.error("Error sending first message:", err);
      if (err.name === 'AbortError') {
        setError("İstek iptal edildi");
        setMessages([]);
      } else {
        setError(err.message || "Mesaj gönderilemedi");
        setMessages([]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
      isSendingMessageRef.current = false; // Allow loadMessages to be called again
    }
  };

  const sendMessage = async (messageText: string, threadId: string, isFirstMessage: boolean) => {
    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

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
        signal: abortController.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Chat API error response:", {
          status: response.status,
          statusText: response.statusText,
          errorData,
        });
        throw new Error(errorData.error || `Mesaj gönderilemedi (${response.status})`);
      }

      // Handle 204 No Content - response has no body
      if (response.status === 204) {
        console.warn("Received 204 No Content - API returned no body");
        throw new Error("Yanıt alınamadı. Lütfen tekrar deneyin.");
      }

      // Check if response has content before parsing
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Unexpected response type:", contentType);
        throw new Error("Geçersiz yanıt formatı. Lütfen tekrar deneyin.");
      }

      const data = await response.json();
      
      // Add assistant message to UI with animation
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

      // Update thread title if it was generated (only for first message)
      if (isFirstMessage && data.threadTitle) {
        setThreads((prev) =>
          prev.map((t) =>
            t.id === threadId ? { ...t, title: data.threadTitle } : t
          )
        );
      }
    } catch (err: any) {
      console.error("Error sending message:", err);
      if (err.name === 'AbortError') {
        setError("İstek iptal edildi");
      } else {
        setError(err.message || "Mesaj gönderilemedi");
      }
      // Remove temp message on error
      setMessages((prev) => prev.filter((m) => !m.id.startsWith("temp")));
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const cancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
      setError("İstek iptal edildi");
      // Remove temp messages
      setMessages((prev) => prev.filter((m) => !m.id.startsWith("temp")));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const messageText = input.trim();

    // If no thread is selected (new case screen), always create a new thread
    if (!selectedThreadId) {
      await sendFirstMessage(messageText);
    } else if (selectedThreadId) {
      await sendMessage(messageText, selectedThreadId, false);
    }
  };

  const selectedThread = threads.find((t) => t.id === selectedThreadId);

  return (
    <>
      {/* Background - Only show animated background when no threads (empty state), otherwise normal black */}
      {!hasThreads && (
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
      )}

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
        {isLoadingThreads ? (
          /* Loading State */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#DEFF37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Case'ler yükleniyor...</p>
            </div>
          </div>
        ) : !selectedThread ? (
          /* New Chat Start Screen - No thread selected (sidebar may be visible) */
          <>
            <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
              <div className="max-w-3xl w-full">
                <div className="text-center mb-12">
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                    Portfolyon için bir case üretelim mi?
                  </h1>
                  <p className="text-gray-400 text-lg md:text-xl">
                    Fikrin olmasına gerek yok. İstersen sadece "bir case üret" yazman yeterli.
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
                    {isLoading ? (
                      <button
                        type="button"
                        onClick={cancelRequest}
                        className="px-8 py-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center shadow-lg"
                      >
                        Durdur
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!input.trim()}
                        className="px-8 py-4 bg-[#DEFF37] text-black font-semibold rounded-xl hover:bg-[#DEFF37]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </>
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
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div
                        className={`max-w-3xl ${
                          message.role === "user"
                            ? "bg-[#DEFF37] text-black"
                            : "bg-zinc-800 text-white"
                        } rounded-2xl px-5 py-4 transform transition-all duration-300 hover:scale-[1.02]`}
                      >
                        {message.role === "assistant" ? (
                          <div className="markdown-content">
                            <ReactMarkdown
                              className="prose prose-invert prose-sm max-w-none 
                                prose-headings:text-white prose-headings:font-bold prose-headings:mb-3 prose-headings:mt-4 prose-headings:leading-tight
                                prose-h1:text-2xl prose-h1:font-bold prose-h1:mb-4 prose-h1:mt-6
                                prose-h2:text-xl prose-h2:font-bold prose-h2:mb-3 prose-h2:mt-5
                                prose-h3:text-lg prose-h3:font-bold prose-h3:mb-2 prose-h3:mt-4
                                prose-p:text-gray-300 prose-p:font-normal prose-p:leading-relaxed prose-p:my-3 prose-p:first:mt-0 prose-p:last:mb-0
                                prose-strong:text-white prose-strong:font-bold
                                prose-ul:text-gray-300 prose-ul:my-3 prose-ul:space-y-2
                                prose-ol:text-gray-300 prose-ol:my-3 prose-ol:space-y-2
                                prose-li:text-gray-300 prose-li:leading-relaxed prose-li:my-1
                                prose-code:text-[#DEFF37] prose-code:font-mono prose-code:text-sm prose-code:bg-zinc-900/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                                prose-pre:bg-zinc-900 prose-pre:text-gray-300 prose-pre:my-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                                prose-hr:border-zinc-700 prose-hr:my-6
                                prose-blockquote:text-gray-400 prose-blockquote:border-l-[#DEFF37] prose-blockquote:pl-4 prose-blockquote:my-4"
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-zinc-800 text-white rounded-2xl px-5 py-4">
                        <div className="flex items-center gap-4">
                          {/* Icon with loading animation */}
                          <div className="relative flex-shrink-0 w-10 h-10 flex items-center justify-center">
                            {/* Outer rotating ring */}
                            <div className="absolute top-0 left-0 w-10 h-10 border-2 border-[#DEFF37]/30 border-t-[#DEFF37] rounded-full animate-spin"></div>
                            {/* Icon - centered */}
                            <svg
                              className="w-6 h-6 text-[#DEFF37] relative z-10"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                              />
                            </svg>
                          </div>

                          {/* Thinking steps animation */}
                          <div className="flex-1 min-h-[20px] flex items-center">
                            <ThinkingStepsAnimation />
                          </div>
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

            {/* Input Area - Sticky */}
            <div className="sticky bottom-0 p-4 border-t border-white/10 bg-black/95 backdrop-blur-md z-10">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={animatedPlaceholder || "Mesajınızı yazın..."}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#DEFF37]/50 focus:bg-black/30 transition-all disabled:opacity-50 shadow-lg"
                  />
                </div>
                {isLoading ? (
                  <button
                    type="button"
                    onClick={cancelRequest}
                    className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-lg"
                  >
                    Durdur
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="px-6 py-3 bg-[#DEFF37] text-black font-semibold rounded-xl hover:bg-[#DEFF37]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    Gönder
                  </button>
                )}
              </form>
            </div>
          </>
        )}
      </main>
      </div>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
}
