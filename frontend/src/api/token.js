export function getToken() {
  return localStorage.getItem("adminToken");
}

export function setToken(token) {
  localStorage.setItem("adminToken", token);
}

export function clearToken() {
  localStorage.removeItem("adminToken");
}