// server/index.js  (ESM)
import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { fileURLToPath } from "url";

// __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- DB: crea /data y app.db si no existen
const DB_PATH = path.join(process.cwd(), "data", "app.db");
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const db = new Database(DB_PATH);

// WAL puede fallar en Docker sobre Windows/NFS. Usamos DELETE por defecto y
// permitimos override con SQLITE_JOURNAL_MODE (WAL/DELETE/TRUNCATE...).
const requestedMode = (process.env.SQLITE_JOURNAL_MODE || "DELETE").toUpperCase();
try {
  const r = db.pragma(`journal_mode = ${requestedMode}`, { simple: true });
  console.log("SQLite journal_mode =>", r);
} catch (e) {
  console.warn(`No se pudo activar ${requestedMode}; usando DELETE. Motivo:`, e?.code || e?.message);
  db.pragma("journal_mode = DELETE");
}

// Esquema mínimo
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);
`);

// --- App
const app = express();
const PORT = Number(process.env.PORT) || 4000;

// CORS (simple): funciona tanto en dev como detrás de Nginx en prod
app.use(cors());
app.use(express.json());

// Schemas
const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// --- Rutas
app.post("/api/auth/register", (req, res) => {
  const parse = registerSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: "Datos inválidos" });

  const { name, email, password } = parse.data;

  const exists = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (exists) return res.status(409).json({ error: "Email ya registrado" });

  const hash = bcrypt.hashSync(password, 10);
  db.prepare(
    `INSERT INTO users (name, email, password_hash, created_at)
     VALUES (?, ?, ?, ?)`
  ).run(name, email, hash, new Date().toISOString());

  return res.status(201).json({ ok: true });
});

app.post("/api/auth/login", (req, res) => {
  const parse = loginSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: "Datos inválidos" });

  const { email, password } = parse.data;

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user) return res.status(401).json({ error: "Credenciales incorrectas" });

  const ok = bcrypt.compareSync(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: "Credenciales incorrectas" });

  // Minimal: sin JWT (se puede agregar después)
  return res.json({ ok: true, user: { id: user.id, name: user.name, email: user.email } });
});

// --- Chat (stub temporal)
app.post("/api/chat", (req, res) => {
  const { message } = req.body || {};
  const reply =
    `Entendido: “${message}”. ` +
    `Cuando integres tu biblioteca, te devolveré un resumen con citas exactas y fecha de vigencia.`;
  const citations = [
    { title: "Decreto 17-73 (CP Guatemala)", loc: "Art. 12" },
    { title: "Constitución Política de la República", loc: "Art. 154" },
  ];
  res.json({ reply, citations });
});

// Salud
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Debug: contar usuarios
app.get("/api/debug/users", (_req, res) => {
  try {
    const row = db.prepare("SELECT COUNT(*) AS count FROM users").get();
    res.json({ ok: true, count: row.count, db: DB_PATH });
  } catch (e) {
    res.status(500).json({ ok: false, error: e?.message || String(e) });
  }
});

app.listen(PORT, () => {
  console.log("API escuchando en http://localhost:" + PORT);
  console.log("SQLite listo en:", DB_PATH);
});
