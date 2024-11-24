import { fetchAPI } from "./index";

export async function getExpenses() {
  return fetchAPI("/api/expenses/1", "GET");
}
