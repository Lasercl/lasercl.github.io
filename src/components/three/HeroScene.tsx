import { useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { MathUtils, type Group } from "three";
import { COLORS, DESK_TOP_Y } from "./desk/constants";
import Desk from "./desk/Desk";
import Lamp from "./desk/Lamp";
import Laptop from "./desk/Laptop";
import Mouse from "./desk/Mouse";
import Chair from "./desk/Chair";
import WallFrame from "./desk/WallFrame";
import Phone from "./desk/Phone";
import PowerStrip from "./desk/PowerStrip";

function Rig({ children }: { children: ReactNode }) {
  const ref = useRef<Group>(null);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    g.rotation.x = MathUtils.damp(g.rotation.x, state.pointer.y * -0.045, 2.5, delta);
    g.rotation.y = MathUtils.damp(g.rotation.y, state.pointer.x * 0.08, 2.5, delta);
  });

  return <group ref={ref}>{children}</group>;
}

export default function HeroScene() {
  const isCoarsePointer = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches,
    []
  );

  return (
    <Canvas camera={{ position: [10.5, 7.2, 14], fov: 40 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#4c1d95", "#0a0614", 1.1]} />
      <directionalLight position={[7, 11, 7]} intensity={2.2} color="#dbe4ff" />
      <pointLight position={[-8, 8, -9]} intensity={150} color={COLORS.primary} />
      <pointLight position={[8, 4, 8]} intensity={45} color={COLORS.indigo} />

      <Rig>
        <Desk />
        <Lamp position={[-2.5, DESK_TOP_Y, -1.5]} />
        <Laptop position={[0.4, DESK_TOP_Y, 0.55]} rotation={[0, -0.26, 0]} />
        <Mouse position={[2.45, DESK_TOP_Y, 0.75]} />
        <Phone position={[2.85, DESK_TOP_Y, -1.75]} rotation={[0, 0.4, 0]} />
        <PowerStrip position={[0.5, DESK_TOP_Y, -2.3]} />
        <Chair position={[-1.6, 0, 3.3]} rotation={[0, 0.25, 0]} />
        <WallFrame position={[1.6, 7.9, -4.2]} rotation={[0, 0.12, 0]} />

        {/* diorama platform */}
        <mesh position={[0, -0.16, 0]}>
          <cylinderGeometry args={[7.3, 7.6, 0.32, 72]} />
          <meshStandardMaterial color={COLORS.ink} roughness={0.85} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[6.95, 7.28, 72]} />
          <meshBasicMaterial color={COLORS.primary} transparent opacity={0.55} />
        </mesh>

        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.5}
          scale={17}
          blur={2.4}
          far={6}
          resolution={512}
          color="#000010"
          frames={1}
        />
      </Rig>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={!isCoarsePointer}
        enableRotate={!isCoarsePointer}
        target={[0, 3.1, 0]}
        minDistance={10}
        maxDistance={20}
        minPolarAngle={0.55}
        maxPolarAngle={1.42}
        autoRotate
        autoRotateSpeed={0.65}
      />
    </Canvas>
  );
}
