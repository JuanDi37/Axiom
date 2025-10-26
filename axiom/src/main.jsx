// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";

// Páginas
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Chat from "./pages/Chat.jsx";

// Estilos globales (incluye el diseño tipo Gemini)
import "./styles/globals.css";

// Tabla de rutas internas
const routes = {
  "/": Landing,
  "/login": Login,
  "/register": Register,
  "/chat": Chat,
};

// Monta el componente actual según la ruta
function mount() {
  const Component = routes[window.location.pathname] || Landing;

  // Fade-in simple al cambiar de página
  const root = document.getElementById("root");
  root.classList.add("fade-enter");
  ReactDOM.createRoot(root).render(<Component />);
  setTimeout(() => root.classList.remove("fade-enter"), 200);
}

// Intercepta clics en enlaces internos para navegación SPA
document.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;

  const url = new URL(a.getAttribute("href", 2) || a.href, window.location.origin);
  const isInternal = url.origin === window.location.origin && url.pathname in routes;

  if (
    isInternal &&
    !a.hasAttribute("download") &&
    a.target !== "_blank" &&
    !e.metaKey &&
    !e.ctrlKey
  ) {
    e.preventDefault();
    history.pushState({}, "", url.pathname);
    mount();
  }
});

// Escucha los eventos de historial (botones de navegación del navegador)
window.addEventListener("popstate", mount);

// Monta la app al cargar
mount();
