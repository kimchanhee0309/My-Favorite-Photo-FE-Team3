import { apiClient } from "@/common/api/client";

export function signupApi(data) {
  return apiClient("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function loginApi(data) {
  return apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function logoutApi() {
  return apiClient("/auth/logout", {
    method: "POST",
  });
}

export function getMeApi() {
  return apiClient("/auth/me", {
    method: "GET",
  });
}
