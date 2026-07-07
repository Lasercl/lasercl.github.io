import { Edges } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { COLORS, DESK } from "./constants";

const LEG_HEIGHT = DESK.height - DESK.topThickness;
const DRAWER_CENTERS = [4.3, 2.85, 1.4];

export default function Desk(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      <mesh position={[0, DESK.height - DESK.topThickness / 2, 0]}>
        <boxGeometry args={[DESK.width, DESK.topThickness, DESK.depth]} />
        <meshStandardMaterial color={COLORS.slate} roughness={0.55} metalness={0.25} />
        <Edges threshold={15} color={COLORS.line} />
      </mesh>

      {/* drawer pedestal (right side) */}
      <mesh position={[2.7, LEG_HEIGHT / 2, -0.2]}>
        <boxGeometry args={[2, LEG_HEIGHT, 4.6]} />
        <meshStandardMaterial color={COLORS.panel} roughness={0.6} metalness={0.2} />
        <Edges threshold={15} color={COLORS.line} />
      </mesh>
      {DRAWER_CENTERS.map((y) => (
        <group key={y}>
          <mesh position={[2.7, y, 2.14]}>
            <boxGeometry args={[1.68, 1.24, 0.07]} />
            <meshStandardMaterial color={COLORS.slateLight} roughness={0.5} metalness={0.3} />
            <Edges threshold={15} color={COLORS.line} />
          </mesh>
          <mesh position={[2.7, y + 0.4, 2.21]}>
            <boxGeometry args={[0.8, 0.09, 0.09]} />
            <meshStandardMaterial color={COLORS.violetSoft} roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* left legs + stretcher */}
      {[-2.35, 2.35].map((z) => (
        <mesh key={z} position={[-3.55, LEG_HEIGHT / 2, z]}>
          <boxGeometry args={[0.35, LEG_HEIGHT, 0.35]} />
          <meshStandardMaterial color={COLORS.panel} roughness={0.6} metalness={0.2} />
          <Edges threshold={15} color={COLORS.line} />
        </mesh>
      ))}
      <mesh position={[-3.55, 0.65, 0]}>
        <boxGeometry args={[0.3, 0.3, 4.4]} />
        <meshStandardMaterial color={COLORS.panel} roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[-0.95, LEG_HEIGHT - 0.35, -2.4]}>
        <boxGeometry args={[5.2, 0.6, 0.22]} />
        <meshStandardMaterial color={COLORS.panel} roughness={0.6} metalness={0.2} />
      </mesh>
    </group>
  );
}
