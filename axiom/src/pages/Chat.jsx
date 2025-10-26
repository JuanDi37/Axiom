import { useEffect, useRef, useState } from "react";
import { ChatAPI } from "../lib/api";

export default function Chat() {
  const [user] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      return u?.name ? u : { name: "Usuario" };
    } catch {
      return { name: "Usuario" };
    }
  });

  const [msgs, setMsgs] = useState([
    {
      id: "hello",
      role: "assistant",
      text: "¡Hola! Soy Axiom. Pregúntame algo y, cuando cargues tu biblioteca, te responderé con citas verificables.",
      citations: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, sending]);

  const quick = [
    "¿Requisitos para constituir una sociedad anónima?",
    "¿Qué dice el artículo 154 de la Constitución?",
    "¿Plazo para apelar en proceso civil?",
    "¿Prescripción de multas administrativas?",
  ];

  async function send() {
    const text = input.trim();
    if (!text || sending) return;

    const myMsg = { id: crypto.randomUUID(), role: "user", text };
    setMsgs((m) => [...m, myMsg]);
    setInput("");
    setSending(true);

    try {
      const data = await ChatAPI.ask(text);
      const bot = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: data?.reply || "Ok.",
        citations: data?.citations || [],
      };
      setMsgs((m) => [...m, bot]);
    } catch (e) {
      setMsgs((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: `Hubo un error: ${e.message}`,
          citations: [],
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  function onKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="chat-shell">
      {/* Header limpio */}
      <header className="chat-topbar minimal">
        <h1 className="brand-slim">Axiom</h1>
        <nav className="top-actions">
          <span className="hello">Hola, <strong>{user.name}</strong></span>
          <a className="link-exit" href="/logout">Salir</a>
        </nav>
      </header>

      {/* Contenido */}
      <main className="chat-pane">
        <div className="pane-head">
          <h2 className="chat-title">Chat</h2>
          <div className="chips">
            {quick.map((q) => (
              <button key={q} className="chip" onClick={() => setInput(q)}>
                {q}
              </button>
            ))}
          </div>
        </div>

        <ul className="msgs">
          {msgs.map((m) => (
            <li key={m.id} className={`row ${m.role}`}>
              <div className="bubble clean">
                {m.text.split("\n").map((p, i) => <p key={i}>{p}</p>)}
                {!!m.citations?.length && (
                  <div className="meta-line">
                    {m.citations.map((c, i) => (
                      <span className="source-chip" key={i}>
                        {c.title} — {c.loc}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}

          {sending && (
            <li className="row assistant">
              <div className="bubble typing">
                <span className="dot" /><span className="dot" /><span className="dot" />
              </div>
            </li>
          )}
          <div ref={endRef} />
        </ul>

        <div className="composer sleek">
          <div className={`composer-inner ${sending ? "is-sending" : ""}`}>
            <textarea
              className="composer-input"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Escribe tu pregunta legal..."
            />
            <button
              className="send-btn"
              onClick={send}
              disabled={!input.trim() || sending}
              aria-label="Enviar"
            >
              {sending ? (
                <svg className="spin" width="18" height="18" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2a1 1..." />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="currentColor" d="m3.4 20.4..." />
                </svg>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
