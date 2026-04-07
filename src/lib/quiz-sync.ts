import { QuizResult } from "@/types";

// Fetch a single quiz result by ID from the database
export async function fetchQuizResultById(resultId: string): Promise<QuizResult | null> {
  try {
    // First try the authenticated endpoint
    const response = await fetch(`/api/quiz-results?id=${resultId}`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      if (data.result) {
        return data.result;
      }
    }

    // Fallback to public endpoint (for post-confirmation redirect when no session yet)
    const publicResponse = await fetch(`/api/quiz-results-public?id=${resultId}`, {
      method: "GET",
    });

    if (publicResponse.ok) {
      const publicData = await publicResponse.json();
      return publicData.result || null;
    }

    return null;
  } catch (error) {
    console.error("Error fetching quiz result by ID:", error);
    return null;
  }
}

// Get a quiz result from the database
export async function getQuizResult(resultId: string): Promise<QuizResult | null> {
  return fetchQuizResultById(resultId);
}

// Fetch all quiz results for the current user from the database
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

// Get all quiz results from database (replaces sync function)
export async function syncQuizResults(): Promise<QuizResult[]> {
  return fetchQuizResultsFromDB();
}
