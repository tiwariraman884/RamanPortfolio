import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const PARTICLE_COUNT = 140;

function pseudoRandom(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function createPositions() {
  const data = new Float32Array(PARTICLE_COUNT * 4);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const x = pseudoRandom(i * 3 + 1);
    const y = pseudoRandom(i * 3 + 2);
    const z = pseudoRandom(i * 3 + 3);

    data[i * 3] = (x - 0.5) * 16;
    data[i * 3 + 1] = (y - 0.5) * 10;
    data[i * 3 + 2] = (z - 0.5) * 8;
  }

  return data;
}

const POSITIONS = createPositions();

export default function Particles() {
  const pointsRef = useRef(null);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const time = clock.getElapsedTime();

    pointsRef.current.rotation.y = time * 0.04;
    pointsRef.current.rotation.x =
      Math.sin(time * 0.1) * 0.035;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={POSITIONS}
          count={PARTICLE_COUNT}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#d4af6a"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.88}
      />
    </points>
  );
}