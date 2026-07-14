import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Billboard, ContactShadows, OrbitControls, useCursor } from "@react-three/drei";
import { MathUtils, Vector3, type Group, type Mesh, type MeshBasicMaterial } from "three";
import { COLORS, DESK_TOP_Y } from "./desk/constants";
import { getHeroView, type HeroViewId } from "./heroViews";
import Desk from "./desk/Desk";
import Lamp from "./desk/Lamp";
import Laptop from "./desk/Laptop";
import Mouse from "./desk/Mouse";
import Chair from "./desk/Chair";
import WallFrame from "./desk/WallFrame";
import Phone from "./desk/Phone";
import PowerStrip from "./desk/PowerStrip";

interface HeroSceneProps {
  view: HeroViewId;
  onViewChange: (id: HeroViewId) => void;
}

type ControlsLike = {
  target: Vector3;
  update: () => void;
  addEventListener: (type: string, listener: () => void) => void;
  removeEventListener: (type: string, listener: () => void) => void;
};

/** Smoothly flies the camera + orbit target to the active view's pose. */
function CameraDirector({
  view,
  onTravelingChange,
}: {
  view: HeroViewId;
  onTravelingChange: (traveling: boolean) => void;
}) {
  const heroView = getHeroView(view);
  const camGoal = useMemo(() => new Vector3(...heroView.camera), [heroView]);
  const targetGoal = useMemo(() => new Vector3(...heroView.target), [heroView]);
  const traveling = useRef(false);
  const controls = useThree((state) => state.controls) as unknown as ControlsLike | null;

  useEffect(() => {
    traveling.current = true;
    onTravelingChange(true);
  }, [view, onTravelingChange]);

  // the user grabbing the scene always wins over the fly-to animation
  useEffect(() => {
    if (!controls) return;
    const cancel = () => {
      if (!traveling.current) return;
      traveling.current = false;
      onTravelingChange(false);
    };
    controls.addEventListener("start", cancel);
    return () => controls.removeEventListener("start", cancel);
  }, [controls, onTravelingChange]);

  useFrame((state, delta) => {
    if (!traveling.current) return;
    const c = state.controls as unknown as ControlsLike | null;
    if (!c) return;
    const t = 1 - Math.exp(-4.2 * delta);
    state.camera.position.lerp(camGoal, t);
    c.target.lerp(targetGoal, t);
    c.update();
    if (state.camera.position.distanceTo(camGoal) < 0.08 && c.target.distanceTo(targetGoal) < 0.08) {
      traveling.current = false;
      onTravelingChange(false);
    }
  });

  return null;
}

function Rig({ calm, children }: { calm: boolean; children: ReactNode }) {
  const ref = useRef<Group>(null);
  const strength = calm ? 0.3 : 1;

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    g.rotation.x = MathUtils.damp(g.rotation.x, state.pointer.y * -0.045 * strength, 2.5, delta);
    g.rotation.y = MathUtils.damp(g.rotation.y, state.pointer.x * 0.08 * strength, 2.5, delta);
  });

  return <group ref={ref}>{children}</group>;
}

/** Pulsing beacon inviting a click, hidden while its view is focused. */
function Marker({ position, visible }: { position: [number, number, number]; visible: boolean }) {
  const ring = useRef<Mesh>(null);
  const ringMat = useRef<MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    const t = (clock.elapsedTime % 1.8) / 1.8;
    if (ring.current) {
      const s = 0.5 + t * 1.6;
      ring.current.scale.setScalar(s);
    }
    if (ringMat.current) ringMat.current.opacity = (1 - t) * 0.7;
  });

  return (
    <Billboard position={position} visible={visible}>
      <mesh>
        <circleGeometry args={[0.13, 24]} />
        <meshBasicMaterial color="#e9d5ff" toneMapped={false} transparent opacity={0.95} />
      </mesh>
      <mesh>
        <ringGeometry args={[0.2, 0.26, 32]} />
        <meshBasicMaterial color={COLORS.violet} toneMapped={false} transparent opacity={0.8} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[0.3, 0.35, 32]} />
        <meshBasicMaterial ref={ringMat} color={COLORS.violetSoft} toneMapped={false} transparent />
      </mesh>
    </Billboard>
  );
}

interface HotspotProps {
  viewId: HeroViewId;
  activeView: HeroViewId;
  onSelect: (id: HeroViewId) => void;
  /** Invisible click-target box (w, h, d) and its offset inside the group */
  hitSize: [number, number, number];
  hitOffset: [number, number, number];
  markerPosition: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  children: ReactNode;
}

function Hotspot({
  viewId,
  activeView,
  onSelect,
  hitSize,
  hitOffset,
  markerPosition,
  position,
  rotation,
  children,
}: HotspotProps) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <group position={position} rotation={rotation}>
      {children}
      <Marker position={markerPosition} visible={activeView !== viewId} />
      <mesh
        position={hitOffset}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(viewId);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={hitSize} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

export default function HeroScene({ view, onViewChange }: HeroSceneProps) {
  const [traveling, setTraveling] = useState(false);
  const isCoarsePointer = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches,
    []
  );

  const isOverview = view === "overview";
  // clicking the focused object again zooms back out
  const select = (id: HeroViewId) => onViewChange(view === id ? "overview" : id);

  return (
    <Canvas camera={{ position: [10.5, 7.2, 14], fov: 40 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#4c1d95", "#0a0614", 1.1]} />
      <directionalLight position={[7, 11, 7]} intensity={2.2} color="#dbe4ff" />
      <pointLight position={[-8, 8, -9]} intensity={150} color={COLORS.primary} />
      <pointLight position={[8, 4, 8]} intensity={45} color={COLORS.indigo} />

      <Rig calm={!isOverview}>
        <Desk />

        <Hotspot
          viewId="lamp"
          activeView={view}
          onSelect={select}
          position={[-2.5, DESK_TOP_Y, -1.5]}
          hitSize={[3.1, 3, 3.1]}
          hitOffset={[0, 1.4, 0]}
          markerPosition={[0, 3.2, 0]}
        >
          <Lamp />
        </Hotspot>

        <Hotspot
          viewId="laptop"
          activeView={view}
          onSelect={select}
          position={[0.4, DESK_TOP_Y, 0.55]}
          rotation={[0, -0.26, 0]}
          hitSize={[3.5, 2.6, 2.8]}
          hitOffset={[0, 1.15, -0.35]}
          markerPosition={[0, 2.7, -0.95]}
        >
          <Laptop />
        </Hotspot>

        <Mouse position={[2.45, DESK_TOP_Y, 0.75]} />

        <Hotspot
          viewId="phone"
          activeView={view}
          onSelect={select}
          position={[2.85, DESK_TOP_Y, -1.75]}
          rotation={[0, 0.4, 0]}
          hitSize={[1.3, 2, 1.5]}
          hitOffset={[0, 0.9, -0.1]}
          markerPosition={[0, 2.1, 0]}
        >
          <Phone />
        </Hotspot>

        <PowerStrip position={[0.5, DESK_TOP_Y, -2.3]} />

        <Hotspot
          viewId="chair"
          activeView={view}
          onSelect={select}
          position={[-1.6, 0, 3.3]}
          rotation={[0, 0.25, 0]}
          hitSize={[3.6, 4.6, 3.6]}
          hitOffset={[0, 4.2, 0.6]}
          markerPosition={[0, 7.2, 1.4]}
        >
          <Chair />
        </Hotspot>

        <Hotspot
          viewId="frame"
          activeView={view}
          onSelect={select}
          position={[1.6, 7.9, -4.2]}
          rotation={[0, 0.12, 0]}
          hitSize={[3.2, 4, 0.6]}
          hitOffset={[0, 0, 0.1]}
          markerPosition={[0, 2.3, 0.3]}
        >
          <WallFrame />
        </Hotspot>

        {/* diorama platform — clicking it zooms back out */}
        <mesh
          position={[0, -0.16, 0]}
          onClick={(e) => {
            if (isOverview) return;
            e.stopPropagation();
            onViewChange("overview");
          }}
        >
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

      <CameraDirector view={view} onTravelingChange={setTraveling} />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={!isCoarsePointer}
        enableRotate={!isCoarsePointer}
        target={[0, 3.1, 0]}
        minDistance={3}
        maxDistance={20}
        minPolarAngle={0.35}
        maxPolarAngle={1.55}
        autoRotate={isOverview && !traveling}
        autoRotateSpeed={0.65}
      />
    </Canvas>
  );
}
