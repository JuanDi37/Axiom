// src/pages/Landing.jsx
import Hyperspeed from "../components/Hyperspeed.jsx";
import { effectOptions } from "../components/effectOptions.cool.js";

/**
 * Landing.jsx — Axiom
 * - Hero con 2 CTAs (Registrar / Ingresar)
 * - Fondo Hyperspeed a full-bleed detrás
 * - Secciones: Cómo funciona (3 pasos) y Tecnología
 * - Sin CTA repetido y sin botones/enlaces en el footer
 */
export default function Landing() {
  return (
    <main className="ax-main">
      {/* Fondo a borde completo */}
      <div id="bg-wrap" className="full-bleed">
        <Hyperspeed effectOptions={effectOptions} />
        <div className="bg-scrim" />
      </div>

      {/* HERO (contenedor XL para 1920px) */}
      <header className="hero container-xl">
        <div className="brand">Axiom</div>

        <h1 className="hero-title measure">
          Respuestas legales <span className="text-metal">verificadas</span>
        </h1>

        <p className="hero-sub measure">
          Para Guatemala. Muestra fragmentos exactos y fecha de vigencia; si no hay sustento, te lo dice.
        </p>

        <div className="actions">
          <a className="button-primary" href="/register">Registrar</a>
          <a className="button-ghost" href="/login">Ingresar</a>
        </div>
      </header>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="section">
        <div className="container-xl">
          <h2>¿Cómo funciona?</h2>
          <ol className="steps">
            <li className="step">
              <div className="step-num">1</div>
              <h3>Carga tus normas y documentos</h3>
              <p>
                Organiza por país, tema y <em>vigencia</em>. El sistema indexa PDF/DOC y
                extrae texto incluso de archivos difíciles.
              </p>
            </li>
            <li className="step">
              <div className="step-num">2</div>
              <h3>Haz tu pregunta</h3>
              <p>
                El motor busca en tu biblioteca y responde <strong>frase por frase con cita</strong> y
                fragmento exacto.
              </p>
            </li>
            <li className="step">
              <div className="step-num">3</div>
              <h3>Verificación y transparencia</h3>
              <p>
                Si no hay apoyo suficiente, lo indica. Cuando sí, muestra la fuente, párrafo y fecha de
                publicación/reforma.
              </p>
            </li>
          </ol>

          {/* ⬇️ Eliminado: CTA duplicado */}
          {/* <div className="actions actions-inline">
            <a className="button-primary" href="/register">Crear cuenta</a>
            <a className="button-ghost" href="/login">Ingresar</a>
          </div> */}
        </div>
      </section>

      {/* TECNOLOGÍA */}
      <section id="tecnologia" className="section">
        <div className="container-xl">
          <h2>Tecnología</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <h3>Frontend</h3>
              <p>React + Vite. Interfaz limpia con resultados y citas. Fondo Hyperspeed optimizado y contraste accesible.</p>
            </div>
            <div className="tech-card">
              <h3>Backend local</h3>
              <p>Servicio que recibe la pregunta, recupera pasajes y arma la respuesta con verificación y control de alucinaciones.</p>
            </div>
            <div className="tech-card">
              <h3>Citas y vigencia</h3>
              <p>Cada oración exige cita. Índices por país y fecha (publicación/reforma) para priorizar normas vigentes.</p>
            </div>
            <div className="tech-card">
              <h3>PDFs difíciles</h3>
              <p>Extracción robusta (OCR cuando se requiera) y normalización para mantener numeración de artículos y contexto.</p>
            </div>
            <div className="tech-card">
              <h3>Base de datos</h3>
              <p>Relacional para usuarios, contraseñas (hash + salt) e historial de consultas y fuentes.</p>
            </div>
            <div className="tech-card">
              <h3>Experiencia confiable</h3>
              <p>Si no hay sustento, se muestra claramente. Cuando lo hay, el fragmento exacto aparece con un clic.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer limpio, sin enlaces/botones */}
      <footer className="container-xl footer">
        <div className="brand">Axiom</div>
      </footer>
    </main>
  );
}
