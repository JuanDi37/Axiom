# Axiom – Asistente jurídico con LLM local

Axiom es un asistente jurídico experimental pensado para abogados y estudios legales.  
Permite hacer preguntas en lenguaje natural y responde **citando fragmentos de normas**.

El modelo de lenguaje no se conecta a ninguna API externa:  
usa **Ollama** corriendo en mi máquina, con un modelo open-source (en mi caso `llama3.2`).

---

## Descripción general

La arquitectura es sencilla:

- **Frontend (web)**  
  Aplicación en React que muestra:
  - Pantallas de landing, login/registro y chat.
  - Un chat tipo “Gemini/ChatGPT” minimalista.
  - Preguntas rápidas y citas de las fuentes usadas en cada respuesta.

- **Backend (API)**  
  Servidor Node/Express que se encarga de:
  - Registro e inicio de sesión de usuarios (con SQLite).
  - Recibir las preguntas del chat.
  - Leer los trozos de documentos legales desde SQLite.
  - Llamar a Ollama con la pregunta + contexto legal.
  - Devolver respuesta + citas al frontend.

- **Motor LLM (Ollama)**  
  Ollama corre en la máquina host y expone un endpoint HTTP local.  
  El backend le envía:
  - La pregunta del usuario.
  - El contexto: trozos de textos legales que se han indexado previamente.

- **Biblioteca legal**  
  Tus documentos legales (por ahora en `.txt`) se guardan en:
  - `data/legal_docs/`  
  Un script de ingesta los:
  - Lee.
  - Trocea en fragmentos.
  - Los guarda en las tablas `documents` y `chunks` de `app.db`.

---

## 🛠️ Tecnologías usadas

- **Frontend**