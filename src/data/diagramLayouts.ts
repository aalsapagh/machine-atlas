import type { MachineComponent } from "../types/machine";

export interface ComponentPos {
  x: number;
  y: number;
  w: number;
  h: number;
  ex: number;
  ey: number;
}

export interface DiagramLayout {
  viewBox: string;
  positions: Record<string, ComponentPos>;
}

const P101_POSITIONS: Record<string, ComponentPos> = {
  "foundation":         { x: 0,    y: 272,  w: 700, h: 38,  ex: 0,    ey: 90  },
  "base-plate":         { x: 0,    y: 236,  w: 612, h: 24,  ex: 0,    ey: 60  },
  "motor":              { x: -258, y: 90,   w: 212, h: 148, ex: -100, ey: -30 },
  "coupling":           { x: -130, y: 97,   w: 44,  h: 62,  ex: -75,  ey: -40 },
  "bearing-housing":    { x: -72,  y: 90,   w: 88,  h: 88,  ex: -45,  ey: -25 },
  "shaft":              { x: -8,   y: 94,   w: 210, h: 16,  ex: 20,   ey: -60 },
  "mechanical-seal":    { x: -8,   y: 90,   w: 26,  h: 48,  ex: 10,   ey: -65 },
  "pump-casing":        { x: 125,  y: 75,   w: 168, h: 182, ex: 75,   ey: -25 },
  "impeller":           { x: 125,  y: 80,   w: 120, h: 120, ex: 95,   ey: -45 },
  "outlet-pipe":        { x: 80,   y: -75,  w: 52,  h: 158, ex: -20,  ey: -85 },
  "inlet-pipe":         { x: 208,  y: 183,  w: 56,  h: 154, ex: 100,  ey: 75  },
  "pressure-gauge":     { x: 80,   y: -162, w: 54,  h: 54,  ex: -30,  ey: -95 },
  "temperature-sensor": { x: 200,  y: 72,   w: 24,  h: 90,  ex: 105,  ey: 5   },
};

// Car-801 (Toyota Camry) layout — logical arrangement of major components
// Coordinate origin is center. Positive y is downward in SVG space.
// Layout: body across top, drivetrain left-to-right in middle, wheels at corners, accessories bottom
const CAR801_POSITIONS: Record<string, ComponentPos> = {
  //                              x     y     w    h    ex    ey
  "car-body":         { x: -10,  y: -200, w: 340, h: 110, ex:  0,   ey: -130 },
  "car-engine":       { x: -240, y: -50,  w: 200, h: 140, ex: -190, ey: -40  },
  "car-transmission": { x:  -10, y: -50,  w: 180, h: 130, ex:   0,  ey: -40  },
  "car-radiator":     { x: -240, y: -210, w: 150, h: 100, ex: -190, ey: -150 },
  "car-fl-wheel":     { x: -330, y:  80,  w: 110, h: 110, ex: -270, ey:  110 },
  "car-fr-wheel":     { x:  220, y:  80,  w: 110, h: 110, ex:  270, ey:  110 },
  "car-rl-wheel":     { x: -330, y:  220, w: 110, h: 110, ex: -270, ey:  240 },
  "car-rr-wheel":     { x:  220, y:  220, w: 110, h: 110, ex:  270, ey:  240 },
  "car-brakes":       { x:   60, y:  80,  w: 140, h: 130, ex:  80,  ey:  110 },
  "car-suspension":   { x:  -130,y:  80,  w: 130, h: 130, ex: -90,  ey:  110 },
  "car-fuel-tank":    { x:   60, y:  220, w: 170, h: 100, ex:  90,  ey:  250 },
  "car-battery":      { x: -130, y:  220, w: 160, h: 100, ex: -90,  ey:  250 },
};

function generateGridLayout(components: MachineComponent[]): DiagramLayout {
  const cols = 3;
  const cellW = 190;
  const cellH = 130;
  const hGap = 55;
  const vGap = 65;
  const rows = Math.ceil(components.length / cols);
  const gridW = cols * cellW + (cols - 1) * hGap;
  const gridH = rows * cellH + (rows - 1) * vGap;

  const positions: Record<string, ComponentPos> = {};
  components.forEach((comp, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cx = col * (cellW + hGap) - gridW / 2 + cellW / 2;
    const cy = row * (cellH + vGap) - gridH / 2 + cellH / 2;
    positions[comp.id] = {
      x: cx,
      y: cy,
      w: cellW,
      h: cellH,
      ex: cx * 0.7,
      ey: cy * 0.7,
    };
  });

  const padX = 160;
  const padY = 160;
  const vbX = -(gridW / 2 + padX);
  const vbY = -(gridH / 2 + padY);
  const vbW = gridW + padX * 2;
  const vbH = gridH + padY * 2;

  return {
    viewBox: `${vbX} ${vbY} ${vbW} ${vbH}`,
    positions,
  };
}

export function getDiagramLayout(
  machineId: string,
  components: MachineComponent[]
): DiagramLayout {
  if (machineId === "p-101") {
    return {
      viewBox: "-510 -265 1020 560",
      positions: P101_POSITIONS,
    };
  }
  if (machineId === "car-801") {
    return {
      viewBox: "-460 -310 920 660",
      positions: CAR801_POSITIONS,
    };
  }
  return generateGridLayout(components);
}
