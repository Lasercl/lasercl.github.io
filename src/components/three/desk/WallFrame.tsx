import { useRef } from "react";
import { Edges } from "@react-three/drei";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import type { Group } from "three";
import { COLORS } from "./constants";

export default function WallFrame(props: ThreeElements["group"]) {
  const inner = useRef<Group>(null);

  useFrame(({ clock }) => {
    const g = inner.current;
    if (!g) return;
    const t = clock.elapsedTime;
    g.position.y = Math.sin(t * 0.7) * 0.14;
    g.rotation.z = Math.sin(t * 0.5) * 0.02;
  });

  return (
    <group {...props}>
      <group ref={inner}>
        <mesh>
          <boxGeometry args={[3, 3.7, 0.16]} />
          <meshStandardMaterial color={COLORS.slate} roughness={0.55} metalness={0.3} />
          <Edges threshold={15} color={COLORS.line} />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[2.5, 3.2, 0.03]} />
          <meshStandardMaterial
            color="#0d0a1f"
            emissive={COLORS.indigo}
            emissiveIntensity={0.4}
            roughness={0.3}
          />
        </mesh>
        {/* abstract glowing artwork */}
        <mesh position={[-0.3, 0.15, 0.11]} rotation={[0, 0, -0.55]}>
          <boxGeometry args={[0.14, 2.2, 0.03]} />
          <meshStandardMaterial
            color={COLORS.screen}
            emissive={COLORS.violet}
            emissiveIntensity={2.2}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0.55, -0.35, 0.11]} rotation={[0, 0, -0.55]}>
          <boxGeometry args={[0.08, 1.5, 0.03]} />
          <meshStandardMaterial color={COLORS.screen} emissive={COLORS.violetSoft} emissiveIntensity={0.9} />
        </mesh>
      </group>
    </group>
  );
}
