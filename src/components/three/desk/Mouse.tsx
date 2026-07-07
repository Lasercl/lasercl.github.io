import { Edges } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { COLORS } from "./constants";

export default function Mouse(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      {/* mat */}
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[2.5, 0.06, 2]} />
        <meshStandardMaterial color="#10162a" roughness={0.9} metalness={0.05} />
        <Edges threshold={15} color={COLORS.line} />
      </mesh>
      {/* ergonomic body: 12x7cm footprint */}
      <mesh position={[0, 0.26, 0.08]} scale={[0.6, 0.42, 1]}>
        <sphereGeometry args={[0.6, 28, 20]} />
        <meshStandardMaterial color={COLORS.slateLight} roughness={0.4} metalness={0.4} />
      </mesh>
      {/* scroll wheel */}
      <mesh position={[0, 0.44, -0.26]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.05, 12]} />
        <meshStandardMaterial
          color={COLORS.ink}
          emissive={COLORS.violet}
          emissiveIntensity={0.8}
          roughness={0.5}
        />
      </mesh>
    </group>
  );
}
