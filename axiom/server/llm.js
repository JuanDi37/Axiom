// server/llm.js
// Wrapper sencillo para hablar con Ollama desde el backend Node

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";

/**
 * Llama al modelo de Ollama con una pregunta en español.
 * Más adelante podremos pasarle `context` (para RAG).
 */
export async function askLLM(question, { context } = {}) {
  if (!question || typeof question !== "string") {
    throw new Error("Pregunta inválida");
  }

  const promptParts = [
    "Eres un asistente jurídico que responde en español.",
    "Responde de forma clara y concisa.",
    "Si no tienes suficiente información para responder con certeza, dilo explícitamente.",
  ];

  if (context) {
    promptParts.push("Contexto (extractos de normas/documentos legales):");
    promptParts.push(context);
  }

  promptParts.push("Pregunta del usuario:");
  promptParts.push(question);

  const body = {
    model: "llama3.2",
    prompt: promptParts.join("\n\n"),
    stream: false,
  };

  const res = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Error de Ollama (${res.status}): ${text.slice(0, 200)}`);
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("No se pudo parsear la respuesta de Ollama");
  }

  const reply = (data.response || "").trim();
  if (!reply) {
    throw new Error("Ollama no devolvió texto de respuesta");
  }

  return reply;
}
