// src/pages/Landing.jsx
import Hyperspeed from "../components/Hyperspeed.jsx";
import { effectOptions } from "../components/effectOptions.cool.js";

/**
 * Landing.jsx — Axiom
 * - Hero con 2 CTAs (Registrar / Ingresar)
 * - Fondo Hyperspeed a full-bleed detrás
 * - Secciones: Cómo funciona, Intencionalidad y Tecnología
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
          Respuestas <span className="text-metal">verificadas</span> en derecho
        </h1>

        <p className="hero-sub measure">
          Asistente jurídico para Guatemala que responde en lenguaje natural y
          muestra fragmentos exactos de normas y criterios relevantes.
        </p>

        <div className="actions">
          <a className="button-primary" href="/register">
            Registrar
          </a>
          <a className="button-ghost" href="/login">
            Ingresar
          </a>
        </div>
      </header>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="section">
        <div className="container-xl">
          <h2>¿Cómo funciona?</h2>
          <ol className="steps">
            <li className="step">
              <div className="step-num">1</div>
              <h3>Formula tu consulta jurídica</h3>
              <p>
                Escribe la duda en lenguaje natural. Puedes referirte a temas,
                instituciones, artículos o situaciones concretas.
              </p>
              <p>
                Axiom interpreta la consulta y la traduce a búsquedas dentro de
                su base de normas de Guatemala.
              </p>
            </li>
            <li className="step">
              <div className="step-num">2</div>
              <h3>Búsqueda en la base normativa</h3>
              <p>
                El sistema recorre un corpus curado de leyes, reglamentos y otros
                textos legales. Selecciona los pasajes con mayor relevancia.
              </p>
              <p>
                A partir de esos fragmentos arma una respuesta estructurada y
                conectada con el marco normativo aplicable.
              </p>
            </li>
            <li className="step">
              <div className="step-num">3</div>
              <h3>Respuesta con citas verificables</h3>
              <p>
                Cada oración exige soporte documental. Axiom muestra fuente,
                artículo, párrafo y fecha de publicación o reforma.
              </p>
              <p>
                Si no encuentra apoyo suficiente para afirmar algo, lo indica de
                forma clara antes de completar la respuesta.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* INTENCIONALIDAD */}
      <section id="intencionalidad" className="section section-alt">
        <div className="container-xl">
          <h2>Intencionalidad</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <h3>Para quién está pensado</h3>
              <p>
                Dirigido a personas y equipos legales que necesitan revisar el
                marco normativo de Guatemala con rapidez y trazabilidad.
              </p>
              <p>
                Diseñado para apoyar investigación y borradores, manteniendo
                siempre visible la base legal de cada afirmación.
              </p>
            </div>
            <div className="tech-card">
              <h3>Qué busca lograr</h3>
              <p>
                Reducir tiempo en búsquedas dispersas y lecturas repetidas de
                las mismas normas.
              </p>
              <p>
                Poner en un mismo lugar la respuesta en lenguaje natural y los
                fragmentos concretos en que se apoya.
              </p>
            </div>
            <div className="tech-card">
              <h3>Qué límites tiene</h3>
              <p>
                No sustituye el criterio jurídico ni la revisión detallada de la
                norma. Es una herramienta de apoyo a la persona profesional.
              </p>
              <p>
                Se limita al corpus normativo integrado en el sistema y no
                navega en internet ni consulta fuentes externas en tiempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECNOLOGÍA */}
      <section id="tecnologia" className="section">
        <div className="container-xl">
          <h2>Tecnología</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <h3>Frontend</h3>
              <p>
                Aplicación web en React + Vite con interfaz de chat minimalista.
                La conversación se muestra junto a las citas jurídicas usadas.
              </p>
              <p>
                Fondo Hyperspeed, tipografía clara y contraste pensado para
                sesiones de trabajo largas.
              </p>
            </div>
            <div className="tech-card">
              <h3>Backend local</h3>
              <p>
                API en Node/Express que gestiona registro, inicio de sesión y
                envío de consultas al modelo.
              </p>
              <p>
                Usa SQLite para almacenar usuarios, historial y referencias al
                corpus normativo que alimenta las respuestas.
              </p>
            </div>
            <div className="tech-card">
              <h3>Motor LLM (Ollama)</h3>
              <p>
                Modelo de lenguaje ejecutado de forma local mediante Ollama
                (<code>llama3.2</code>). Recibe la pregunta y el contexto legal
                relevante.
              </p>
              <p>
                Configurado para priorizar claridad, citas explícitas y reducción
                de respuestas sin sustento.
              </p>
            </div>
            <div className="tech-card">
              <h3>Corpus jurídico</h3>
              <p>
                Conjunto de normas, reglamentos y textos legales de Guatemala
                integrados en el sistema y normalizados para consulta rápida.
              </p>
              <p>
                Los contenidos se estructuran en fragmentos para facilitar la
                recuperación y la trazabilidad de cada cita.
              </p>
            </div>
            <div className="tech-card">
              <h3>Base de datos</h3>
              <p>
                SQLite como base relacional para usuarios, credenciales con hash
                y registro de consultas.
              </p>
              <p>
                Permite seguir qué normas se usaron con mayor frecuencia y cómo
                se apoyan las respuestas en el corpus.
              </p>
            </div>
            <div className="tech-card">
              <h3>Experiencia confiable</h3>
              <p>
                La interfaz evita respuestas opacas. Cada sección de texto puede
                vincularse a su fragmento legal correspondiente.
              </p>
              <p>
                Cuando el sistema no está seguro, lo declara y anima a revisar
                directamente la norma relacionada.
              </p>
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
