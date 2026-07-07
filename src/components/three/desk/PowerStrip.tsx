import { useRef } from "react";
import { Edges } from "@react-three/drei";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import type { MeshStandardMaterial } from "three";
import { COLORS } from "./constants";

export default function PowerStrip(props: ThreeElements["group"]) {
  const led = useRef<MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (led.current) {
      led.current.emissiveIntensity = 1.7 + Math.sin(clock.elapsedTime * 2.6) * 1.3;
    }
  });

  return (
    <group {...props}>
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[2.2, 0.3, 0.75]} />
        <meshStandardMaterial color={COLORS.panel} roughness={0.5} metalness={0.3} />
        <Edges threshold={15} color={COLORS.line} />
      </mesh>
      {[-0.75, -0.15, 0.45].map((x) => (
        <mesh key={x} position={[x, 0.3, 0]}>
          <cylinderGeometry args={[0.21, 0.21, 0.06, 20]} />
          <meshStandardMaterial color={COLORS.screen} roughness={0.7} metalness={0.2} />
        </mesh>
      ))}
      {/* pulsing power indicator LED */}
      <mesh position={[0.92, 0.31, 0]}>
        <boxGeometry args={[0.14, 0.06, 0.3]} />
        <meshStandardMaterial
          ref={led}
          color={COLORS.screen}
          emissive={COLORS.violet}
          emissiveIntensity={1.7}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
