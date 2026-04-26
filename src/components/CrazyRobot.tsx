import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

interface CrazyRobotProps {
  color?: string;
  accentColor?: string;
  scale?: number;
}

function CrazyRobotModel({
  color = "hsl(160, 100%, 50%)",
  accentColor = "hsl(280, 100%, 65%)",
  scale = 1,
}: CrazyRobotProps) {
  const rootRef  = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const coreRef  = useRef<THREE.Mesh>(null);
  const gear1Ref = useRef<THREE.Mesh>(null);
  const gear2Ref = useRef<THREE.Mesh>(null);
  const headRef  = useRef<THREE.Mesh>(null);
  const armLRef  = useRef<THREE.Group>(null);
  const armRRef  = useRef<THREE.Group>(null);

  const primary  = new THREE.Color(color);
  const accent   = new THREE.Color(accentColor);
  // Clearly visible steel-blue body — NOT near-black
  const bodyBase = new THREE.Color("#1b4f8a");   // strong steel blue
  const bodyMid  = new THREE.Color("#2979c8");   // bright mid-blue
  const chrome   = new THREE.Color("#c0d8f0");   // light silver-blue chrome

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (ring1Ref.current) ring1Ref.current.rotation.z += 0.018;
    if (ring2Ref.current) ring2Ref.current.rotation.x += 0.022;
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y += 0.014;
      ring3Ref.current.rotation.x = Math.sin(t * 0.5) * 0.4;
    }

    if (coreRef.current) {
      const pulse = 0.85 + Math.sin(t * 4) * 0.15;
      coreRef.current.scale.setScalar(pulse);
      (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        2 + Math.sin(t * 4) * 1.5;
    }

    if (gear1Ref.current) gear1Ref.current.rotation.z -= 0.04;
    if (gear2Ref.current) gear2Ref.current.rotation.z += 0.04;

    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.8) * 0.25;
    }

    if (armLRef.current) armLRef.current.rotation.z = -Math.PI / 6 + Math.sin(t * 1.2) * 0.12;
    if (armRRef.current) armRRef.current.rotation.z =  Math.PI / 6 - Math.sin(t * 1.2) * 0.12;
  });

  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={rootRef} scale={scale}>

        {/* ── ORBITAL RINGS ─────────────────────────── */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[0.82, 0.018, 8, 60]} />
          <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={2} />
        </mesh>
        <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.75, 0.014, 8, 60]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2} />
        </mesh>
        <mesh ref={ring3Ref} rotation={[0.6, 0, 0.9]}>
          <torusGeometry args={[0.68, 0.010, 8, 60]} />
          <meshStandardMaterial color={chrome} emissive={chrome} emissiveIntensity={0.8} />
        </mesh>

        {/* ── TORSO ─────────────────────────────────── */}
        {/* Main body */}
        <mesh position={[0, -0.18, 0]}>
          <boxGeometry args={[0.52, 0.60, 0.34]} />
          <meshStandardMaterial color={bodyBase} metalness={0.4} roughness={0.45} />
        </mesh>
        {/* Chest armour plate */}
        <mesh position={[0, 0.02, 0.175]} rotation={[0.12, 0, 0]}>
          <boxGeometry args={[0.42, 0.42, 0.06]} />
          <meshStandardMaterial color={bodyMid} metalness={0.35} roughness={0.5} />
        </mesh>
        {/* Chest energy core */}
        <mesh ref={coreRef} position={[0, 0.02, 0.22]}>
          <icosahedronGeometry args={[0.09, 1]} />
          <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={3} transparent opacity={0.9} />
        </mesh>
        {/* Side vents */}
        <mesh position={[-0.29, -0.10, 0]}>
          <boxGeometry args={[0.06, 0.38, 0.28]} />
          <meshStandardMaterial color={bodyMid} metalness={0.4} roughness={0.4} />
        </mesh>
        <mesh position={[0.29, -0.10, 0]}>
          <boxGeometry args={[0.06, 0.38, 0.28]} />
          <meshStandardMaterial color={bodyMid} metalness={0.4} roughness={0.4} />
        </mesh>
        {/* Waist joint */}
        <mesh position={[0, -0.50, 0]}>
          <cylinderGeometry args={[0.18, 0.22, 0.12, 8]} />
          <meshStandardMaterial color={chrome} metalness={0.6} roughness={0.25} />
        </mesh>

        {/* ── SHOULDER GEARS ────────────────────────── */}
        <mesh ref={gear1Ref} position={[-0.36, 0.18, 0.05]}>
          <torusGeometry args={[0.10, 0.035, 6, 8]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.5} />
        </mesh>
        <mesh ref={gear2Ref} position={[0.36, 0.18, 0.05]}>
          <torusGeometry args={[0.10, 0.035, 6, 8]} />
          <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={1.5} />
        </mesh>

        {/* ── HEAD ──────────────────────────────────── */}
        <mesh ref={headRef} position={[0, 0.44, 0]}>
          <boxGeometry args={[0.40, 0.30, 0.30]} />
          <meshStandardMaterial color={bodyBase} metalness={0.4} roughness={0.45} />
        </mesh>
        {/* Head visor strip */}
        <mesh position={[0, 0.47, 0.155]}>
          <boxGeometry args={[0.34, 0.08, 0.04]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={3} transparent opacity={0.85} />
        </mesh>
        {/* Left eye */}
        <mesh position={[-0.10, 0.47, 0.172]}>
          <circleGeometry args={[0.038, 12]} />
          <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={5} />
        </mesh>
        {/* Right eye */}
        <mesh position={[0.10, 0.47, 0.172]}>
          <circleGeometry args={[0.028, 12]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={5} />
        </mesh>
        {/* Centre eye */}
        <mesh position={[0, 0.44, 0.172]}>
          <circleGeometry args={[0.018, 8]} />
          <meshStandardMaterial color="white" emissive={new THREE.Color("white")} emissiveIntensity={4} />
        </mesh>
        {/* Head side fins */}
        <mesh position={[-0.225, 0.44, 0]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.04, 0.22, 0.22]} />
          <meshStandardMaterial color={bodyMid} metalness={0.4} roughness={0.4} />
        </mesh>
        <mesh position={[0.225, 0.44, 0]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.04, 0.22, 0.22]} />
          <meshStandardMaterial color={bodyMid} metalness={0.4} roughness={0.4} />
        </mesh>

        {/* ── ANTENNA ───────────────────────────────── */}
        <mesh position={[0, 0.72, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.22, 6]} />
          <meshStandardMaterial color={chrome} metalness={0.6} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.84, 0]}>
          <sphereGeometry args={[0.032, 10, 10]} />
          <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={6} />
        </mesh>
        <mesh position={[0, 0.76, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.028, 0.008, 6, 12]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={3} />
        </mesh>

        {/* ── LEFT ARM ──────────────────────────────── */}
        <group ref={armLRef} position={[-0.36, 0.10, 0]}>
          <mesh position={[-0.10, -0.14, 0]} rotation={[0, 0, 0.3]}>
            <cylinderGeometry args={[0.065, 0.055, 0.32, 7]} />
            <meshStandardMaterial color={bodyBase} metalness={0.4} roughness={0.45} />
          </mesh>
          <mesh position={[-0.20, -0.30, 0]}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial color={chrome} metalness={0.6} roughness={0.25} />
          </mesh>
          <mesh position={[-0.24, -0.46, 0]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.05, 0.038, 0.28, 6]} />
            <meshStandardMaterial color={bodyMid} metalness={0.35} roughness={0.5} />
          </mesh>
          <mesh position={[-0.25, -0.62, 0]}>
            <coneGeometry args={[0.045, 0.08, 5]} />
            <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={2} />
          </mesh>
        </group>

        {/* ── RIGHT ARM ─────────────────────────────── */}
        <group ref={armRRef} position={[0.36, 0.10, 0]}>
          <mesh position={[0.10, -0.14, 0]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.065, 0.055, 0.32, 7]} />
            <meshStandardMaterial color={bodyBase} metalness={0.4} roughness={0.45} />
          </mesh>
          <mesh position={[0.20, -0.30, 0]}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial color={chrome} metalness={0.6} roughness={0.25} />
          </mesh>
          <mesh position={[0.24, -0.46, 0]} rotation={[0, 0, 0.3]}>
            <cylinderGeometry args={[0.05, 0.038, 0.28, 6]} />
            <meshStandardMaterial color={bodyMid} metalness={0.35} roughness={0.5} />
          </mesh>
          <mesh position={[0.25, -0.62, 0]}>
            <coneGeometry args={[0.045, 0.08, 5]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2} />
          </mesh>
        </group>

        {/* ── LEGS ──────────────────────────────────── */}
        <mesh position={[-0.14, -0.80, 0]}>
          <cylinderGeometry args={[0.07, 0.09, 0.32, 7]} />
          <meshStandardMaterial color={bodyBase} metalness={0.4} roughness={0.45} />
        </mesh>
        <mesh position={[-0.14, -1.0, 0.04]}>
          <boxGeometry args={[0.14, 0.09, 0.22]} />
          <meshStandardMaterial color={bodyMid} metalness={0.35} roughness={0.5} />
        </mesh>
        <mesh position={[0.14, -0.80, 0]}>
          <cylinderGeometry args={[0.07, 0.09, 0.32, 7]} />
          <meshStandardMaterial color={bodyBase} metalness={0.4} roughness={0.45} />
        </mesh>
        <mesh position={[0.14, -1.0, 0.04]}>
          <boxGeometry args={[0.14, 0.09, 0.22]} />
          <meshStandardMaterial color={bodyMid} metalness={0.35} roughness={0.5} />
        </mesh>

      </group>
    </Float>
  );
}

export default function CrazyRobot({ color, accentColor, scale = 0.85 }: CrazyRobotProps) {
  return (
    <div className="w-full h-full min-h-[200px]">
      <Canvas camera={{ position: [0, 0, 3.2], fov: 50 }}>
        {/* Strong white ambient so no part is ever pitch black */}
        <ambientLight intensity={1.8} color="#ffffff" />
        {/* Neon green key light from front-top */}
        <pointLight position={[2, 3, 4]}  intensity={2.5} color="#00ffaa" />
        {/* Purple fill from left */}
        <pointLight position={[-3, 1, 3]} intensity={1.5} color="#bb44ff" />
        {/* White rim from top */}
        <pointLight position={[0, 5, 1]}  intensity={1.2} color="#ffffff" />
        {/* Warm fill from below so legs stay visible */}
        <pointLight position={[0, -3, 2]} intensity={0.8} color="#4488ff" />
        <CrazyRobotModel color={color} accentColor={accentColor} scale={scale} />
        <Environment preset="warehouse" />
      </Canvas>
    </div>
  );
}
