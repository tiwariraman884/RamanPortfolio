import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

/* ═══════════════════════════════════════════════
   ADAPTIVE PARTICLE COUNTS BY VIEWPORT
   Determined once at module load — no Math.random().
   Mobile: ≤768px → 140 particles
   Tablet: ≤1024px → 260 particles
   Desktop: else → 340 particles
═══════════════════════════════════════════════ */
function getParticleCount() {
  if (typeof window === "undefined") return 340;
  const w = window.innerWidth;
  if (w <= 768) return 140;
  if (w <= 1024) return 260;
  return 340;
}

const PARTICLE_COUNT      = getParticleCount();
const CONNECTION_DISTANCE = 2.9;
const CONN_DIST_SQ        = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

/* Scene bounds — spread across generous volume */
const BOUNDS = { x: 10, y: 7.5, z: 5 };

/* Speed ranges (units / second) */
const SPEED_MIN = 0.40;
const SPEED_MAX = 1.20;

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
═══════════════════════════════════════════════ */
function makeGlowTexture() {
  const size = 256;
  let ctx;

  if (typeof OffscreenCanvas !== "undefined") {
    const oc = new OffscreenCanvas(size, size);
    ctx = oc.getContext("2d");
  } else {
    const el = document.createElement("canvas");
    el.width  = size;
    el.height = size;
    ctx = el.getContext("2d");
  }

  const half = size / 2;
  const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
  grad.addColorStop(0.00, "rgba(255, 255, 255, 1.00)");
  grad.addColorStop(0.15, "rgba(250, 235, 215, 1.00)");
  grad.addColorStop(0.35, "rgba(220, 190, 150, 0.95)");
  grad.addColorStop(0.60, "rgba(180, 140, 100, 0.70)");
  grad.addColorStop(0.85, "rgba(130,  90,  60, 0.35)");
  grad.addColorStop(1.00, "rgba(  0,   0,   0, 0.00)");

  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(ctx.canvas);
  tex.needsUpdate = true;
  return tex;
}

const GLOW_TEXTURE = makeGlowTexture();

/* ═══════════════════════════════════════════════
   PER-PARTICLE DATA — built once at module level
═══════════════════════════════════════════════ */
function buildParticleData() {
  const data = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const px = (pr(i * 7 + 1) - 0.5) * BOUNDS.x * 2;
    const py = (pr(i * 7 + 2) - 0.5) * BOUNDS.y * 2;
    const pz = (pr(i * 7 + 3) - 0.5) * BOUNDS.z * 2;

    const speed = SPEED_MIN + pr(i * 7 + 7) * (SPEED_MAX - SPEED_MIN);

    const dx = pr(i * 7 + 4) - 0.5;
    const dy = pr(i * 7 + 5) - 0.5;
    const dz = (pr(i * 7 + 6) - 0.5) * 0.8;
    const dLen = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;

    const vx = (dx / dLen) * speed;
    const vy = (dy / dLen) * speed;
    const vz = (dz / dLen) * speed;

    const oscPhaseX = pr(i * 13 + 1) * Math.PI * 2;
    const oscPhaseY = pr(i * 13 + 2) * Math.PI * 2;
    const oscPhaseZ = pr(i * 13 + 3) * Math.PI * 2;
    const oscFreqX  = 0.18 + pr(i * 13 + 4) * 0.22;
    const oscFreqY  = 0.14 + pr(i * 13 + 5) * 0.20;
    const oscFreqZ  = 0.10 + pr(i * 13 + 6) * 0.18;
    const oscAmpX   = 0.08 + pr(i * 13 + 7) * 0.10;
    const oscAmpY   = 0.08 + pr(i * 13 + 8) * 0.10;
    const oscAmpZ   = 0.06 + pr(i * 13 + 9) * 0.08;

    const changeInterval = 1.0 + pr(i * 13 + 10) * 2.5;
    const nextChangeAt   = pr(i * 13 + 11) * changeInterval;
    const lerpRate       = 0.010 + pr(i * 19 + 3) * 0.012;

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
   SIZE ARRAY — determined once, never changes
═══════════════════════════════════════════════ */
function buildSizeArray() {
  const sizes = new Float32Array(PARTICLE_COUNT);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r = pr(i * 23 + 7);
    if (r > 0.92) {
      sizes[i] = 0.30 + pr(i * 23 + 8) * 0.18;
    } else if (r > 0.80) {
      sizes[i] = 0.18 + pr(i * 23 + 9) * 0.09;
    } else {
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
═══════════════════════════════════════════════ */
function steerVelocity(pos, vel, limit) {
  const edge = limit * 0.80;
  if (pos > edge) {
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
    const dt   = Math.min(clock.getDelta(), 0.033);

    /* ────────────────────────────────────────────
       1. UPDATE PARTICLES
    ──────────────────────────────────────────── */
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = PARTICLES[i];

      if (time >= p.nextChangeAt) {
        const tBucket = Math.floor(time / p.changeInterval);
        const seed    = i * 31 + tBucket * 97;

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

      p.vx += (p.targetVx - p.vx) * p.lerpRate;
      p.vy += (p.targetVy - p.vy) * p.lerpRate;
      p.vz += (p.targetVz - p.vz) * p.lerpRate;

      p.vx = steerVelocity(p.x, p.vx, BOUNDS.x);
      p.vy = steerVelocity(p.y, p.vy, BOUNDS.y);
      p.vz = steerVelocity(p.z, p.vz, BOUNDS.z);

      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.z += p.vz * dt;

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

        <pointsMaterial
          color="#f5e6d3"
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
          color="#c8a885"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </lineSegments>

    </group>
  );
}