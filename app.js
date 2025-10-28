(function () {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d", { alpha: true });

  // Configuración del efecto (tuneable)
  const EFFECT = {
    starCount: 450,          // cantidad base de estrellas
    speed: 0.045,            // velocidad base
    accelOnScroll: 0.00035,  // aceleración suave con scroll
    maxSpeed: 0.24,          // límite superior
    tail: 0.08,              // longitud de estela (0..1)
    depthRange: [0.2, 1.0],  // z cercano/lejos
  };

  // Respeto a reduced motion
  const REDUCED =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (REDUCED) {
    EFFECT.starCount = 180;
    EFFECT.speed = 0.02;
    EFFECT.accelOnScroll = 0; // no acelera
    EFFECT.tail = 0.03;
  }

  let w = 0,
    h = 0,
    cx = 0,
    cy = 0,
    deviceRatio = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    w = Math.floor(rect.width);
    h = Math.floor(rect.height);
    cx = w / 2;
    cy = h / 2;

    canvas.width = Math.floor(w * deviceRatio);
    canvas.height = Math.floor(h * deviceRatio);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(deviceRatio, 0, 0, deviceRatio, 0, 0);

    // Redibujar fondo negro translúcido para limpiar
    ctx.fillStyle = "rgba(8, 10, 16, 1)";
    ctx.fillRect(0, 0, w, h);
  }

  // Modelo de estrella en coordenadas polares proyectadas
  class Star {
    constructor() { this.reset(true); }

    reset(initial = false) {
      // Posición alrededor del centro con ángulo aleatorio
      const angle = Math.random() * Math.PI * 2;
      const radius = (Math.random() ** 0.7) * (Math.max(w, h) * 0.65);
      this.x = Math.cos(angle) * radius;
      this.y = Math.sin(angle) * radius;

      // Profundidad (z) controla velocidad y grosor de estela
      const [zMin, zMax] = EFFECT.depthRange;
      this.z = zMin + Math.random() * (zMax - zMin);

      // Color muy suave azulado
      const light = 200 + Math.floor((1 - this.z) * 55);
      this.color = `rgba(${140 + (1 - this.z) * 40}, ${light}, 255, ${
        0.25 + (1 - this.z) * 0.35
      })`;

      // Para estela
      this.px = this.x;
      this.py = this.y;

      // Arranque: estrellas cerca del centro para llenado inicial
      if (initial) {
        this.x *= 0.3;
        this.y *= 0.3;
        this.px = this.x;
        this.py = this.y;
      }
    }

    step(dt, speed) {
      // Expandir hacia fuera (efecto warp)
      const vx = this.x * (speed * this.z) * dt;
      const vy = this.y * (speed * this.z) * dt;

      this.px = this.x;
      this.py = this.y;
      this.x += vx * 100;
      this.y += vy * 100;

      // Si sale del viewport, reiniciar
      if (this.offscreen()) this.reset();
    }

    offscreen() {
      const margin = 60;
      return (
        this.x + cx < -margin ||
        this.x + cx > w + margin ||
        this.y + cy < -margin ||
        this.y + cy > h + margin
      );
    }

    draw(ctx) {
      // Estela
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
    const dt = Math.min(1 / 30, (now - last) / 1000); // clamp tiempo
    last = now;

    // Lienzo semitransparente para “desvanecer” estelas
    ctx.fillStyle = `rgba(8, 10, 16, ${1 - EFFECT.tail})`;
    ctx.fillRect(0, 0, w, h);

    // Easing hacia velocidad objetivo (con boost por scroll)
    const targetSpeed = Math.min(EFFECT.maxSpeed, EFFECT.speed + scrollBoost);
    speed += (targetSpeed - speed) * 0.06;
    scrollBoost *= 0.96; // se desvanece

    // Dibujar estrellas
    for (let i = 0; i < stars.length; i++) {
      stars[i].step(dt, speed);
      stars[i].draw(ctx);
    }

    requestAnimationFrame(tick);
  }

  // Manejo de scroll para una sensación de aceleración sutil
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
    // mantener sensación consistente
    if (stars.length < oldCount) {
      // nada; repoblado ya ajusta densidad
    }
  }, { passive: true });

  window.addEventListener("scroll", onScroll, { passive: true });

  // Listo
  init();
})();
