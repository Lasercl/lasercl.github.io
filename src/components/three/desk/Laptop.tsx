import { useState } from "react";
import type { ThreeElements } from "@react-three/fiber";
import { COLORS } from "./constants";

const KEY_ROWS = 4;
const KEY_COLS = 11;

export default function Laptop(props: ThreeElements["group"]) {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      {...props}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* base */}
      <mesh position={[0, 0.07, 0]}>
        <boxGeometry args={[3.2, 0.14, 2.2]} />
        <meshStandardMaterial color={COLORS.metal} roughness={0.35} metalness={0.6} />
      </mesh>
      {/* keyboard well */}
      <mesh position={[0, 0.135, -0.49]}>
        <boxGeometry args={[2.95, 0.03, 1.15]} />
        <meshStandardMaterial color={COLORS.ink} roughness={0.8} metalness={0.2} />
      </mesh>
      {Array.from({ length: KEY_ROWS * KEY_COLS }, (_, i) => {
        const row = Math.floor(i / KEY_COLS);
        const col = i % KEY_COLS;
        return (
          <mesh key={i} position={[-1.25 + col * 0.25, 0.16, -0.93 + row * 0.24]}>
            <boxGeometry args={[0.2, 0.035, 0.19]} />
            <meshStandardMaterial color={COLORS.slateLight} roughness={0.6} metalness={0.3} />
          </mesh>
        );
      })}
      {/* touchpad */}
      <mesh position={[0, 0.148, 0.55]}>
        <boxGeometry args={[0.95, 0.02, 0.6]} />
        <meshStandardMaterial color={COLORS.slateLight} roughness={0.4} metalness={0.4} />
      </mesh>
      {/* hinged lid, open ~106deg */}
      <group position={[0, 0.12, -1.03]} rotation={[-0.28, 0, 0]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[3.2, 2.05, 0.09]} />
          <meshStandardMaterial color={COLORS.metal} roughness={0.35} metalness={0.6} />
        </mesh>
        <mesh position={[0, 1, 0.055]}>
          <planeGeometry args={[2.9, 1.75]} />
          <meshStandardMaterial
            color={COLORS.screen}
            emissive={hovered ? "#7c5cf0" : COLORS.indigo}
            emissiveIntensity={hovered ? 2 : 1.3}
            roughness={0.25}
            metalness={0.1}
          />
        </mesh>
        {/* generic glowing logo dot on the lid back */}
        <mesh position={[0, 1.05, -0.055]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.14, 24]} />
          <meshStandardMaterial
            color={COLORS.screen}
            emissive={COLORS.violetSoft}
            emissiveIntensity={hovered ? 4 : 2.6}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}
