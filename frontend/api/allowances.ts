import { fetchAPI } from "./index";

export async function updateAllowance(
  allowanceId: number,
  amount: number,
  action: "add" | "subtract"
) {
  return fetchAPI(
    `/api/allowances/${allowanceId}/${action}`,
    "PATCH",
    undefined,
    { amount }
  );
}

export async function getAllowance() {
  return fetchAPI("/api/allowances/1", "GET");
}
