import { fetchAPI } from "./index";

export async function getMissions() {
  return fetchAPI("/api/missions/", "GET");
}

export async function switchMissionStatus(id: number) {
  return fetchAPI(`/api/missions/${id}/switch-status`, "PATCH");
}

export async function updateMissionStatus(id: number, status: string) {
  return fetchAPI(`/api/missions/${id}/`, "PATCH", undefined, { status });
}
