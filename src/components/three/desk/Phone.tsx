import type { ThreeElements } from "@react-three/fiber";
import { COLORS } from "./constants";

export default function Phone(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      {/* stand */}
      <mesh position={[0, 0.045, 0]}>
        <boxGeometry args={[0.95, 0.09, 1]} />
        <meshStandardMaterial color={COLORS.metal} roughness={0.35} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.12, 0.32]}>
        <boxGeometry args={[0.78, 0.14, 0.16]} />
        <meshStandardMaterial color={COLORS.metal} roughness={0.35} metalness={0.7} />
      </mesh>
      {/* reclined phone */}
      <group position={[0, 0.1, -0.05]} rotation={[-0.42, 0, 0]}>
        <mesh position={[0, 0.55, -0.28]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.5, 1.1, 0.08]} />
          <meshStandardMaterial color={COLORS.metal} roughness={0.35} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.78, 0]}>
          <boxGeometry args={[0.78, 1.55, 0.07]} />
          <meshStandardMaterial color={COLORS.ink} roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.78, 0.041]}>
          <planeGeometry args={[0.66, 1.4]} />
          <meshStandardMaterial
            color={COLORS.screen}
            emissive={COLORS.indigo}
            emissiveIntensity={0.9}
            roughness={0.25}
          />
        </mesh>
      </group>
    </group>
  );
}
