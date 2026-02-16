import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

interface MiniRobotProps {
  color?: string;
  scale?: number;
}

function MiniRobotModel({ color = "hsl(160, 100%, 50%)", scale = 1 }: MiniRobotProps) {
  const groupRef = useRef<THREE.Group>(null);
  const accentColor = new THREE.Color(color);
  const darkMetal = new THREE.Color("hsl(220, 20%, 12%)");
  const metalGray = new THREE.Color("hsl(220, 10%, 25%)");

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={groupRef} scale={scale}>
        {/* Body */}
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.6, 0.7, 0.4]} />
          <meshStandardMaterial color={darkMetal} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.4, 0.21]}>
          <circleGeometry args={[0.08, 12]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={3} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.5, 0.35, 0.35]} />
          <meshStandardMaterial color={darkMetal} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.1, 0.1, 0.18]}>
          <circleGeometry args={[0.06, 12]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={3} />
        </mesh>
        <mesh position={[0.1, 0.1, 0.18]}>
          <circleGeometry args={[0.06, 12]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={3} />
        </mesh>
        {/* Antenna */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 6]} />
          <meshStandardMaterial color={metalGray} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.47, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={4} />
        </mesh>
        {/* Arms */}
        <mesh position={[-0.42, -0.35, 0]}>
          <cylinderGeometry args={[0.05, 0.04, 0.5, 6]} />
          <meshStandardMaterial color={metalGray} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.42, -0.35, 0]}>
          <cylinderGeometry args={[0.05, 0.04, 0.5, 6]} />
          <meshStandardMaterial color={metalGray} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

export default function MiniRobot({ color, scale = 0.8 }: MiniRobotProps) {
  return (
    <div className="w-full h-full min-h-[200px]">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 3, 3]} intensity={0.8} color="#00ffaa" />
        <pointLight position={[-3, -2, 3]} intensity={0.4} color="#aa00ff" />
        <MiniRobotModel color={color} scale={scale} />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
