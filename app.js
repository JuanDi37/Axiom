/* ============== 1) Saludo visible (alert) ============== */
(function () {
  const el = document.getElementById("greetingText");
  if (!el) return;

  function saludo(d = new Date()) {
    const h = d.getHours();
    if (h >= 6 && h < 12) return "Buenos días";   // <- requerido
    if (h >= 12 && h < 20) return "Buenas tardes";
    return "Buenas noches";
  }

  function actualizar() { el.textContent = saludo(); }
  actualizar();

  // Actualiza al pasar de minuto para reflejar cambios de hora
  const msHastaMin = 60_000 - (Date.now() % 60_000);
  setTimeout(() => { actualizar(); setInterval(actualizar, 60_000); }, msHastaMin);
})();

/* ===== 2) Saludo sutil en canvas (decorativo, esquina sup-izq) ===== */
(function () {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  let w = 0, h = 0;

  function saludo() {
    const hr = new Date().getHours();
    if (hr >= 6 && hr < 12) return "Buenos días";
    if (hr >= 12 && hr < 20) return "Buenas tardes";
    return "Buenas noches";
  }

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const txt = saludo();
    ctx.save();
    ctx.globalAlpha = 0.16;
    ctx.fillStyle = "#cfe3ff";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    const size = Math.max(18, Math.min(40, Math.floor(w * 0.022)));
    ctx.font = `700 ${size}px system-ui, -apple-system, Segoe UI, Roboto, Arial`;
    ctx.shadowColor = "rgba(0,0,0,.25)";
    ctx.shadowBlur = 4;
    ctx.fillText(txt, 24, 16);
    ctx.restore();
  }

  window.addEventListener("resize", resize, { passive: true });
  resize();
})();

/* ========== 3) Interacción: modo oscuro/claro (Bootstrap) ========== */
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("themeSwitch");
  if (!toggle) return;

  const saved = localStorage.getItem("theme") || "dark";
  root.setAttribute("data-bs-theme", saved);
  toggle.checked = saved === "dark";

  toggle.addEventListener("change", () => {
    const next = toggle.checked ? "dark" : "light";
    root.setAttribute("data-bs-theme", next);
    localStorage.setItem("theme", next);
  });
})();

/* ====== 4) Interacción: filtro en vivo de tarjetas (Bootstrap) ===== */
(function () {
  const input = document.getElementById("filterInput");
  const grid = document.getElementById("cardsGrid");
  if (!input || !grid) return;

  const cols = [...grid.querySelectorAll(".col-md-6, .col-lg-4")];

  function filtrar() {
    const q = input.value.trim().toLowerCase();
    cols.forEach(col => {
      col.classList.toggle("d-none", q && !col.textContent.toLowerCase().includes(q));
    });
  }

  input.addEventListener("input", filtrar);
})();
