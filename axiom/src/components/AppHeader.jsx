// src/components/AppHeader.jsx
export default function AppHeader({ user }) {
  return (
    <header className="site-header" role="banner">
      <a href="/" className="brand-metal" aria-label="Axiom">Axiom</a>

      <nav className="site-nav" aria-label="Navegación principal">
        <a href="/#tecnologia" className="site-link">Tecnología</a>
        <a href="/login" className="site-link">Salir</a>
        <span className="site-user">Hola, <strong>{user?.name || "invitado"}</strong></span>
      </nav>
    </header>
  );
}