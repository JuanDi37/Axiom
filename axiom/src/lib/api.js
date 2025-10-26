// src/lib/api.js
const BASE =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE) ||
  "/api";

async function request(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {}

  if (!res.ok) {
    const msg = data?.error || `${res.status} ${res.statusText}`;
    throw new Error(msg);
  }
  return data;
}

export const Auth = {
  register: (payload) => request("POST", "/auth/register", payload),
  login: (payload) => request("POST", "/auth/login", payload),
};

// Nota: /chat aún puede no existir en el backend; esto es un stub/cliente.
export const ChatAPI = {
  ask: (message) => request("POST", "/chat", { message }),
};

// Alias para mantener compatibilidad con `import { Chat as API } from "../lib/api";`
export const Chat = ChatAPI;

export const Debug = {
  users: () => request("GET", "/debug/users"),
};
