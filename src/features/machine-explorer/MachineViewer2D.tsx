import { useRef, useEffect, useCallback, type ReactElement, type PointerEvent, type WheelEvent } from "react";
import { useMachineStore } from "../../store/machineStore";
import { getActiveMachineComponents } from "../../data/machineRegistry";
import { getDiagramLayout } from "../../data/diagramLayouts";
import { useLocalizedComponents } from "../../i18n/useLocalizedComponent";
import type { MachineComponent } from "../../types/machine";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Transform {
  x: number;
  y: number;
  scale: number;
}

// ─── SVG Defs ────────────────────────────────────────────────────────────────

function SvgDefs() {
  return (
    <defs>
      {/* g-motor: dark gray metallic */}
      <linearGradient id="g-motor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#525f70" />
        <stop offset="50%" stopColor="#3d4a58" />
        <stop offset="100%" stopColor="#2d3844" />
      </linearGradient>
      {/* g-steel */}
      <linearGradient id="g-steel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8b939c" />
        <stop offset="50%" stopColor="#6b7580" />
        <stop offset="100%" stopColor="#4a5568" />
      </linearGradient>
      {/* g-dark */}
      <linearGradient id="g-dark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3a4048" />
        <stop offset="100%" stopColor="#252b32" />
      </linearGradient>
      {/* g-pipe: blue-gray horizontal */}
      <linearGradient id="g-pipe" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#4a6878" />
        <stop offset="50%" stopColor="#5a7888" />
        <stop offset="100%" stopColor="#3a5868" />
      </linearGradient>
      {/* g-casing: diagonal */}
      <linearGradient id="g-casing" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5d6878" />
        <stop offset="100%" stopColor="#3d4858" />
      </linearGradient>
      {/* g-base */}
      <linearGradient id="g-base" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5a6070" />
        <stop offset="100%" stopColor="#3a4050" />
      </linearGradient>
      {/* g-foundation */}
      <linearGradient id="g-foundation" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4a4f58" />
        <stop offset="100%" stopColor="#32373e" />
      </linearGradient>
      {/* g-gauge-face */}
      <linearGradient id="g-gauge-face" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e8e8e0" />
        <stop offset="100%" stopColor="#c8c8c0" />
      </linearGradient>
      {/* g-endbell */}
      <linearGradient id="g-endbell" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#707880" />
        <stop offset="100%" stopColor="#505868" />
      </linearGradient>
      {/* hatch pattern */}
      <pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="10" stroke="#3a4048" strokeWidth="2.5" />
      </pattern>
    </defs>
  );
}

// ─── Individual Shape Components ──────────────────────────────────────────────

function ShapeMotor({ w, h }: { w: number; h: number }) {
  const hw = w / 2;
  const hh = h / 2;
  const fanW = 28;
  const bellW = 22;
  const termW = 36;
  const termH = 22;
  const stubW = 18;
  const stubH = 8;
  const finCount = 10;
  return (
    <g>
      {/* Main body */}
      <rect x={-hw} y={-hh} width={w} height={h} rx={8} fill="url(#g-motor)" />
      {/* Cooling fins */}
      {Array.from({ length: finCount }, (_, i) => {
        const fx = -hw + 36 + (i * (w - 36 - bellW - 10)) / (finCount - 1);
        return (
          <line
            key={i}
            x1={fx} y1={-hh}
            x2={fx} y2={hh}
            stroke="#2a3440"
            strokeWidth={1.5}
          />
        );
      })}
      {/* Fan cover left */}
      <rect x={-hw} y={-hh + 4} width={fanW} height={h - 8} rx={4} fill="url(#g-dark)" />
      {/* Drive-end bell right */}
      <rect x={hw - bellW} y={-hh + 4} width={bellW} height={h - 8} rx={4} fill="url(#g-endbell)" />
      {/* Shaft stub protruding right */}
      <rect x={hw} y={-stubH / 2} width={stubW} height={stubH} rx={2} fill="url(#g-steel)" />
      {/* Terminal box on top */}
      <rect x={-termW / 2} y={-hh - termH} width={termW} height={termH} rx={3} fill="url(#g-dark)" />
      {/* Terminal circles */}
      <circle cx={-termW / 2 + 10} cy={-hh - termH / 2} r={3} fill="#888" />
      <circle cx={0}              cy={-hh - termH / 2} r={3} fill="#888" />
      <circle cx={termW / 2 - 10} cy={-hh - termH / 2} r={3} fill="#888" />
    </g>
  );
}

function ShapeCoupling({ w, h }: { w: number; h: number }) {
  const hw = w / 2;
  const hh = h / 2;
  const hubW = hw * 0.35;
  const midW = w * 0.3;
  return (
    <g>
      {/* Left hub */}
      <rect x={-hw} y={-hh * 0.7} width={hubW} height={h * 0.7} rx={3} fill="url(#g-steel)" />
      {/* Rubber spider */}
      <rect x={-midW / 2} y={-hh * 0.55} width={midW} height={h * 0.55} rx={2} fill="#8b6a40" />
      {/* Right hub */}
      <rect x={hw - hubW} y={-hh * 0.7} width={hubW} height={h * 0.7} rx={3} fill="url(#g-steel)" />
      {/* Bolt circles left hub */}
      <circle cx={-hw + hubW / 2} cy={-hh * 0.35} r={2.5} fill="none" stroke="#8b939c" strokeWidth={1} />
      <circle cx={-hw + hubW / 2} cy={ hh * 0.1}  r={2.5} fill="none" stroke="#8b939c" strokeWidth={1} />
      {/* Bolt circles right hub */}
      <circle cx={hw - hubW / 2} cy={-hh * 0.35} r={2.5} fill="none" stroke="#8b939c" strokeWidth={1} />
      <circle cx={hw - hubW / 2} cy={ hh * 0.1}  r={2.5} fill="none" stroke="#8b939c" strokeWidth={1} />
    </g>
  );
}

function ShapeBearingHousing({ w, h }: { w: number; h: number }) {
  const hw = w / 2;
  const hh = h / 2;
  const flangeH = 10;
  const bodyR = Math.min(hw, hh - flangeH) * 0.85;
  const outerR = bodyR * 0.8;
  const innerR = outerR * 0.55;
  const ballR = (outerR - innerR) / 2.5;
  const ballOrbit = (outerR + innerR) / 2;
  return (
    <g>
      {/* Base flange */}
      <rect x={-hw} y={hh - flangeH} width={w} height={flangeH} rx={2} fill="url(#g-dark)" />
      <circle cx={-hw + 10} cy={hh - flangeH / 2} r={2.5} fill="none" stroke="#8b939c" strokeWidth={1} />
      <circle cx={hw - 10}  cy={hh - flangeH / 2} r={2.5} fill="none" stroke="#8b939c" strokeWidth={1} />
      {/* Main body */}
      <rect x={-hw + 4} y={-hh} width={w - 8} height={h - flangeH} rx={6} fill="url(#g-casing)" />
      {/* Horizontal split line */}
      <line x1={-hw + 4} y1={0} x2={hw - 4} y2={0} stroke="#2a3440" strokeWidth={1.5} />
      {/* Bearing cross-section */}
      <circle cx={0} cy={-flangeH / 2} r={outerR} fill="none" stroke="#6b7580" strokeWidth={3} />
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const bx = Math.cos(angle) * ballOrbit;
        const by = Math.sin(angle) * ballOrbit - flangeH / 2;
        return <circle key={i} cx={bx} cy={by} r={ballR} fill="#4a5568" stroke="#6b7580" strokeWidth={1} />;
      })}
      <circle cx={0} cy={-flangeH / 2} r={innerR} fill="none" stroke="#6b7580" strokeWidth={2.5} />
    </g>
  );
}

function ShapeShaft({ w, h }: { w: number; h: number }) {
  const hw = w / 2;
  const hh = h / 2;
  const keyW = 14;
  const keyH = 4;
  return (
    <g>
      <rect x={-hw} y={-hh} width={w} height={h} rx={hh} fill="url(#g-steel)" />
      {/* Center highlight */}
      <line x1={-hw + 8} y1={0} x2={hw - 8} y2={0} stroke="#a0aab4" strokeWidth={1.2} />
      {/* Keyway notch */}
      <rect x={-keyW / 2} y={-hh - keyH} width={keyW} height={keyH} rx={1} fill="#2a3440" />
    </g>
  );
}

function ShapeMechanicalSeal({ w, h }: { w: number; h: number }) {
  const hw = w / 2;
  const hh = h / 2;
  const glandH = h * 0.35;
  const sealH = h * 0.3;
  const faceH = 4;
  const boreW = w * 0.4;
  const boreH = h * 0.6;
  return (
    <g>
      {/* Gland plate */}
      <rect x={-hw * 1.5} y={-hh} width={w * 1.5} height={glandH} rx={2} fill="url(#g-dark)" />
      {/* Seal body */}
      <rect x={-hw} y={-hh + glandH} width={w} height={sealH} rx={2} fill="url(#g-steel)" />
      {/* Seal faces */}
      <rect x={-hw + 2} y={-hh + glandH + sealH} width={w - 4} height={faceH} rx={1} fill="#8b939c" />
      <rect x={-hw + 2} y={-hh + glandH + sealH + faceH + 2} width={w - 4} height={faceH} rx={1} fill="#7a8390" />
      {/* Shaft bore */}
      <rect x={-boreW / 2} y={-hh + glandH} width={boreW} height={boreH} rx={1} fill="#1e2530" />
    </g>
  );
}

function ShapePumpCasing({ w, h }: { w: number; h: number }) {
  const r = Math.min(w, h) * 0.45;
  const nozzleW = w * 0.18;
  const nozzleH = h * 0.28;
  const flangeExtra = 8;
  const eyeR = r * 0.25;
  const boltR = r * 0.88;
  return (
    <g>
      {/* Volute body */}
      <circle cx={0} cy={0} r={r} fill="url(#g-casing)" />
      {/* Discharge nozzle up */}
      <rect
        x={-nozzleW / 2}
        y={-r - nozzleH}
        width={nozzleW}
        height={nozzleH + 4}
        fill="url(#g-casing)"
      />
      {/* Discharge flange */}
      <rect
        x={-nozzleW / 2 - flangeExtra}
        y={-r - nozzleH - 7}
        width={nozzleW + flangeExtra * 2}
        height={7}
        rx={1}
        fill="url(#g-dark)"
      />
      {/* Suction nozzle right */}
      <rect
        x={r - 4}
        y={-nozzleW / 2}
        width={nozzleH + 4}
        height={nozzleW}
        fill="url(#g-casing)"
      />
      {/* Suction flange */}
      <rect
        x={r + nozzleH - 3}
        y={-nozzleW / 2 - flangeExtra}
        width={7}
        height={nozzleW + flangeExtra * 2}
        rx={1}
        fill="url(#g-dark)"
      />
      {/* Inner eye */}
      <circle cx={0} cy={0} r={eyeR} fill="#1e2530" />
      {/* Casing bolt circles */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const bx = Math.cos(angle) * boltR;
        const by = Math.sin(angle) * boltR;
        return <circle key={i} cx={bx} cy={by} r={3.5} fill="#2a3440" stroke="#6b7580" strokeWidth={1} />;
      })}
    </g>
  );
}

function ShapeImpeller({ w, h }: { w: number; h: number }) {
  const outerR = Math.min(w, h) * 0.45;
  const innerR = outerR * 0.3;
  const hubR = outerR * 0.14;
  const vaneCount = 7;
  return (
    <g>
      {/* Disc */}
      <circle cx={0} cy={0} r={outerR} fill="url(#g-steel)" />
      {/* Vanes */}
      {Array.from({ length: vaneCount }, (_, i) => {
        const startAngle = (i * Math.PI * 2) / vaneCount;
        const endAngle = startAngle + (Math.PI * 2) / vaneCount - 0.15;
        const sx = Math.cos(startAngle) * innerR;
        const sy = Math.sin(startAngle) * innerR;
        const ex = Math.cos(endAngle) * outerR;
        const ey = Math.sin(endAngle) * outerR;
        const cx2 = Math.cos(startAngle + 0.5) * (innerR + outerR) / 2;
        const cy2 = Math.sin(startAngle + 0.5) * (innerR + outerR) / 2;
        return (
          <path
            key={i}
            d={`M ${sx} ${sy} Q ${cx2} ${cy2} ${ex} ${ey}`}
            fill="none"
            stroke="#3a4558"
            strokeWidth={2.5}
          />
        );
      })}
      {/* Hub */}
      <circle cx={0} cy={0} r={hubR} fill="#1e2530" />
      {/* Shroud rim */}
      <circle cx={0} cy={0} r={outerR * 0.92} fill="none" stroke="#8b939c" strokeWidth={1} />
    </g>
  );
}

function ShapeBasePlate({ w, h }: { w: number; h: number }) {
  const hw = w / 2;
  const hh = h / 2;
  return (
    <g>
      <rect x={-hw} y={-hh} width={w} height={h} rx={2} fill="url(#g-base)" />
      {/* Stiffener lines */}
      <line x1={-hw + 20} y1={-hh / 3} x2={hw - 20} y2={-hh / 3} stroke="#4a5060" strokeWidth={1.5} />
      <line x1={-hw + 20} y1={0}       x2={hw - 20} y2={0}        stroke="#4a5060" strokeWidth={1.5} />
      <line x1={-hw + 20} y1={hh / 3}  x2={hw - 20} y2={hh / 3}  stroke="#4a5060" strokeWidth={1.5} />
      {/* Corner bolt holes */}
      <circle cx={-hw + 14} cy={-hh + 7} r={3} fill="#1e2530" stroke="#6b7580" strokeWidth={1} />
      <circle cx={ hw - 14} cy={-hh + 7} r={3} fill="#1e2530" stroke="#6b7580" strokeWidth={1} />
      <circle cx={-hw + 14} cy={ hh - 7} r={3} fill="#1e2530" stroke="#6b7580" strokeWidth={1} />
      <circle cx={ hw - 14} cy={ hh - 7} r={3} fill="#1e2530" stroke="#6b7580" strokeWidth={1} />
      {/* Drain boss */}
      <circle cx={0} cy={0} r={5} fill="#2a3440" stroke="#6b7580" strokeWidth={1} />
    </g>
  );
}

function ShapeFoundation({ w, h }: { w: number; h: number }) {
  const hw = w / 2;
  const hh = h / 2;
  const stubW = 8;
  const stubH = 8;
  return (
    <g>
      <rect x={-hw} y={-hh} width={w} height={h} rx={2} fill="url(#g-foundation)" />
      {/* Hatch overlay */}
      <rect x={-hw} y={-hh} width={w} height={h} rx={2} fill="url(#hatch)" opacity={0.4} />
      {/* Anchor bolt stubs */}
      <rect x={-hw * 0.6 - stubW / 2} y={-hh - stubH} width={stubW} height={stubH} rx={1} fill="#5a6070" />
      <rect x={-stubW / 2}            y={-hh - stubH} width={stubW} height={stubH} rx={1} fill="#5a6070" />
      <rect x={ hw * 0.6 - stubW / 2} y={-hh - stubH} width={stubW} height={stubH} rx={1} fill="#5a6070" />
      {/* Top edge highlight */}
      <line x1={-hw} y1={-hh} x2={hw} y2={-hh} stroke="#6b7080" strokeWidth={2} />
    </g>
  );
}

function ShapePipe({ w, h, vertical }: { w: number; h: number; vertical: boolean }) {
  const hw = w / 2;
  const hh = h / 2;
  const flangeExtra = 6;
  const boltOffset = 10;
  if (vertical) {
    return (
      <g>
        {/* Pipe body */}
        <rect x={-hw} y={-hh} width={w} height={h} fill="url(#g-pipe)" />
        {/* Center highlight */}
        <rect x={-hw * 0.2} y={-hh} width={hw * 0.4} height={h} fill="#6a8898" opacity={0.5} />
        {/* Top flange */}
        <rect x={-hw - flangeExtra} y={-hh} width={w + flangeExtra * 2} height={8} rx={1} fill="url(#g-dark)" />
        <circle cx={-hw - flangeExtra + boltOffset} cy={-hh + 4} r={2.5} fill="#1e2530" stroke="#6b7580" strokeWidth={0.8} />
        <circle cx={ hw + flangeExtra - boltOffset} cy={-hh + 4} r={2.5} fill="#1e2530" stroke="#6b7580" strokeWidth={0.8} />
        {/* Bottom flange */}
        <rect x={-hw - flangeExtra} y={hh - 8} width={w + flangeExtra * 2} height={8} rx={1} fill="url(#g-dark)" />
        <circle cx={-hw - flangeExtra + boltOffset} cy={hh - 4} r={2.5} fill="#1e2530" stroke="#6b7580" strokeWidth={0.8} />
        <circle cx={ hw + flangeExtra - boltOffset} cy={hh - 4} r={2.5} fill="#1e2530" stroke="#6b7580" strokeWidth={0.8} />
      </g>
    );
  }
  return (
    <g>
      <rect x={-hw} y={-hh} width={w} height={h} fill="url(#g-pipe)" />
      <rect x={-hw} y={-hh * 0.2} width={w} height={hh * 0.4} fill="#6a8898" opacity={0.5} />
      <rect x={-hw} y={-hh - flangeExtra} width={8} height={h + flangeExtra * 2} rx={1} fill="url(#g-dark)" />
      <rect x={ hw - 8} y={-hh - flangeExtra} width={8} height={h + flangeExtra * 2} rx={1} fill="url(#g-dark)" />
    </g>
  );
}

function ShapePressureGauge({ w, h }: { w: number; h: number }) {
  const r = Math.min(w, h) * 0.42;
  const stemH = h * 0.35;
  const stemW = w * 0.25;
  const faceR = r * 0.78;
  return (
    <g>
      {/* Outer housing */}
      <circle cx={0} cy={-stemH / 2} r={r} fill="url(#g-dark)" />
      {/* Face */}
      <circle cx={0} cy={-stemH / 2} r={faceR} fill="url(#g-gauge-face)" />
      {/* Scale arc */}
      <path
        d={`M ${-faceR * 0.82} ${-stemH / 2 + faceR * 0.2} A ${faceR * 0.82} ${faceR * 0.82} 0 1 1 ${faceR * 0.82} ${-stemH / 2 + faceR * 0.2}`}
        fill="none"
        stroke="#888880"
        strokeWidth={1}
      />
      {/* Tick marks */}
      {Array.from({ length: 11 }, (_, i) => {
        const startAngle = Math.PI * 0.75;
        const endAngle = Math.PI * 2.25;
        const angle = startAngle + (i / 10) * (endAngle - startAngle);
        const innerR = faceR * 0.68;
        const outerR2 = faceR * 0.82;
        const x1 = Math.cos(angle) * innerR;
        const y1 = Math.sin(angle) * innerR - stemH / 2;
        const x2 = Math.cos(angle) * outerR2;
        const y2 = Math.sin(angle) * outerR2 - stemH / 2;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#555550" strokeWidth={i % 5 === 0 ? 1.5 : 0.8} />;
      })}
      {/* Needle at ~40% */}
      {(() => {
        const needleAngle = Math.PI * 0.75 + 0.4 * (Math.PI * 1.5);
        const nx = Math.cos(needleAngle) * faceR * 0.65;
        const ny = Math.sin(needleAngle) * faceR * 0.65 - stemH / 2;
        return <line x1={0} y1={-stemH / 2} x2={nx} y2={ny} stroke="#ef4444" strokeWidth={1.5} strokeLinecap="round" />;
      })()}
      {/* Hub dot */}
      <circle cx={0} cy={-stemH / 2} r={3} fill="#333" />
      {/* Threaded stem */}
      <rect x={-stemW / 2} y={-stemH / 2 + r * 0.85} width={stemW} height={stemH} rx={stemW / 4} fill="url(#g-steel)" />
    </g>
  );
}

function ShapeTemperatureSensor({ w, h }: { w: number; h: number }) {
  const headW = w * 2;
  const headH = h * 0.28;
  const conduitW = w * 0.5;
  const conduitH = h * 0.28;
  const wellW = w * 0.6;
  const wellH = h * 0.44;
  const hh = h / 2;
  return (
    <g>
      {/* Connection head */}
      <rect x={-headW / 2} y={-hh} width={headW} height={headH} rx={3} fill="url(#g-dark)" />
      {/* LED */}
      <circle cx={headW / 2 - 6} cy={-hh + headH / 2} r={3} fill="#22c55e" />
      {/* Conduit */}
      <rect x={-conduitW / 2} y={-hh + headH} width={conduitW} height={conduitH} fill="url(#g-steel)" />
      {/* Thermowell */}
      <rect
        x={-wellW / 2}
        y={-hh + headH + conduitH}
        width={wellW}
        height={wellH}
        rx={wellW / 4}
        fill="url(#g-steel)"
      />
    </g>
  );
}

// Generic shapes
function ShapeWheel({ w, h }: { w: number; h: number }) {
  const r = Math.min(w, h) * 0.45;
  const rimR = r * 0.7;
  const hubR = r * 0.18;
  return (
    <g>
      <circle cx={0} cy={0} r={r} fill="#1e2530" />
      <circle cx={0} cy={0} r={rimR} fill="url(#g-steel)" />
      {Array.from({ length: 5 }, (_, i) => {
        const angle = (i * Math.PI * 2) / 5;
        return (
          <line key={i}
            x1={Math.cos(angle) * hubR} y1={Math.sin(angle) * hubR}
            x2={Math.cos(angle) * rimR} y2={Math.sin(angle) * rimR}
            stroke="#4a5568" strokeWidth={3} />
        );
      })}
      <circle cx={0} cy={0} r={hubR} fill="#2a3440" stroke="#6b7580" strokeWidth={1.5} />
    </g>
  );
}

function ShapeGearbox({ w, h }: { w: number; h: number }) {
  const hw = w / 2;
  const hh = h / 2;
  const toothH = 8;
  const toothCount = Math.floor(w / 14);
  return (
    <g>
      <rect x={-hw} y={-hh + toothH} width={w} height={h - toothH} rx={4} fill="url(#g-motor)" />
      {Array.from({ length: toothCount }, (_, i) => {
        const tx = -hw + i * (w / toothCount) + 2;
        const tw = w / toothCount - 4;
        return <rect key={i} x={tx} y={-hh} width={tw} height={toothH} rx={1} fill="url(#g-dark)" />;
      })}
    </g>
  );
}

function ShapeTank({ w, h }: { w: number; h: number }) {
  const hw = w / 2;
  const hh = h / 2;
  return (
    <g>
      <rect x={-hw} y={-hh + 10} width={w} height={h - 10} rx={8} fill="url(#g-steel)" />
      <circle cx={0} cy={-hh + 10} r={8} fill="url(#g-dark)" />
    </g>
  );
}

function ShapeBattery({ w, h }: { w: number; h: number }) {
  const hw = w / 2;
  const hh = h / 2;
  return (
    <g>
      <rect x={-hw} y={-hh} width={w} height={h} rx={4} fill="url(#g-dark)" />
      <rect x={-hw * 0.5} y={-hh - 5} width={hw * 0.35} height={5} rx={1} fill="#6b7580" />
      <rect x={ hw * 0.15} y={-hh - 5} width={hw * 0.35} height={5} rx={1} fill="#6b7580" />
      <text x={-hw * 0.3} y={4} textAnchor="middle" fontSize={14} fill="#ef4444" fontWeight="bold">+</text>
      <text x={ hw * 0.3} y={4} textAnchor="middle" fontSize={14} fill="#22c55e" fontWeight="bold">-</text>
    </g>
  );
}

function ShapeExhaust({ w, h }: { w: number; h: number }) {
  const hw = w / 2;
  const hh = h / 2;
  return (
    <g>
      <rect x={-hw} y={-hh} width={w} height={h} rx={hh} fill="url(#g-pipe)" />
      <rect x={-hw * 0.1} y={-hh * 0.3} width={hw * 0.2} height={h * 0.6} fill="#6a8898" opacity={0.5} />
    </g>
  );
}

function ShapeDisc({ w, h }: { w: number; h: number }) {
  const r = Math.min(w, h) * 0.44;
  const innerR = r * 0.45;
  return (
    <g>
      <circle cx={0} cy={0} r={r} fill="url(#g-casing)" />
      <circle cx={0} cy={0} r={innerR} fill="url(#g-dark)" />
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i * Math.PI * 2) / 6;
        const x1 = Math.cos(angle) * innerR;
        const y1 = Math.sin(angle) * innerR;
        const x2 = Math.cos(angle) * r;
        const y2 = Math.sin(angle) * r;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2a3440" strokeWidth={4} />;
      })}
    </g>
  );
}

function ShapeFork({ w, h }: { w: number; h: number }) {
  const legW = w * 0.28;
  const hh = h / 2;
  return (
    <g>
      <rect x={-w * 0.4} y={-hh} width={legW} height={h} rx={legW / 2} fill="url(#g-steel)" />
      <rect x={ w * 0.12} y={-hh} width={legW} height={h} rx={legW / 2} fill="url(#g-steel)" />
    </g>
  );
}

function ShapeShock({ w, h }: { w: number; h: number }) {
  const hw = w / 2;
  const hh = h / 2;
  const springLines = 7;
  return (
    <g>
      <rect x={-hw} y={-hh} width={w} height={h} rx={hw} fill="url(#g-steel)" />
      {Array.from({ length: springLines }, (_, i) => {
        const y = -hh + 10 + (i * (h - 20)) / (springLines - 1);
        return <line key={i} x1={-hw + 2} y1={y} x2={hw - 2} y2={y} stroke="#3a4048" strokeWidth={1.5} />;
      })}
    </g>
  );
}

function ShapeFrame({ w, h }: { w: number; h: number }) {
  const hw = w / 2;
  const hh = h / 2;
  return (
    <g>
      <polygon
        points={`${-hw},${hh} ${hw},${hh} ${hw * 0.4},${-hh} ${-hw * 0.4},${-hh}`}
        fill="none"
        stroke="url(#g-steel)"
        strokeWidth={4}
      />
      <line x1={-hw * 0.4} y1={-hh} x2={hw * 0.4} y2={-hh} stroke="#6b7580" strokeWidth={4} />
    </g>
  );
}

function ShapeConveyor({ w, h }: { w: number; h: number }) {
  const hw = w / 2;
  const hh = h / 2;
  const rollerCount = Math.max(2, Math.floor(w / 30));
  return (
    <g>
      <rect x={-hw} y={-hh} width={w} height={h} rx={4} fill="url(#g-dark)" />
      {Array.from({ length: rollerCount }, (_, i) => {
        const rx = -hw + ((i + 0.5) * w) / rollerCount;
        return (
          <ellipse key={i} cx={rx} cy={0} rx={4} ry={hh * 0.7} fill="url(#g-steel)" />
        );
      })}
    </g>
  );
}

// ─── Car-specific shapes ─────────────────────────────────────────────────────

function ShapeCarEngine({ w, h }: { w: number; h: number }) {
  const hw = w / 2, hh = h / 2;
  const blockH = h * 0.5, blockY = hh - blockH;
  const headH = h * 0.2, headY = blockY - headH;
  const vcH = h * 0.12, vcY = headY - vcH;
  const oilPanH = h * 0.18;
  const cylCount = 4, cylW = (w * 0.7) / cylCount;
  const cylStartX = -w * 0.35;
  return (
    <g>
      {/* Oil pan */}
      <rect x={-hw * 0.8} y={hh - oilPanH} width={w * 0.8} height={oilPanH} rx={3} fill="url(#g-dark)" />
      {/* Engine block */}
      <rect x={-hw} y={blockY} width={w} height={blockH} rx={4} fill="url(#g-motor)" />
      {/* Cylinder bores */}
      {Array.from({ length: cylCount }, (_, i) => (
        <rect key={i} x={cylStartX + i * (cylW + 2)} y={blockY + 6} width={cylW - 2} height={blockH - 12} rx={2} fill="#1a2230" opacity={0.7} />
      ))}
      {/* Cylinder head */}
      <rect x={-hw + 6} y={headY} width={w - 12} height={headH} rx={3} fill="url(#g-steel)" />
      {/* Valve cover */}
      <rect x={-hw + 12} y={vcY} width={w - 24} height={vcH} rx={3} fill="url(#g-dark)" />
      {/* Oil filler cap */}
      <circle cx={hw * 0.5} cy={vcY + vcH * 0.5} r={6} fill="#3a4048" stroke="#6b7580" strokeWidth={1.5} />
      {/* Timing cover on left */}
      <rect x={-hw} y={headY} width={14} height={blockH + headH} rx={2} fill="url(#g-casing)" />
      {/* Accessory pulley */}
      <circle cx={-hw - 2} cy={blockY + blockH * 0.4} r={9} fill="url(#g-dark)" stroke="#6b7580" strokeWidth={1.5} />
    </g>
  );
}

function ShapeCarTransmission({ w, h }: { w: number; h: number }) {
  const hw = w / 2;
  const bellW = w * 0.42, bodyW = w * 0.58;
  const bellH = h * 0.78;
  const bodyH = h * 0.6;
  return (
    <g>
      {/* Main body (tapers toward right) */}
      <polygon
        points={`${-hw},${-bodyH/2} ${-hw + bodyW},${-bodyH * 0.35} ${-hw + bodyW},${bodyH * 0.35} ${-hw},${bodyH/2}`}
        fill="url(#g-motor)"
      />
      {/* Bell housing (left, circular-ish) */}
      <ellipse cx={hw - bellW * 0.5} cy={0} rx={bellW * 0.38} ry={bellH / 2} fill="url(#g-steel)" />
      <ellipse cx={hw - bellW * 0.5} cy={0} rx={bellW * 0.22} ry={bellH * 0.28} fill="url(#g-dark)" />
      {/* Output shaft stub */}
      <rect x={-hw - 10} y={-5} width={14} height={10} rx={2} fill="#6b7580" />
      {/* Ribbing lines */}
      {Array.from({ length: 3 }, (_, i) => (
        <line key={i} x1={-hw + 10 + i * (bodyW * 0.3)} y1={-bodyH * 0.4} x2={-hw + 10 + i * (bodyW * 0.3)} y2={bodyH * 0.4} stroke="#3a4048" strokeWidth={1.5} />
      ))}
    </g>
  );
}

function ShapeCarWheel({ w, h }: { w: number; h: number }) {
  const r = Math.min(w, h) * 0.46;
  const tireW = r * 0.22;
  const rimR = r - tireW;
  const hubR = rimR * 0.22;
  const spokeCount = 5;
  return (
    <g>
      {/* Tire */}
      <circle cx={0} cy={0} r={r} fill="#1a1e24" />
      <circle cx={0} cy={0} r={r - 2} fill="none" stroke="#2a3040" strokeWidth={tireW * 1.5} />
      {/* Rim */}
      <circle cx={0} cy={0} r={rimR} fill="url(#g-steel)" />
      {/* Spokes */}
      {Array.from({ length: spokeCount }, (_, i) => {
        const a = (i * Math.PI * 2) / spokeCount - Math.PI / 2;
        const spokeInner = hubR * 1.4;
        const spokeOuter = rimR * 0.88;
        const bw = rimR * 0.14;
        const mx = Math.cos(a), my = Math.sin(a);
        const px = -my * bw, py = mx * bw;
        return (
          <polygon key={i}
            points={`${mx * spokeInner + px * 0.7},${my * spokeInner + py * 0.7} ${mx * spokeOuter + px * 0.3},${my * spokeOuter + py * 0.3} ${mx * spokeOuter - px * 0.3},${my * spokeOuter - py * 0.3} ${mx * spokeInner - px * 0.7},${my * spokeInner - py * 0.7}`}
            fill="url(#g-dark)"
          />
        );
      })}
      {/* Hub */}
      <circle cx={0} cy={0} r={hubR * 1.1} fill="url(#g-casing)" stroke="#8a90a0" strokeWidth={1.5} />
      <circle cx={0} cy={0} r={hubR * 0.5} fill="#1a2230" />
    </g>
  );
}

function ShapeCarBrakes({ w, h }: { w: number; h: number }) {
  const r = Math.min(w, h) * 0.44;
  const innerR = r * 0.42;
  const hubR = r * 0.14;
  const slotCount = 8;
  // Caliper
  const calW = r * 0.7, calH = r * 0.55;
  return (
    <g>
      {/* Disc rotor */}
      <circle cx={0} cy={0} r={r} fill="#3a3a42" />
      {/* Vented slots */}
      {Array.from({ length: slotCount }, (_, i) => {
        const a = (i * Math.PI * 2) / slotCount;
        const x1 = Math.cos(a) * (innerR + 4), y1 = Math.sin(a) * (innerR + 4);
        const x2 = Math.cos(a) * (r - 4), y2 = Math.sin(a) * (r - 4);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5a5a65" strokeWidth={3} />;
      })}
      <circle cx={0} cy={0} r={innerR} fill="#2a2a32" />
      {/* Hat / hub area */}
      <circle cx={0} cy={0} r={hubR * 1.5} fill="url(#g-steel)" />
      <circle cx={0} cy={0} r={hubR} fill="#1a2230" />
      {/* Caliper body (top-right) */}
      <rect x={r * 0.3} y={-calH / 2} width={calW} height={calH} rx={5} fill="url(#g-motor)" />
      {/* Caliper bridge */}
      <rect x={r * 0.3 + 4} y={-calH / 2 + 5} width={calW - 8} height={calH * 0.35} rx={2} fill="#3a4050" />
      <rect x={r * 0.3 + 4} y={calH / 2 - calH * 0.35 - 5} width={calW - 8} height={calH * 0.35} rx={2} fill="#3a4050" />
    </g>
  );
}

function ShapeCarRadiator({ w, h }: { w: number; h: number }) {
  const hw = w / 2, hh = h / 2;
  const tankW = w * 0.1;
  const coreW = w - tankW * 2;
  const finCount = Math.floor(coreW / 7);
  const tubeCount = 5;
  return (
    <g>
      {/* Left tank */}
      <rect x={-hw} y={-hh} width={tankW} height={h} rx={3} fill="url(#g-steel)" />
      {/* Right tank */}
      <rect x={hw - tankW} y={-hh} width={tankW} height={h} rx={3} fill="url(#g-steel)" />
      {/* Core background */}
      <rect x={-hw + tankW} y={-hh} width={coreW} height={h} fill="#1e252e" />
      {/* Horizontal tubes */}
      {Array.from({ length: tubeCount }, (_, i) => {
        const ty = -hh + (h / (tubeCount + 1)) * (i + 1);
        return <rect key={i} x={-hw + tankW} y={ty - 4} width={coreW} height={8} rx={1} fill="#3a5060" />;
      })}
      {/* Vertical fins */}
      {Array.from({ length: finCount }, (_, i) => {
        const fx = -hw + tankW + (i + 0.5) * (coreW / finCount);
        return <line key={i} x1={fx} y1={-hh + 4} x2={fx} y2={hh - 4} stroke="#2a3a48" strokeWidth={1} />;
      })}
      {/* Hose connections */}
      <rect x={-hw - 8} y={-hh + 6} width={10} height={12} rx={2} fill="#4a5568" />
      <rect x={-hw - 8} y={hh - 18} width={10} height={12} rx={2} fill="#4a5568" />
    </g>
  );
}

function ShapeCarFuelTank({ w, h }: { w: number; h: number }) {
  const hw = w / 2, hh = h / 2;
  return (
    <g>
      {/* Saddle-shaped tank body */}
      <rect x={-hw} y={-hh + 12} width={w} height={h - 24} rx={10} fill="url(#g-dark)" />
      {/* Saddle dip (center top) */}
      <rect x={-hw * 0.3} y={-hh + 10} width={hw * 0.6} height={18} rx={4} fill="#1a2028" />
      {/* Fuel pump module */}
      <rect x={-10} y={-hh + 4} width={20} height={22} rx={3} fill="url(#g-steel)" />
      <circle cx={0} cy={-hh + 8} r={5} fill="#2a3040" stroke="#6b7580" strokeWidth={1} />
      {/* Filler neck stub */}
      <rect x={hw - 18} y={-hh - 4} width={16} height={16} rx={3} fill="#4a5568" />
      {/* Level indicator line */}
      <line x1={-hw + 14} y1={0} x2={hw - 14} y2={0} stroke="#3a5060" strokeWidth={1.5} strokeDasharray="6 4" />
      {/* Straps */}
      <rect x={-hw * 0.6} y={hh - 10} width={w * 0.6} height={6} rx={2} fill="#3a4048" />
    </g>
  );
}

function ShapeCarBattery({ w, h }: { w: number; h: number }) {
  const hw = w / 2, hh = h / 2;
  const cellW = (w - 20) / 6;
  return (
    <g>
      {/* Main case */}
      <rect x={-hw} y={-hh + 10} width={w} height={h - 10} rx={5} fill="url(#g-dark)" />
      {/* Top cover */}
      <rect x={-hw + 4} y={-hh + 5} width={w - 8} height={14} rx={3} fill="#2a3240" />
      {/* Cell vents */}
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={-hw + 10 + i * (cellW + 2)} y={-hh + 8} width={cellW} height={8} rx={2} fill="#1a2030" />
      ))}
      {/* Positive terminal */}
      <rect x={-hw + 12} y={-hh - 2} width={16} height={12} rx={2} fill="#ef4444" />
      <rect x={-hw + 17} y={-hh - 8} width={6} height={10} rx={1} fill="#ef4444" />
      {/* Negative terminal */}
      <rect x={hw - 28} y={-hh - 2} width={16} height={12} rx={2} fill="#6b7580" />
      <rect x={hw - 23} y={-hh - 8} width={6} height={10} rx={1} fill="#6b7580" />
      {/* Label */}
      <rect x={-hw * 0.5} y={-hh * 0.1} width={w * 0.5} height={hh * 0.7} rx={3} fill="#1e3050" />
      <text x={0} y={hh * 0.3} textAnchor="middle" fontSize={12} fill="#93c5fd" fontWeight="bold">12V</text>
    </g>
  );
}

function ShapeCarSuspension({ w, h }: { w: number; h: number }) {
  const hw = w / 2, hh = h / 2;
  const damperW = w * 0.22;
  const damperX = -damperW / 2;
  const springCoils = 6;
  const springTop = -hh + h * 0.08;
  const springBot = hh - h * 0.38;
  const springH = springBot - springTop;
  const coilStep = springH / springCoils;
  const coilAmp = w * 0.24;
  return (
    <g>
      {/* Upper mount plate */}
      <rect x={-hw * 0.5} y={-hh} width={w * 0.5} height={8} rx={2} fill="url(#g-steel)" />
      {/* Spring coils */}
      {Array.from({ length: springCoils }, (_, i) => {
        const y0 = springTop + i * coilStep;
        const y1 = y0 + coilStep;
        const left = i % 2 === 0;
        return (
          <path key={i}
            d={`M ${left ? -coilAmp : coilAmp} ${y0} Q ${left ? coilAmp : -coilAmp} ${(y0 + y1) / 2} ${left ? -coilAmp : coilAmp} ${y1}`}
            fill="none" stroke="url(#g-steel)" strokeWidth={5} strokeLinecap="round" />
        );
      })}
      {/* Damper body */}
      <rect x={damperX} y={springBot} width={damperW} height={h * 0.28} rx={3} fill="url(#g-motor)" />
      {/* Damper rod */}
      <rect x={damperX + damperW * 0.3} y={springBot - h * 0.12} width={damperW * 0.4} height={h * 0.16} rx={2} fill="url(#g-steel)" />
      {/* Lower control arm */}
      <path d={`M ${-hw} ${hh} L ${hw * 0.1} ${springBot + h * 0.28}`} stroke="url(#g-dark)" strokeWidth={8} strokeLinecap="round" fill="none" />
      {/* Lower mount */}
      <circle cx={-hw} cy={hh} r={7} fill="url(#g-steel)" />
      <circle cx={-hw} cy={hh} r={3} fill="#1a2230" />
    </g>
  );
}

function ShapeCarBody({ w, h }: { w: number; h: number }) {
  const hw = w / 2, hh = h / 2;
  // Sedan silhouette side view
  const floorY = hh * 0.55;
  const roofY = -hh * 0.65;
  const hoodX = hw * 0.55;
  const trunkX = -hw * 0.55;
  const wheelRad = h * 0.22;
  return (
    <g>
      {/* Car body outline */}
      <path
        d={`
          M ${-hw} ${floorY}
          L ${-hw} ${floorY - h * 0.12}
          Q ${trunkX} ${floorY - h * 0.28} ${trunkX * 0.3} ${roofY}
          Q ${0} ${roofY - h * 0.12} ${hoodX * 0.35} ${roofY}
          Q ${hoodX} ${floorY - h * 0.25} ${hw} ${floorY - h * 0.12}
          L ${hw} ${floorY}
          Z
        `}
        fill="url(#g-casing)"
        stroke="#5a6270"
        strokeWidth={1.5}
      />
      {/* Windshield */}
      <path
        d={`M ${hoodX * 0.35} ${roofY + 2} Q ${hoodX * 0.55} ${roofY - h * 0.08} ${hoodX * 0.7} ${roofY + h * 0.18}`}
        fill="#1e3a5a" stroke="#3a5a7a" strokeWidth={1}
      />
      {/* Rear window */}
      <path
        d={`M ${trunkX * 0.3} ${roofY + 2} Q ${trunkX * 0.55} ${roofY - h * 0.06} ${trunkX * 0.7} ${roofY + h * 0.18}`}
        fill="#1e3a5a" stroke="#3a5a7a" strokeWidth={1}
      />
      {/* Side window */}
      <rect x={trunkX * 0.65} y={roofY + 2} width={(hoodX - trunkX) * 0.28} height={h * 0.16} rx={2} fill="#1e3a5a" stroke="#3a5a7a" strokeWidth={1} />
      {/* Wheels */}
      <circle cx={-hw * 0.55} cy={floorY + wheelRad * 0.5} r={wheelRad} fill="#1a1e24" />
      <circle cx={-hw * 0.55} cy={floorY + wheelRad * 0.5} r={wheelRad * 0.62} fill="#3a4050" />
      <circle cx={ hw * 0.55} cy={floorY + wheelRad * 0.5} r={wheelRad} fill="#1a1e24" />
      <circle cx={ hw * 0.55} cy={floorY + wheelRad * 0.5} r={wheelRad * 0.62} fill="#3a4050" />
      {/* Door line */}
      <line x1={0} y1={roofY + 4} x2={0} y2={floorY - 4} stroke="#3a4048" strokeWidth={1.5} />
    </g>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  Electrical:       "#3b6ab0",
  Mechanical:       "#5a6270",
  Drivetrain:       "#5a4a8a",
  Braking:          "#8a3838",
  Suspension:       "#3a6a5a",
  Body:             "#3a5a7a",
  "Fuel System":    "#7a5a2a",
  Piping:           "#2a5a6a",
  Instrumentation:  "#7a6a2a",
  Foundation:       "#4a4a4a",
};

function ShapeGeneric({ w, h, category }: { w: number; h: number; category: string }) {
  const hw = w / 2;
  const hh = h / 2;
  const catColor = CATEGORY_COLORS[category] ?? "#4a5060";
  return (
    <g>
      <rect x={-hw} y={-hh} width={w} height={h} rx={6} fill="url(#g-dark)" />
      <rect x={-hw} y={-hh} width={w} height={h} rx={6} fill={catColor} fillOpacity={0.6} />
      <line x1={-hw + 12} y1={-hh * 0.5} x2={hw - 12} y2={-hh * 0.5} stroke="#6b7580" strokeWidth={1} />
      <line x1={-hw + 12} y1={0}          x2={hw - 12} y2={0}          stroke="#6b7580" strokeWidth={1} />
      <line x1={-hw + 12} y1={ hh * 0.5}  x2={hw - 12} y2={ hh * 0.5}  stroke="#6b7580" strokeWidth={1} />
    </g>
  );
}

function resolveShape(id: string, category: string, w: number, h: number): ReactElement {
  // Pump-specific by component ID
  switch (id) {
    case "motor":              return <ShapeMotor w={w} h={h} />;
    case "coupling":           return <ShapeCoupling w={w} h={h} />;
    case "bearing-housing":    return <ShapeBearingHousing w={w} h={h} />;
    case "shaft":              return <ShapeShaft w={w} h={h} />;
    case "mechanical-seal":    return <ShapeMechanicalSeal w={w} h={h} />;
    case "pump-casing":        return <ShapePumpCasing w={w} h={h} />;
    case "impeller":           return <ShapeImpeller w={w} h={h} />;
    case "base-plate":         return <ShapeBasePlate w={w} h={h} />;
    case "foundation":         return <ShapeFoundation w={w} h={h} />;
    case "outlet-pipe":        return <ShapePipe w={w} h={h} vertical />;
    case "inlet-pipe":         return <ShapePipe w={w} h={h} vertical />;
    case "pressure-gauge":     return <ShapePressureGauge w={w} h={h} />;
    case "temperature-sensor": return <ShapeTemperatureSensor w={w} h={h} />;
    // Car-specific
    case "car-engine":         return <ShapeCarEngine w={w} h={h} />;
    case "car-transmission":   return <ShapeCarTransmission w={w} h={h} />;
    case "car-fl-wheel":
    case "car-fr-wheel":
    case "car-rl-wheel":
    case "car-rr-wheel":       return <ShapeCarWheel w={w} h={h} />;
    case "car-brakes":         return <ShapeCarBrakes w={w} h={h} />;
    case "car-fuel-tank":      return <ShapeCarFuelTank w={w} h={h} />;
    case "car-battery":        return <ShapeCarBattery w={w} h={h} />;
    case "car-radiator":       return <ShapeCarRadiator w={w} h={h} />;
    case "car-suspension":     return <ShapeCarSuspension w={w} h={h} />;
    case "car-body":           return <ShapeCarBody w={w} h={h} />;
  }

  // Generic by ID hints
  const lc = id.toLowerCase();
  if (lc.includes("wheel") || lc.includes("tyre") || lc.includes("tire")) return <ShapeWheel w={w} h={h} />;
  if (lc.includes("engine"))                                                return <ShapeMotor w={w} h={h} />;
  if (lc.includes("gearbox") || lc.includes("transmission"))               return <ShapeGearbox w={w} h={h} />;
  if (lc.includes("tank"))                                                  return <ShapeTank w={w} h={h} />;
  if (lc.includes("battery"))                                               return <ShapeBattery w={w} h={h} />;
  if (lc.includes("exhaust"))                                               return <ShapeExhaust w={w} h={h} />;
  if (lc.includes("brake") || lc.includes("disc"))                         return <ShapeDisc w={w} h={h} />;
  if (lc.includes("fork"))                                                  return <ShapeFork w={w} h={h} />;
  if (lc.includes("shock"))                                                 return <ShapeShock w={w} h={h} />;
  if (lc.includes("frame"))                                                 return <ShapeFrame w={w} h={h} />;
  if (lc.includes("belt") || lc.includes("conveyor"))                      return <ShapeConveyor w={w} h={h} />;

  return <ShapeGeneric w={w} h={h} category={category} />;
}

// ─── Single Component Tile ────────────────────────────────────────────────────

interface ComponentTileProps {
  component: MachineComponent;
  x: number;
  y: number;
  w: number;
  h: number;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHover: (id: string | null) => void;
}

function ComponentTile({
  component,
  x,
  y,
  w,
  h,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}: ComponentTileProps) {
  const strokeColor = isSelected ? "#3b82f6" : isHovered ? "#93c5fd" : "#3a4048";
  const strokeWidth = isSelected ? 2.5 : isHovered ? 1.8 : 1;
  const statusColor =
    component.status === "healthy" ? "#22c55e"
    : component.status === "warning" ? "#f59e0b"
    : "#ef4444";

  const half_w = w / 2;
  const half_h = h / 2;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      style={{ transition: "transform 0.65s cubic-bezier(0.4,0,0.2,1)", cursor: "pointer" }}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      onPointerEnter={() => onHover(component.id)}
      onPointerLeave={() => onHover(null)}
    >
      {/* Selection outline */}
      {isSelected && (
        <rect
          x={-half_w - 4}
          y={-half_h - 4}
          width={w + 8}
          height={h + 8}
          rx={8}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={1.5}
          opacity={0.5}
        />
      )}

      {/* Shape */}
      <g stroke={strokeColor} strokeWidth={strokeWidth}>
        {resolveShape(component.id, component.category, w, h)}
      </g>

      {/* Status dot */}
      <circle
        cx={half_w - 4}
        cy={-half_h + 4}
        r={4}
        fill={statusColor}
        stroke="#14171a"
        strokeWidth={1}
      />

      {/* Label (shown when selected or hovered) */}
      {(isSelected || isHovered) && (
        <text
          y={half_h + 14}
          textAnchor="middle"
          fontSize={10}
          fill={isSelected ? "#3b82f6" : "#7dd3fc"}
          fontFamily="ui-monospace,monospace"
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          {component.name}
        </text>
      )}
    </g>
  );
}

// ─── Main Viewer ──────────────────────────────────────────────────────────────

export function MachineViewer2D() {
  const selectedMachineId  = useMachineStore((s) => s.selectedMachineId);
  const selectedComponentId = useMachineStore((s) => s.selectedComponentId);
  const hoveredComponentId  = useMachineStore((s) => s.hoveredComponentId);
  const explodedView        = useMachineStore((s) => s.explodedView);
  const visibleLayers       = useMachineStore((s) => s.visibleLayers);
  const cameraResetToken    = useMachineStore((s) => s.cameraResetToken);
  const selectComponent     = useMachineStore((s) => s.selectComponent);
  const setHoveredComponent = useMachineStore((s) => s.setHoveredComponent);

  const rawComponents = getActiveMachineComponents(selectedMachineId);
  const components = useLocalizedComponents(rawComponents, selectedMachineId);

  const layout = getDiagramLayout(selectedMachineId, components);

  // Pan/zoom state held in a ref to avoid re-renders during dragging
  const transformRef = useRef<Transform>({ x: 0, y: 0, scale: 1 });
  const svgWrapperRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });

  // Apply CSS transform to wrapper div
  const applyTransform = useCallback((t: Transform) => {
    if (svgWrapperRef.current) {
      svgWrapperRef.current.style.transform =
        `translate(${t.x}px, ${t.y}px) scale(${t.scale})`;
    }
  }, []);

  // Reset when cameraResetToken changes
  useEffect(() => {
    transformRef.current = { x: 0, y: 0, scale: 1 };
    applyTransform(transformRef.current);
  }, [cameraResetToken, applyTransform]);

  const handlePointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    // Only drag on the background (target === currentTarget or svg/rect background)
    if ((e.target as Element).closest("g[data-component]")) return;
    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    transformRef.current = {
      ...transformRef.current,
      x: transformRef.current.x + dx,
      y: transformRef.current.y + dy,
    };
    applyTransform(transformRef.current);
  }, [applyTransform]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleWheel = useCallback((e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.min(4, Math.max(0.3, transformRef.current.scale * delta));

    // Zoom toward mouse position
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const scaleRatio = newScale / transformRef.current.scale;
    transformRef.current = {
      x: transformRef.current.x + (mouseX - centerX - transformRef.current.x) * (1 - scaleRatio),
      y: transformRef.current.y + (mouseY - centerY - transformRef.current.y) * (1 - scaleRatio),
      scale: newScale,
    };
    applyTransform(transformRef.current);
  }, [applyTransform]);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: "#14171a",
        cursor: isDragging.current ? "grabbing" : "grab",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
    >
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#2a2f35 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* SVG wrapper — transform applied here */}
      <div
        ref={svgWrapperRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        <svg
          viewBox={layout.viewBox}
          style={{ width: "100%", height: "100%", overflow: "visible" }}
          onClick={() => selectComponent(null)}
        >
          <SvgDefs />

          {components.map((comp) => {
            if (!visibleLayers.includes(comp.category)) return null;
            const pos = layout.positions[comp.id];
            if (!pos) return null;

            const tx = pos.x + (explodedView ? pos.ex : 0);
            const ty = pos.y + (explodedView ? pos.ey : 0);
            const isSelected = selectedComponentId === comp.id;
            const isHovered = hoveredComponentId === comp.id;

            return (
              <ComponentTile
                key={comp.id}
                component={comp}
                x={tx}
                y={ty}
                w={pos.w}
                h={pos.h}
                isSelected={isSelected}
                isHovered={isHovered}
                onSelect={() => selectComponent(comp.id)}
                onHover={setHoveredComponent}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
