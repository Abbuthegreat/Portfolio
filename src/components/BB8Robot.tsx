import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface BB8RobotProps {
  scale?: number;
  yOffset?: number;
  xOffset?: number;
}

function RobotModel() {
  const groupRef = useRef<THREE.Group>(null);

  const { scene, animations } = useGLTF("/robot/BB8-2020/BB8-2020.gltf");
  const { actions } = useAnimations(animations, groupRef);

  // Kill every baked-in GLTF animation so nothing moves on its own
  useEffect(() => {
    Object.values(actions).forEach((action) => action?.stop());
  }, [actions]);

  useFrame(() => {
    if (groupRef.current) {
      // Only Y-axis spin — lock X and Z completely so it never drifts
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.z = 0;
      groupRef.current.rotation.y += 0.008;

      // Lock position so it never moves from center
      groupRef.current.position.set(0, 0, 0);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

export default function BB8Robot({ scale = 1, yOffset = 0, xOffset = 0 }: BB8RobotProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      style={{ width: "100%", height: "100%", cursor: "default" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <Environment preset="city" />
      <group scale={scale} position={[xOffset, yOffset, 0]}>
        <RobotModel />
      </group>
    </Canvas>
  );
}
