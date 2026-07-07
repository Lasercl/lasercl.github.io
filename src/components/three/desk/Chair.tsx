import type { ThreeElements } from "@react-three/fiber";
import { COLORS } from "./constants";

export default function Chair(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      <mesh position={[0, 3.1, 0]}>
        <boxGeometry args={[3.4, 0.25, 3.4]} />
        <meshStandardMaterial color={COLORS.panel} roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[0, 3.27, 0]}>
        <boxGeometry args={[3.15, 0.1, 3.15]} />
        <meshStandardMaterial color={COLORS.slateLight} roughness={0.7} metalness={0.1} />
      </mesh>
      {[-1.4, 1.4].flatMap((x) =>
        [-1.4, 1.4].map((z) => (
          <mesh key={`${x}:${z}`} position={[x, 1.5, z]}>
            <boxGeometry args={[0.28, 3, 0.28]} />
            <meshStandardMaterial color={COLORS.panel} roughness={0.6} metalness={0.2} />
          </mesh>
        ))
      )}
      {/* backrest */}
      {[-1.45, 1.45].map((x) => (
        <mesh key={x} position={[x, 4.95, 1.55]}>
          <boxGeometry args={[0.26, 3.5, 0.26]} />
          <meshStandardMaterial color={COLORS.panel} roughness={0.6} metalness={0.2} />
        </mesh>
      ))}
      <mesh position={[0, 6.3, 1.55]}>
        <boxGeometry args={[2.9, 0.6, 0.14]} />
        <meshStandardMaterial color={COLORS.slateLight} roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[0, 5.4, 1.55]}>
        <boxGeometry args={[2.9, 0.4, 0.14]} />
        <meshStandardMaterial color={COLORS.slateLight} roughness={0.6} metalness={0.2} />
      </mesh>
    </group>
  );
}
