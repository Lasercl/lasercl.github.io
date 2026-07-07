import { useMemo, useState } from "react";
import type { ThreeElements } from "@react-three/fiber";
import { DoubleSide, Vector2 } from "three";
import { COLORS } from "./constants";

const SHADE_PROFILE: [number, number][] = [
  [1.5, 0],
  [1.48, 0.08],
  [1.26, 0.32],
  [1.0, 0.64],
  [0.87, 0.96],
  [0.88, 1.24],
  [0.7, 1.5],
  [0.5, 1.68],
  [0.4, 1.8],
];

export default function Lamp(props: ThreeElements["group"]) {
  const [hovered, setHovered] = useState(false);
  const points = useMemo(() => SHADE_PROFILE.map(([x, y]) => new Vector2(x, y)), []);

  return (
    <group
      {...props}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* tripod legs */}
      {[0, 1, 2].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
          <mesh position={[0, 0.44, 0.32]} rotation={[0.52, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 1.05, 10]} />
            <meshStandardMaterial color={COLORS.metal} roughness={0.35} metalness={0.7} />
          </mesh>
        </group>
      ))}
      {/* hub dome */}
      <mesh position={[0, 0.78, 0]} scale={[1, 0.62, 1]}>
        <sphereGeometry args={[0.34, 24, 16]} />
        <meshStandardMaterial color={COLORS.metal} roughness={0.35} metalness={0.7} />
      </mesh>
      {/* stem */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.3, 10]} />
        <meshStandardMaterial color={COLORS.metal} roughness={0.35} metalness={0.7} />
      </mesh>
      {/* internal frame ring + spokes */}
      <mesh position={[0, 1.78, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.82, 0.03, 10, 40]} />
        <meshStandardMaterial color={COLORS.violetSoft} roughness={0.3} metalness={0.8} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 1.78, 0]} rotation={[0, (i * Math.PI) / 3, 0]}>
          <boxGeometry args={[1.6, 0.025, 0.025]} />
          <meshStandardMaterial color={COLORS.violetSoft} roughness={0.3} metalness={0.8} />
        </mesh>
      ))}
      {/* bulb + real light */}
      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[0.09, 0.11, 0.24, 10]} />
        <meshStandardMaterial color={COLORS.ink} roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0, 2.38, 0]}>
        <sphereGeometry args={[0.28, 24, 16]} />
        <meshStandardMaterial
          color="#c4b5fd"
          emissive={COLORS.violet}
          emissiveIntensity={hovered ? 7 : 5}
          toneMapped={false}
        />
      </mesh>
      <pointLight position={[0, 2.45, 0]} color={COLORS.violet} intensity={hovered ? 90 : 65} distance={20} decay={2} />
      {/* bell shade */}
      <mesh position={[0, 1.7, 0]}>
        <latheGeometry args={[points, 48]} />
        <meshStandardMaterial
          color="#352b5e"
          emissive="#6d28d9"
          emissiveIntensity={hovered ? 1.1 : 0.55}
          roughness={0.7}
          metalness={0.15}
          transparent
          opacity={0.92}
          side={DoubleSide}
        />
      </mesh>
    </group>
  );
}
