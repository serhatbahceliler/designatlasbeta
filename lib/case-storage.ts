const STORAGE_KEY = "case-atolyesi-data";

export interface StoredCaseThread {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface StoredMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

interface CaseStorage {
  threads: StoredCaseThread[];
  messagesByThread: Record<string, StoredMessage[]>;
}

function emptyStorage(): CaseStorage {
  return { threads: [], messagesByThread: {} };
}

export function loadCaseStorage(): CaseStorage {
  if (typeof window === "undefined") return emptyStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStorage();
    const parsed = JSON.parse(raw);
    return {
      threads: Array.isArray(parsed.threads) ? parsed.threads : [],
      messagesByThread:
        parsed.messagesByThread && typeof parsed.messagesByThread === "object"
          ? parsed.messagesByThread
          : {},
    };
  } catch {
    return emptyStorage();
  }
}

export function saveCaseStorage(data: CaseStorage) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save case storage:", error);
  }
}

export function createLocalThreadId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `thread-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
