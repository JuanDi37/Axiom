// server/rag.js
// Versión simple: devuelve los primeros K chunks almacenados (sin scoring por ahora)

import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";

// __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Misma ruta de DB que en index.js e ingest.js
const DB_PATH = path.join(process.cwd(), "data", "app.db");
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

// Conexión única para este módulo
const db = new Database(DB_PATH);

/**
 * Versión ultra-sencilla:
 * - Ignora la pregunta
 * - Devuelve hasta K chunks en orden (como contexto "global")
 */
export function findRelevantChunks(_question, k = 5) {
  const rows = db
    .prepare(
      `
      SELECT
        c.id,
        c.document_id,
        c.chunk_index,
        c.content,
        d.title AS document_title
      FROM chunks c
      JOIN documents d ON d.id = c.document_id
      ORDER BY c.document_id ASC, c.chunk_index ASC
    `
    )
    .all();

  console.log("[RAG] Total chunks en DB:", rows.length);

  const top = rows.slice(0, k);

  console.log(
    "[RAG] Devolviendo",
    top.length,
    "chunks como contexto."
  );

  return top;
}
