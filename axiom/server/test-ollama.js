// server/test-ollama.js
// Script mínimo para probar conexión Node -> Ollama

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";

async function main() {
  const body = {
    model: "llama3.2", // asegúrate de que este modelo está descargado (ollama run llama3.2)
    prompt: "Respóndeme en una sola frase: ¿qué es Ollama?",
    stream: false,     // para que devuelva un solo JSON
  };

  console.log("Llamando a Ollama en:", `${OLLAMA_URL}/api/generate`);

  const res = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();

  console.log("Status HTTP:", res.status);
  console.log("Cuerpo crudo:");
  console.log(text);

  try {
    const json = JSON.parse(text);
    console.log("\nCampo `response` del modelo:\n");
    console.log(json.response);
  } catch {
    console.log("\n(No se pudo parsear JSON, mostrando texto crudo.)");
  }
}

main().catch((err) => {
  console.error("Error llamando a Ollama:", err);
  process.exit(1);
});
