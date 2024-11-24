import { fetchAPI } from "./index";

export async function askAI(question: string, view: string): Promise<string> {
  const encodedQuestion = encodeURIComponent(question);
  const endpoint =
    view === "expenses"
      ? `/api/dragonAI/expenses?question=${encodedQuestion}`
      : `/api/dragonAI/?question=${encodedQuestion}`;
  return fetchAPI(endpoint, "POST");
}
