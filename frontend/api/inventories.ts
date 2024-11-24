import { fetchAPI } from "./index";

export async function getInventory() {
  return fetchAPI("/api/inventories/inventories", "GET");
}
