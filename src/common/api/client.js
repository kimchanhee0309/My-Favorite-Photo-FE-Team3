const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiClient(path, options = {}) {
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...options.headers,
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(data?.message || "API 요청에 실패했습니다.");
    error.code = data?.code;
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
