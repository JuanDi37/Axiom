// server/ingest.js
// Script para ingerir documentos legales en SQLite como documentos + chunks

import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";

// __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta a la base de datos (misma que usa index.js)
const DB_PATH = path.join(process.cwd(), "data", "app.db");
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const db = new Database(DB_PATH);

// Creamos tablas para documentos y chunks (si no existen)
db.exec(`
CREATE TABLE IF NOT EXISTS documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  path TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS chunks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id INTEGER NOT NULL,
  chunk_index INTEGER NOT NULL,
  content TEXT NOT NULL,
  FOREIGN KEY (document_id) REFERENCES documents(id)
);
`);

// Función sencilla para trocear texto en bloques de tamaño máximo (caracteres)
function chunkText(text, maxLen = 800) {
  const paragraphs = text
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n+/)       // separa en párrafos vacíos
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks = [];
  let current = "";

  for (const p of paragraphs) {
    // Si el párrafo cabe en el chunk actual, lo agregamos
    if ((current + "\n\n" + p).length <= maxLen) {
      current = current ? current + "\n\n" + p : p;
    } else {
      // Si el chunk actual tiene algo, lo guardamos
      if (current) chunks.push(current);
      // Si el párrafo es demasiado grande por sí solo, lo cortamos bruto
      if (p.length > maxLen) {
        for (let i = 0; i < p.length; i += maxLen) {
          chunks.push(p.slice(i, i + maxLen));
        }
        current = "";
      } else {
        current = p;
      }
    }
  }

  if (current) chunks.push(current);
  return chunks;
}

function main() {
  const docsDir = path.join(process.cwd(), "data", "legal_docs");
  fs.mkdirSync(docsDir, { recursive: true });

  const files = fs
    .readdirSync(docsDir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.toLowerCase().endsWith(".txt"))
    .map((d) => d.name);

  if (!files.length) {
    console.log("No se encontraron .txt en", docsDir);
    process.exit(0);
  }

  console.log("Usando base de datos:", DB_PATH);
  console.log("Ingeriendo archivos desde:", docsDir);
  console.log("Archivos encontrados:", files);

  const insertDoc = db.prepare(`
    INSERT INTO documents (title, path, created_at)
    VALUES (?, ?, ?)
  `);

  const insertChunk = db.prepare(`
    INSERT INTO chunks (document_id, chunk_index, content)
    VALUES (?, ?, ?)
  `);

  let totalDocs = 0;
  let totalChunks = 0;

  for (const fileName of files) {
    const fullPath = path.join(docsDir, fileName);
    const raw = fs.readFileSync(fullPath, "utf8");
    const text = raw.replace(/\r\n/g, "\n").trim();
    if (!text) {
      console.log(`- ${fileName}: vacío, se omite.`);
      continue;
    }

    const title = fileName.replace(/\.txt$/i, "");
    const createdAt = new Date().toISOString();

    const docResult = insertDoc.run(title, fullPath, createdAt);
    const docId = docResult.lastInsertRowid;

    const chunks = chunkText(text, 800);

    chunks.forEach((chunk, idx) => {
      insertChunk.run(docId, idx, chunk);
    });

    console.log(`- ${fileName}: ${chunks.length} chunks guardados (document_id=${docId})`);
    totalDocs += 1;
    totalChunks += chunks.length;
  }

  console.log("\nResumen ingestión:");
  console.log("Documentos nuevos:", totalDocs);
  console.log("Chunks creados:", totalChunks);
}

main();
