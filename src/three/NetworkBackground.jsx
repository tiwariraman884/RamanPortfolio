import { Canvas } from "@react-three/fiber";
import NetworkSystem from "./NetworkSystem";

function Scene() {
  return <NetworkSystem />;
}

export default function NetworkBackground() {
  return (
    <div className="network-background">
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 60,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <color attach="background" args={["#080808"]} />

        <Scene />
      </Canvas>
    </div>
  );
}