import { Canvas } from "@react-three/fiber";
import NetworkSystem from "./NetworkSystem";

function Scene() {
  return <NetworkSystem />;
}

/* Cap device pixel ratio: 1 on mobile, 1.5 on tablet, 2 on desktop.
   This dramatically reduces GPU fill-rate cost on high-DPR mobile screens. */
function getAdaptiveDpr() {
  if (typeof window === "undefined") return [1, 1.5];
  const w = window.innerWidth;
  if (w <= 768)  return [1, 1];
  if (w <= 1024) return [1, 1.5];
  return [1, 2];
}

const ADAPTIVE_DPR = getAdaptiveDpr();

export default function NetworkBackground() {
  return (
    <div className="network-background">
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 60,
        }}
        dpr={ADAPTIVE_DPR}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}