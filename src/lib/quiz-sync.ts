import { QuizResult } from "@/types";

// Fetch a single quiz result by ID from the database
export async function fetchQuizResultById(resultId: string): Promise<QuizResult | null> {
  try {
    const response = await fetch(`/api/quiz-results?id=${resultId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.result || null;
  } catch (error) {
    console.error("Error fetching quiz result by ID:", error);
    return null;
  }
}

// Get a quiz result - checks localStorage first, then database
export async function getQuizResult(resultId: string): Promise<QuizResult | null> {
  // Try localStorage first
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(`quiz_result_${resultId}`);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Error parsing localStorage result:", e);
      }
    }
  }

  // If not in localStorage, try database
  const dbResult = await fetchQuizResultById(resultId);

  // If found in database, save to localStorage for future use
  if (dbResult && typeof window !== "undefined") {
    localStorage.setItem(`quiz_result_${resultId}`, JSON.stringify(dbResult));
  }

  return dbResult;
}

// Fetch quiz results from the database
export async function fetchQuizResultsFromDB(): Promise<QuizResult[]> {
  try {
    const response = await fetch("/api/quiz-results", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to fetch quiz results from DB");
      return [];
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    return [];
  }
}

// Save quiz results to the database
export async function saveQuizResultsToDB(results: QuizResult[]): Promise<boolean> {
  try {
    const response = await fetch("/api/quiz-results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ results }),
    });

    if (!response.ok) {
      console.error("Failed to save quiz results to DB");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error saving quiz results:", error);
    return false;
  }
}

// Get all quiz results from localStorage
export function getLocalStorageResults(): QuizResult[] {
  if (typeof window === "undefined") return [];

  const results: QuizResult[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("quiz_result_")) {
      const result = localStorage.getItem(key);
      if (result) {
        try {
          results.push(JSON.parse(result));
        } catch (e) {
          console.error("Error parsing localStorage result:", e);
        }
      }
    }
  }
  return results;
}

// Save a single result to localStorage
export function saveToLocalStorage(result: QuizResult): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`quiz_result_${result.id}`, JSON.stringify(result));
}

// Merge database and localStorage results (DB takes precedence for duplicates)
export function mergeResults(dbResults: QuizResult[], localResults: QuizResult[]): QuizResult[] {
  const resultMap = new Map<string, QuizResult>();

  // Add local results first
  for (const result of localResults) {
    resultMap.set(result.id, result);
  }

  // DB results overwrite local (they're authoritative)
  for (const result of dbResults) {
    resultMap.set(result.id, result);
  }

  // Convert to array and sort by date (newest first)
  return Array.from(resultMap.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// Sync localStorage results to database and return merged results
export async function syncQuizResults(): Promise<QuizResult[]> {
  // Get results from both sources
  const [dbResults, localResults] = await Promise.all([
    fetchQuizResultsFromDB(),
    Promise.resolve(getLocalStorageResults()),
  ]);

  // Find results that exist locally but not in DB
  const dbIds = new Set(dbResults.map(r => r.id));
  const resultsToSync = localResults.filter(r => !dbIds.has(r.id));

  // Sync local-only results to database
  if (resultsToSync.length > 0) {
    await saveQuizResultsToDB(resultsToSync);
  }

  // Also save DB results to localStorage for offline access
  for (const result of dbResults) {
    saveToLocalStorage(result);
  }

  // Return merged results
  return mergeResults(dbResults, localResults);
}
