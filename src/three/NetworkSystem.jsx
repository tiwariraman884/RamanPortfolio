import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const PARTICLE_COUNT = 240;
const CONNECTION_DISTANCE = 1.9;

/*
  Deterministic pseudo-random generator.
  No Math.random(), so React purity rules are satisfied.
*/
function pseudoRandom(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;

  return value - Math.floor(value);
}

/*
  Create one stable set of particle positions.
  These positions are shared by both particles and connections.
*/
function createParticlePositions() {
  const positions = new Float32Array(
    PARTICLE_COUNT * 3
  );

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const x = pseudoRandom(i * 3 + 1);
    const y = pseudoRandom(i * 3 + 2);
    const z = pseudoRandom(i * 3 + 3);

    const offset = i * 3;

    positions[offset] = (x - 0.5) * 18;
    positions[offset + 1] = (y - 0.5) * 11;
    positions[offset + 2] = (z - 0.5) * 9;
  }

  return positions;
}

/*
  Build connections from the SAME particle positions.
*/
function createConnectionPositions(particlePositions) {
  const connections = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const firstOffset = i * 3;

    const firstX = particlePositions[firstOffset];
    const firstY = particlePositions[firstOffset + 1];
    const firstZ = particlePositions[firstOffset + 2];

    for (let j = i + 1; j < PARTICLE_COUNT; j++) {
      const secondOffset = j * 3;

      const secondX = particlePositions[secondOffset];
      const secondY = particlePositions[secondOffset + 1];
      const secondZ = particlePositions[secondOffset + 2];

      const dx = firstX - secondX;
      const dy = firstY - secondY;
      const dz = firstZ - secondZ;

      const distanceSquared =
        dx * dx +
        dy * dy +
        dz * dz;

      if (
        distanceSquared <
        CONNECTION_DISTANCE * CONNECTION_DISTANCE
      ) {
        connections.push(
          firstX,
          firstY,
          firstZ,
          secondX,
          secondY,
          secondZ
        );
      }
    }
  }

  return new Float32Array(connections);
}

/*
  Generate the network once at module level.
  Nothing is regenerated during React rendering.
*/
const PARTICLE_POSITIONS = createParticlePositions();

const CONNECTION_POSITIONS =
  createConnectionPositions(PARTICLE_POSITIONS);

export default function NetworkSystem() {
  const networkRef = useRef(null);

  useFrame(({ clock, mouse }) => {
    if (!networkRef.current) return;

    const time = clock.getElapsedTime();

    /*
      Fast but subtle network movement.
    */
    networkRef.current.rotation.y =
      time * 0.035;

    networkRef.current.rotation.x =
      Math.sin(time * 0.18) * 0.035;

    /*
      Subtle mouse parallax.
    */
    networkRef.current.position.x =
      mouse.x * 0.18;

    networkRef.current.position.y =
      mouse.y * 0.12;
  });

  const connectionCount =
    CONNECTION_POSITIONS.length / 3;

  return (
    <group ref={networkRef}>
      {/* =========================
          PARTICLES
      ========================= */}

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={PARTICLE_POSITIONS}
            count={PARTICLE_COUNT}
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial
          color="#d7b36b"
          size={0.062}
          sizeAttenuation
          transparent
          opacity={0.84}
          depthWrite={false}
        />
      </points>

      {/* =========================
          CONNECTIONS
      ========================= */}

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={CONNECTION_POSITIONS}
            count={connectionCount}
            itemSize={3}
          />
        </bufferGeometry>

        <lineBasicMaterial
          color="#8e6d3e"
          transparent
          opacity={0.20}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}