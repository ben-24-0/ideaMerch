import request from "./client.js";
import {
  setToken,
  clearToken,
} from "./token.js";

export async function login(email, password) {
  const { token } = await request("/admin/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  setToken(token);

  return token;
}

export function logout() {
  clearToken();
}