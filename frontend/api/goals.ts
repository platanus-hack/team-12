import { fetchAPI } from "./index";

export interface Goal {
  id: number;
  name: string;
  reward: number;
  description: string;
  unlocked: boolean;
  image: string;
}

export async function getGoals(): Promise<Goal[]> {
  return fetchAPI("/api/goals/", "GET");
}
