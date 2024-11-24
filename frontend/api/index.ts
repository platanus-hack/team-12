const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function fetchAPI(
  endpoint: string,
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
  headers: HeadersInit = { Accept: "application/json" },
  body: Record<string, any> | null = null
) {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`${method} request failed:`, errorData);
      throw new Error(`${method} request failed!`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in fetchAPI (${method} ${endpoint}):`, error);
    throw error;
  }
}
