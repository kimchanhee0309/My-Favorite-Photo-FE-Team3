const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiClient(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "API 요청에 실패했습니다.");
    error.code = data.code;
    error.status = response.status;
    throw error;
  }

  return data;
}
