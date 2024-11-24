import { fetchAPI } from "./index";

export async function updateExperience(
  userId: number,
  amount: number,
  action: "add" | "subtract"
) {
  return fetchAPI(
    `/api/users/${userId}/experience/${action}`,
    "PATCH",
    undefined,
    {
      amount,
    }
  );
}
