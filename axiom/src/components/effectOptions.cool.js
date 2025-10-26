// src/components/effectOptions.cool.js
export const effectOptions = {
  onSpeedUp: () => {},
  onSlowDown: () => {},

  // Efecto
  distortion: "turbulentDistortion",

  // Escena
  length: 420,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 3,

  // Cámara
  fov: 90,
  fovSpeedUp: 110,
  speedUp: 1.3,

  // >>> Parámetros para que la CÁMARA vaya más LENTA <<<
  cameraLerpSpeed: 2.5, // zoom/fov responde más despacio (menor = más lento)
  cameraLookLerp: 1.2,  // giro de mirada más suave (menor = más lento)
  cameraLookScale: 0.8, // reduce la amplitud del movimiento de mirada

  // Luces
  carLightsFade: 0.45,
  totalSideLightSticks: 38,
  lightPairsPerRoadWay: 32,

  // Marcas de carretera
  shoulderLinesWidthPercentage: 0.03,
  brokenLinesWidthPercentage: 0.06,
  brokenLinesLengthPercentage: 0.55,

  // Palos laterales
  lightStickWidth: [0.06, 0.25],
  lightStickHeight: [0.8, 1.2],

  // Velocidades de “carros”
  movingAwaySpeed: [40, 60],
  movingCloserSpeed: [-90, -120],

  // Percepción de calma
  carLightsLength: [10, 60],
  carLightsRadius: [0.04, 0.10],
  carWidthPercentage: [0.25, 0.45],
  carShiftX: [-0.5, 0.5],
  carFloorSeparation: [0, 2],

  // Paleta (negro azulado + violeta/cian)
  colors: {
    background:   0x0B1020,
    roadColor:    0x0E1325,
    islandColor:  0x10172B,
    shoulderLines: 0x2B2A40,
    brokenLines:   0x2B2A40,
    leftCars:  [0xC084FC, 0xA78BFA, 0x7C3AED],
    rightCars: [0x22D3EE, 0x06B6D4, 0x0EA5E9],
    sticks: 0x22D3EE
  }
};
