(function () {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d", { alpha: true });

  // Configuración del efecto (tuneable)
  const EFFECT = {
    starCount: 450,
    speed: 0.045,
    accelOnScroll: 0.00035,
    maxSpeed: 0.24,
    tail: 0.08,
    depthRange: [0.2, 1.0],
  };

  // Respeto a reduced motion
  const REDUCED =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (REDUCED) {
    EFFECT.starCount = 180;
    EFFECT.speed = 0.02;
    EFFECT.accelOnScroll = 0;
    EFFECT.tail = 0.03;
  }

  let w = 0, h = 0, cx = 0, cy = 0,
      deviceRatio = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    w = Math.floor(rect.width);
    h = Math.floor(rect.height);
    cx = w / 2; cy = h / 2;

    canvas.width = Math.floor(w * deviceRatio);
    canvas.height = Math.floor(h * deviceRatio);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(deviceRatio, 0, 0, deviceRatio, 0, 0);

    // Fondo
    ctx.fillStyle = "rgba(8, 10, 16, 1)";
    ctx.fillRect(0, 0, w, h);
  }

  // --- Saludo dinámico -------------------------------------------------------
  function getGreeting(d = new Date()) {
    const h = d.getHours();
    if (h >= 6 && h < 12) return "Buenos días";
    if (h >= 12 && h < 20) return "Buenas tardes";
    return "Buenas noches";
  }

  function drawGreeting() {
    const text = getGreeting();
    ctx.save();
    // Tamaño proporcional al ancho
    const fontSize = Math.max(18, Math.floor(w * 0.045));
    ctx.font = `600 ${fontSize}px system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Sombra suave para legibilidad
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = Math.max(8, fontSize * 0.35);

    // Color levemente azulado para juego con el fondo
    ctx.fillStyle = "rgba(220,235,255,0.95)";
    ctx.fillText(text, cx, h * 0.12); // cerca del tope (12% de alto)

    ctx.restore();
  }
  // ---------------------------------------------------------------------------

  // Modelo de estrella
  class Star {
    constructor() { this.reset(true); }
    reset(initial = false) {
      const angle = Math.random() * Math.PI * 2;
      const radius = (Math.random() ** 0.7) * (Math.max(w, h) * 0.65);
      this.x = Math.cos(angle) * radius;
      this.y = Math.sin(angle) * radius;
      const [zMin, zMax] = EFFECT.depthRange;
      this.z = zMin + Math.random() * (zMax - zMin);
      const light = 200 + Math.floor((1 - this.z) * 55);
      this.color = `rgba(${140 + (1 - this.z) * 40}, ${light}, 255, ${0.25 + (1 - this.z) * 0.35})`;
      this.px = this.x; this.py = this.y;
      if (initial) {
        this.x *= 0.3; this.y *= 0.3;
        this.px = this.x; this.py = this.y;
      }
    }
    step(dt, speed) {
      const vx = this.x * (speed * this.z) * dt;
      const vy = this.y * (speed * this.z) * dt;
      this.px = this.x; this.py = this.y;
      this.x += vx * 100; this.y += vy * 100;
      if (this.offscreen()) this.reset();
    }
    offscreen() {
      const m = 60;
      return (this.x + cx < -m || this.x + cx > w + m || this.y + cy < -m || this.y + cy > h + m);
    }
    draw(ctx) {
      // Star wars
      ctx.beginPath();
      ctx.moveTo(cx + this.px, cy + this.py);
      ctx.lineTo(cx + this.x, cy + this.y);
      const thickness = Math.max(0.5, (1.4 - this.z) * 1.4);
      ctx.lineWidth = thickness;
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }
  }

  const stars = [];
  function populate() {
    stars.length = 0;
    const densityBoost = Math.max(1, Math.sqrt((w * h) / (1280 * 720)));
    const count = Math.floor(EFFECT.starCount * densityBoost);
    for (let i = 0; i < count; i++) stars.push(new Star());
  }

  // Animación
  let last = performance.now();
  let speed = EFFECT.speed;
  let scrollBoost = 0;

  function tick(now) {
    const dt = Math.min(1 / 30, (now - last) / 1000);
    last = now;

    // “Desvanecer” estelas
    ctx.fillStyle = `rgba(8, 10, 16, ${1 - EFFECT.tail})`;
    ctx.fillRect(0, 0, w, h);

    // Velocidad objetivo + easing
    const targetSpeed = Math.min(EFFECT.maxSpeed, EFFECT.speed + scrollBoost);
    speed += (targetSpeed - speed) * 0.06;
    scrollBoost *= 0.96;

    // Estrellas
    for (let i = 0; i < stars.length; i++) {
      stars[i].step(dt, speed);
      stars[i].draw(ctx);
    }

    // Saludo encima del starfield
    drawGreeting();

    requestAnimationFrame(tick);
  }

  // Scroll → boost
  function onScroll() {
    if (REDUCED) return;
    const y = window.scrollY || 0;
    const v = Math.min(2000, Math.abs(y - onScroll._lastY || 0));
    onScroll._lastY = y;
    scrollBoost = Math.min(EFFECT.maxSpeed - EFFECT.speed, scrollBoost + v * EFFECT.accelOnScroll);
  }

  // Init
  function init() {
    resize();
    populate();
    last = performance.now();
    requestAnimationFrame(tick);
  }

  // Eventos
  window.addEventListener("resize", () => {
    const oldCount = stars.length;
    resize();
    populate();
    if (stars.length < oldCount) {
      // nada
    }
  }, { passive: true });

  window.addEventListener("scroll", onScroll, { passive: true });

  // Listo
  init();
})();
