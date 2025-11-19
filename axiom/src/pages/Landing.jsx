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
          muestra fragmentos exactos de normas y documentos relevantes.
        </p>

        <p className="hero-meta measure">
          Procesa tus archivos en tu propia biblioteca y usa un modelo local
          vía Ollama. La información no se envía a servicios externos.
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
              <h3>Carga tus normas y documentos</h3>
              <p>
                Sube leyes, reglamentos, criterios y opiniones en texto o
                PDF/DOC. Axiom los organiza por país, tema y <em>vigencia</em>,
                los trocea en fragmentos y los indexa para búsqueda jurídica
                precisa.
              </p>
            </li>
            <li className="step">
              <div className="step-num">2</div>
              <h3>Haz tu pregunta en lenguaje natural</h3>
              <p>
                Plantea tu consulta tal como la formularías a otra persona. El
                motor busca en tu biblioteca, elige los pasajes relevantes y
                responde <strong>frase por frase con cita</strong>.
              </p>
            </li>
            <li className="step">
              <div className="step-num">3</div>
              <h3>Verificación y transparencia</h3>
              <p>
                Cada oración exige soporte documental. Si no hay apoyo suficiente,
                Axiom lo indica con claridad. Cuando sí lo hay, muestra fuente,
                párrafo, numeración de artículos y fecha de publicación o reforma
                para confirmar la <em>vigencia</em>.
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
                Orientado a abogadas, abogados y equipos legales que necesitan
                revisar normas con rapidez sin perder trazabilidad.
              </p>
              <p>
                Busca complementar el análisis humano, no reemplazar el criterio
                profesional ni la revisión detallada de la norma.
              </p>
            </div>
            <div className="tech-card">
              <h3>Qué busca lograr</h3>
              <p>
                Reducir tiempo en búsquedas manuales. Facilitar que cada respuesta
                esté acompañada de citas y fragmentos verificables.
              </p>
              <p>
                Hacer evidente la vigencia de lo citado y la procedencia de cada
                pasaje para respaldar informes, correos y borradores.
              </p>
            </div>
            <div className="tech-card">
              <h3>Qué no hace</h3>
              <p>
                No sustituye interpretación jurídica, ni emite dictámenes ni
                opiniones profesionales. Es una herramienta de apoyo.
              </p>
              <p>
                No conecta con fuentes en línea de forma automática. Trabaja con
                los documentos que tú decides cargar.
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
                Muestra la conversación y las citas jurídicas asociadas.
              </p>
              <p>
                Fondo Hyperspeed optimizado, tipografía clara y contraste
                accesible para uso prolongado.
              </p>
            </div>
            <div className="tech-card">
              <h3>Backend local</h3>
              <p>
                API en Node/Express que gestiona registro, inicio de sesión y
                consultas al modelo. Trabaja con SQLite para documentos e historial.
              </p>
              <p>
                Todo el procesamiento se realiza en tu entorno local, sin depender
                de servicios SaaS externos.
              </p>
            </div>
            <div className="tech-card">
              <h3>Motor LLM (Ollama)</h3>
              <p>
                Modelo de lenguaje ejecutado en tu máquina mediante Ollama
                (<code>llama3.2</code>). El backend envía la pregunta y el contexto legal.
              </p>
              <p>
                La configuración está orientada a reducir alucinaciones y a exigir
                respaldo documental para cada afirmación.
              </p>
            </div>
            <div className="tech-card">
              <h3>PDFs y textos difíciles</h3>
              <p>
                Pipeline de ingesta que transforma documentos en fragmentos
                coherentes y aplica extracción robusta, con OCR cuando se necesita.
              </p>
              <p>
                Preserva numeración de artículos, encabezados y contexto para
                facilitar la trazabilidad de cada cita.
              </p>
            </div>
            <div className="tech-card">
              <h3>Base de datos</h3>
              <p>
                SQLite como base relacional para usuarios, credenciales con hash,
                documentos legales e historial de consultas.
              </p>
              <p>
                Tablas especializadas para documentos y <em>chunks</em> permiten
                búsquedas rápidas y reconstrucción de contexto.
              </p>
            </div>
            <div className="tech-card">
              <h3>Experiencia confiable</h3>
              <p>
                Cada respuesta se acompaña de fragmentos originales y metadatos
                esenciales. La interfaz evita respuestas sin sustento jurídico.
              </p>
              <p>
                Cuando no hay base suficiente, el sistema lo indica de forma directa
                en lugar de completar contenido inventado.
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
