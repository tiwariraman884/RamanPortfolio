import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const PARTICLE_COUNT = 240;
const CONNECTION_DISTANCE = 1.9;

function pseudoRandom(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;

  return value - Math.floor(value);
}

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

function createConnections(particlePositions) {
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

export default function Connections() {
  const linesRef = useRef(null);

  const particlePositions = useMemo(
    () => createParticlePositions(),
    []
  );

  const connectionPositions = useMemo(
    () => createConnections(particlePositions),
    [particlePositions]
  );

  const connectionCount =
    connectionPositions.length / 3;

  useFrame(({ clock, mouse }) => {
    if (!linesRef.current) return;

    const time = clock.getElapsedTime();

    linesRef.current.rotation.y =
      time * 0.035;

    linesRef.current.rotation.x =
      Math.sin(time * 0.18) * 0.035;

    linesRef.current.position.x =
      mouse.x * 0.18;

    linesRef.current.position.y =
      mouse.y * 0.12;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={connectionPositions}
          count={connectionCount}
          itemSize={3}
        />
      </bufferGeometry>

      <lineBasicMaterial
        color="#8e6d3e"
        transparent
        opacity={0.2}
        depthWrite={false}
      />
    </lineSegments>
  );
}