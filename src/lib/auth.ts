/* ===== Auth Module — Login/logout logic ===== */

let isAuthenticated = false;
let listeners: Array<() => void> = [];

const notify = () => listeners.forEach((l) => l());

export const AUTH_CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

export const login = (username: string, password: string): boolean => {
  if (username === AUTH_CREDENTIALS.username && password === AUTH_CREDENTIALS.password) {
    isAuthenticated = true;
    localStorage.setItem("iv_auth", "true");
    notify();
    return true;
  }
  return false;
};

export const logout = () => {
  isAuthenticated = false;
  localStorage.removeItem("iv_auth");
  notify();
};

export const checkAuth = (): boolean => {
  if (!isAuthenticated) {
    isAuthenticated = localStorage.getItem("iv_auth") === "true";
  }
  return isAuthenticated;
};

export const subscribe = (listener: () => void) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};
