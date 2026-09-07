import { getToken } from "./token.js";

const BASE_URL = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? { Authorization: `Bearer ${token}` }
        : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      body.error || `Request failed: ${res.status}`
    );
  }

  if (res.status === 204) return null;

  return res.json();
}

export default request;