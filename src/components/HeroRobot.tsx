import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

// Robot built from primitives that follows the cursor
function RobotModel() {
  const groupRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Smoothly rotate head toward cursor
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.5,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.3,
        0.05
      );
    }
    // Move eye pupils
    [eyeLeftRef, eyeRightRef].forEach((ref) => {
      if (ref.current) {
        ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.x * 0.05, 0.1);
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, 0.15 + mouse.y * 0.05, 0.1);
      }
    });
  });

  const neonGreen = new THREE.Color("hsl(160, 100%, 50%)");
  const darkMetal = new THREE.Color("hsl(220, 20%, 12%)");
  const metalGray = new THREE.Color("hsl(220, 10%, 25%)");

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, -0.5, 0]}>
        {/* Body */}
        <mesh position={[0, -1.2, 0]}>
          <boxGeometry args={[1.2, 1.5, 0.8]} />
          <meshStandardMaterial color={darkMetal} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Body accent lines */}
        <mesh position={[0, -1.2, 0.41]}>
          <boxGeometry args={[1.0, 0.05, 0.01]} />
          <meshStandardMaterial color={neonGreen} emissive={neonGreen} emissiveIntensity={2} />
        </mesh>
        <mesh position={[0, -0.8, 0.41]}>
          <boxGeometry args={[0.6, 0.05, 0.01]} />
          <meshStandardMaterial color={neonGreen} emissive={neonGreen} emissiveIntensity={1} />
        </mesh>
        {/* Chest light */}
        <mesh position={[0, -1.0, 0.41]}>
          <circleGeometry args={[0.12, 16]} />
          <meshStandardMaterial color={neonGreen} emissive={neonGreen} emissiveIntensity={3} />
        </mesh>

        {/* Neck */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.3, 8]} />
          <meshStandardMaterial color={metalGray} metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.9, 0.7, 0.7]} />
          <meshStandardMaterial color={darkMetal} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Visor */}
        <mesh position={[0, 0.15, 0.36]}>
          <boxGeometry args={[0.75, 0.35, 0.02]} />
          <meshStandardMaterial color={neonGreen} emissive={neonGreen} emissiveIntensity={0.5} transparent opacity={0.3} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.18, 0.15, 0.36]}>
          <circleGeometry args={[0.1, 16]} />
          <meshStandardMaterial color={neonGreen} emissive={neonGreen} emissiveIntensity={3} />
        </mesh>
        <mesh position={[0.18, 0.15, 0.36]}>
          <circleGeometry args={[0.1, 16]} />
          <meshStandardMaterial color={neonGreen} emissive={neonGreen} emissiveIntensity={3} />
        </mesh>
        {/* Pupils */}
        <mesh ref={eyeLeftRef} position={[-0.18, 0.15, 0.37]}>
          <circleGeometry args={[0.04, 16]} />
          <meshStandardMaterial color={darkMetal} />
        </mesh>
        <mesh ref={eyeRightRef} position={[0.18, 0.15, 0.37]}>
          <circleGeometry args={[0.04, 16]} />
          <meshStandardMaterial color={darkMetal} />
        </mesh>
        {/* Antenna */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
          <meshStandardMaterial color={metalGray} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.78, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color={neonGreen} emissive={neonGreen} emissiveIntensity={4} />
        </mesh>

        {/* Arms */}
        <mesh position={[-0.85, -1.0, 0]}>
          <cylinderGeometry args={[0.1, 0.08, 1.0, 8]} />
          <meshStandardMaterial color={metalGray} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.85, -1.0, 0]}>
          <cylinderGeometry args={[0.1, 0.08, 1.0, 8]} />
          <meshStandardMaterial color={metalGray} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Hands */}
        <mesh position={[-0.85, -1.55, 0]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color={neonGreen} emissive={neonGreen} emissiveIntensity={1} />
        </mesh>
        <mesh position={[0.85, -1.55, 0]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color={neonGreen} emissive={neonGreen} emissiveIntensity={1} />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroRobot() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00ffaa" />
        <pointLight position={[-5, -3, 5]} intensity={0.5} color="#aa00ff" />
        <spotLight position={[0, 5, 3]} intensity={0.8} angle={0.5} penumbra={0.5} color="#00ffaa" />
        <RobotModel />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
