import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

/* ═══════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════ */
const PARTICLE_COUNT      = 340;
const CONNECTION_DISTANCE = 2.9;
const CONN_DIST_SQ        = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

/* Scene bounds — spread across generous volume */
const BOUNDS = { x: 10, y: 7.5, z: 5 };

/* Speed ranges (units / second) */
const SPEED_MIN = 4.60;
const SPEED_MAX = 25.20;

/* ═══════════════════════════════════════════════
   DETERMINISTIC PSEUDO-RANDOM
   No Math.random() — safe for module-level use
═══════════════════════════════════════════════ */
function pr(seed) {
  const v = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return v - Math.floor(v);
}

/* ═══════════════════════════════════════════════
   CIRCULAR GLOW TEXTURE
   Built once at module level via OffscreenCanvas.
   Falls back to a plain ImageData if OffscreenCanvas
   is unavailable (SSR / old browsers).
═══════════════════════════════════════════════ */
function makeGlowTexture() {
  const size = 256; /* larger canvas = sharper glow at bigger rendered size */
  let ctx;

  if (typeof OffscreenCanvas !== "undefined") {
    const oc = new OffscreenCanvas(size, size);
    ctx = oc.getContext("2d");
  } else {
    /* Fallback: create an in-memory canvas */
    const el = document.createElement("canvas");
    el.width  = size;
    el.height = size;
    ctx = el.getContext("2d");
  }

  const half = size / 2;
  const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
  grad.addColorStop(0.00, "rgba(255, 220, 180, 1.00)"); /* warm light core */
  grad.addColorStop(0.12, "rgba(230, 170, 100, 1.00)"); /* bright inner brown/tan */
  grad.addColorStop(0.30, "rgba(190, 120,  60, 0.95)"); /* strong brown mid */
  grad.addColorStop(0.50, "rgba(150,  90,  40, 0.75)"); /* medium brown glow */
  grad.addColorStop(0.70, "rgba(110,  60,  20, 0.45)"); /* wide outer brown halo */
  grad.addColorStop(0.88, "rgba( 80,  40,  10, 0.18)"); /* very soft halo edge */
  grad.addColorStop(1.00, "rgba(  0,   0,   0, 0.00)"); /* transparent edge */

  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(ctx.canvas);
  tex.needsUpdate = true;
  return tex;
}

const GLOW_TEXTURE = makeGlowTexture();

/* ═══════════════════════════════════════════════
   PER-PARTICLE DATA
   Built once at module level. Each particle has:
   - position (x, y, z)
   - current velocity (vx, vy, vz)
   - target velocity  (targetVx, targetVy, targetVz)
   - lerp speed  (lerpRate — differs per particle)
   - oscillation (phase, frequency, amplitude per axis)
   - direction-change timer
   - size category
═══════════════════════════════════════════════ */
function buildParticleData() {
  const data = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    /* ── Initial position spread across full volume ── */
    const px = (pr(i * 7 + 1) - 0.5) * BOUNDS.x * 2;
    const py = (pr(i * 7 + 2) - 0.5) * BOUNDS.y * 2;
    const pz = (pr(i * 7 + 3) - 0.5) * BOUNDS.z * 2;

    /* ── Speed scalar — different per particle ── */
    const speed = SPEED_MIN + pr(i * 7 + 7) * (SPEED_MAX - SPEED_MIN);

    /* Direction vector (random unit-ish) */
    const dx = pr(i * 7 + 4) - 0.5;
    const dy = pr(i * 7 + 5) - 0.5;
    const dz = (pr(i * 7 + 6) - 0.5) * 0.8; /* slightly less Z */
    const dLen = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;

    const vx = (dx / dLen) * speed;
    const vy = (dy / dLen) * speed;
    const vz = (dz / dLen) * speed;

    /* ── Per-particle oscillation ── */
    const oscPhaseX = pr(i * 13 + 1) * Math.PI * 2;
    const oscPhaseY = pr(i * 13 + 2) * Math.PI * 2;
    const oscPhaseZ = pr(i * 13 + 3) * Math.PI * 2;
    const oscFreqX  = 0.18 + pr(i * 13 + 4) * 0.22;
    const oscFreqY  = 0.14 + pr(i * 13 + 5) * 0.20;
    const oscFreqZ  = 0.10 + pr(i * 13 + 6) * 0.18;
    const oscAmpX   = 0.08 + pr(i * 13 + 7) * 0.10;
    const oscAmpY   = 0.08 + pr(i * 13 + 8) * 0.10;
    const oscAmpZ   = 0.06 + pr(i * 13 + 9) * 0.08;

    /* ── Direction-change interval: 1.0 – 3.5 s ── */
    const changeInterval = 1.0 + pr(i * 13 + 10) * 2.5;
    /* Stagger so particles never all change simultaneously */
    const nextChangeAt   = pr(i * 13 + 11) * changeInterval;

    /* ── Lerp rate: how fast it smoothly turns ── */
    const lerpRate = 0.010 + pr(i * 19 + 3) * 0.012;

    data.push({
      x: px, y: py, z: pz,
      vx, vy, vz,
      targetVx: vx, targetVy: vy, targetVz: vz,
      speed,
      oscPhaseX, oscPhaseY, oscPhaseZ,
      oscFreqX,  oscFreqY,  oscFreqZ,
      oscAmpX,   oscAmpY,   oscAmpZ,
      changeInterval,
      nextChangeAt,
      lerpRate,
      dirSeed: pr(i * 17 + 3),
    });
  }

  return data;
}

const PARTICLES = buildParticleData();

/* ═══════════════════════════════════════════════
   SIZE ARRAY  — determined once, never changes.
   ~80% small  |  ~12% medium  |  ~8% hub
═══════════════════════════════════════════════ */
function buildSizeArray() {
  const sizes = new Float32Array(PARTICLE_COUNT);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r = pr(i * 23 + 7);
    if (r > 0.92) {
      /* hub — ~8%: large glowing orbs */
      sizes[i] = 0.30 + pr(i * 23 + 8) * 0.18;
    } else if (r > 0.80) {
      /* medium — ~12% */
      sizes[i] = 0.18 + pr(i * 23 + 9) * 0.09;
    } else {
      /* small — ~80% */
      sizes[i] = 0.10 + pr(i * 23 + 10) * 0.06;
    }
  }
  return sizes;
}

const PARTICLE_SIZES = buildSizeArray();

/* ═══════════════════════════════════════════════
   PRE-ALLOCATED GPU BUFFERS
═══════════════════════════════════════════════ */
const particlePosBuf  = new Float32Array(PARTICLE_COUNT * 3);
const MAX_CONNECTIONS  = Math.ceil(PARTICLE_COUNT * (PARTICLE_COUNT - 1) / 2);
const connectionBuf    = new Float32Array(MAX_CONNECTIONS * 6);

/* ═══════════════════════════════════════════════
   BOUNDARY SMOOTH STEERING
   Instead of hard-flipping, gently nudge velocity
   toward centre when a particle nears an edge.
═══════════════════════════════════════════════ */
function steerVelocity(pos, vel, limit) {
  const edge = limit * 0.80;
  if (pos > edge) {
    /* Strength grows from 0→1 as particle goes from edge→limit */
    const strength = (pos - edge) / (limit - edge);
    return vel - strength * Math.abs(vel) * 2.0;
  }
  if (pos < -edge) {
    const strength = (-pos - edge) / (limit - edge);
    return vel + strength * Math.abs(vel) * 2.0;
  }
  return vel;
}

/* ═══════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════ */
export default function NetworkSystem() {
  const particleAttrRef   = useRef(null);
  const sizeAttrRef       = useRef(null);
  const connectionAttrRef = useRef(null);
  const connectionGeoRef  = useRef(null);
  const groupRef          = useRef(null);
  const parallaxRef       = useRef({ x: 0, y: 0 });

  /* Build a stable size attribute array once */
  const sizeArray = useMemo(() => PARTICLE_SIZES, []);

  useFrame(({ clock, mouse }) => {
    const time = clock.getElapsedTime();
    const dt   = Math.min(clock.getDelta(), 0.033); /* cap at ~30fps equiv */

    /* ────────────────────────────────────────────
       1. UPDATE PARTICLES
    ──────────────────────────────────────────── */
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = PARTICLES[i];

      /* ── Staggered direction change → pick new target velocity ── */
      if (time >= p.nextChangeAt) {
        const tBucket = Math.floor(time / p.changeInterval);
        const seed    = i * 31 + tBucket * 97;

        /* New random direction, scaled to this particle's speed */
        const ndx = pr(seed + 1) - 0.5;
        const ndy = pr(seed + 2) - 0.5;
        const ndz = (pr(seed + 3) - 0.5) * 0.8;
        const nLen = Math.sqrt(ndx * ndx + ndy * ndy + ndz * ndz) || 1;

        p.targetVx = (ndx / nLen) * p.speed;
        p.targetVy = (ndy / nLen) * p.speed;
        p.targetVz = (ndz / nLen) * p.speed;

        p.nextChangeAt = time + p.changeInterval * (0.75 + pr(seed + 4) * 0.5);
        p.dirSeed      = pr(seed + 5);
      }

      /* ── Smooth lerp toward target velocity ── */
      p.vx += (p.targetVx - p.vx) * p.lerpRate;
      p.vy += (p.targetVy - p.vy) * p.lerpRate;
      p.vz += (p.targetVz - p.vz) * p.lerpRate;

      /* ── Boundary smooth steering ── */
      p.vx = steerVelocity(p.x, p.vx, BOUNDS.x);
      p.vy = steerVelocity(p.y, p.vy, BOUNDS.y);
      p.vz = steerVelocity(p.z, p.vz, BOUNDS.z);

      /* ── Integrate position ── */
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.z += p.vz * dt;

      /* ── Independent per-axis oscillation ── */
      const ox = Math.sin(time * p.oscFreqX + p.oscPhaseX) * p.oscAmpX;
      const oy = Math.sin(time * p.oscFreqY + p.oscPhaseY) * p.oscAmpY;
      const oz = Math.sin(time * p.oscFreqZ + p.oscPhaseZ) * p.oscAmpZ;

      const off = i * 3;
      particlePosBuf[off]     = p.x + ox;
      particlePosBuf[off + 1] = p.y + oy;
      particlePosBuf[off + 2] = p.z + oz;
    }

    if (particleAttrRef.current) {
      particleAttrRef.current.needsUpdate = true;
    }

    /* ────────────────────────────────────────────
       2. LIVE CONNECTIONS
    ──────────────────────────────────────────── */
    let connIdx = 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const io = i * 3;
      const ax = particlePosBuf[io];
      const ay = particlePosBuf[io + 1];
      const az = particlePosBuf[io + 2];

      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const jo = j * 3;
        const dx = ax - particlePosBuf[jo];
        const dy = ay - particlePosBuf[jo + 1];
        const dz = az - particlePosBuf[jo + 2];

        if (dx * dx + dy * dy + dz * dz < CONN_DIST_SQ) {
          const base = connIdx * 6;
          connectionBuf[base]     = ax;
          connectionBuf[base + 1] = ay;
          connectionBuf[base + 2] = az;
          connectionBuf[base + 3] = particlePosBuf[jo];
          connectionBuf[base + 4] = particlePosBuf[jo + 1];
          connectionBuf[base + 5] = particlePosBuf[jo + 2];
          connIdx++;
        }
      }
    }

    if (connectionAttrRef.current && connectionGeoRef.current) {
      connectionAttrRef.current.needsUpdate = true;
      connectionGeoRef.current.setDrawRange(0, connIdx * 2);
    }

    /* ────────────────────────────────────────────
       3. MOUSE PARALLAX — position only, zero rotation
    ──────────────────────────────────────────── */
    if (groupRef.current) {
      const tx = mouse.x * 0.20;
      const ty = mouse.y * 0.20;

      parallaxRef.current.x += (tx - parallaxRef.current.x) * 0.04;
      parallaxRef.current.y += (ty - parallaxRef.current.y) * 0.04;

      groupRef.current.position.x = parallaxRef.current.x;
      groupRef.current.position.y = parallaxRef.current.y;

      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.y = 0;
      groupRef.current.rotation.z = 0;
    }
  });

  return (
    <group ref={groupRef}>

      {/* ───── GLOWING CIRCULAR PARTICLES ───── */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            ref={particleAttrRef}
            attach="attributes-position"
            array={particlePosBuf}
            count={PARTICLE_COUNT}
            itemSize={3}
          />
          <bufferAttribute
            ref={sizeAttrRef}
            attach="attributes-size"
            array={sizeArray}
            count={PARTICLE_COUNT}
            itemSize={1}
          />
        </bufferGeometry>

        {/*
          map must be set for the texture to work.
          vertexColors=false keeps the gold tint from `color`.
          sizeAttenuation makes far particles smaller.
        */}
        <pointsMaterial
          color="#d28a50"
          map={GLOW_TEXTURE}
          size={0.22}
          sizeAttenuation
          transparent
          opacity={0.98}
          depthWrite={false}
          alphaTest={0.001}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* ───── GOLD CONNECTIONS ───── */}
      <lineSegments>
        <bufferGeometry ref={connectionGeoRef}>
          <bufferAttribute
            ref={connectionAttrRef}
            attach="attributes-position"
            array={connectionBuf}
            count={MAX_CONNECTIONS * 2}
            itemSize={3}
          />
        </bufferGeometry>

        <lineBasicMaterial
          color="#8b5a2b"
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </lineSegments>

    </group>
  );
}