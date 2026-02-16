import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function RobotModel() {
  const groupRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const eyeMeshes = useRef<THREE.Mesh[]>([]);
  const { scene } = useGLTF("/models/robot.glb");

  const neonGreen = useMemo(() => new THREE.Color("hsl(160, 100%, 50%)"), []);
  const darkMetal = useMemo(() => new THREE.Color("hsl(220, 20%, 12%)"), []);
  const metalGray = useMemo(() => new THREE.Color("hsl(220, 10%, 25%)"), []);

  // Clone scene and apply theme colors + find eyes
  const clonedScene = useMemo(() => {
    const cloned = scene.clone(true);
    const eyes: THREE.Mesh[] = [];

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const name = mesh.name.toLowerCase();

        // Try to detect eyes by name
        const isEye =
          name.includes("eye") ||
          name.includes("pupil") ||
          name.includes("iris") ||
          name.includes("cornea") ||
          name.includes("lens");

        if (isEye) {
          eyes.push(mesh);
          // Make eyes glow neon green
          mesh.material = new THREE.MeshStandardMaterial({
            color: neonGreen,
            emissive: neonGreen,
            emissiveIntensity: 3,
          });
        } else {
          // Theme the rest of the robot
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (mat && mat.isMeshStandardMaterial) {
            const newMat = mat.clone();
            const lightness = mat.color
              ? (mat.color.r + mat.color.g + mat.color.b) / 3
              : 0.5;

            if (lightness > 0.7) {
              // Light parts → neon accent
              newMat.color = neonGreen;
              newMat.emissive = neonGreen;
              newMat.emissiveIntensity = 1.5;
            } else if (lightness > 0.35) {
              // Mid parts → metallic gray
              newMat.color = metalGray;
              newMat.metalness = 0.8;
              newMat.roughness = 0.2;
            } else {
              // Dark parts → dark metal
              newMat.color = darkMetal;
              newMat.metalness = 0.9;
              newMat.roughness = 0.15;
            }
            mesh.material = newMat;
          }
        }
      }
    });

    eyeMeshes.current = eyes;
    return cloned;
  }, [scene, neonGreen, darkMetal, metalGray]);

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
      // Smoothly rotate toward cursor
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

    // Move eye meshes to follow cursor
    eyeMeshes.current.forEach((eye) => {
      if (eye) {
        const targetX = eye.userData.origX ?? eye.position.x;
        const targetY = eye.userData.origY ?? eye.position.y;
        if (eye.userData.origX === undefined) {
          eye.userData.origX = eye.position.x;
          eye.userData.origY = eye.position.y;
        }
        eye.position.x = THREE.MathUtils.lerp(
          eye.position.x,
          targetX + mouse.x * 0.03,
          0.1
        );
        eye.position.y = THREE.MathUtils.lerp(
          eye.position.y,
          targetY + mouse.y * 0.03,
          0.1
        );
      }
    });
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        <primitive object={clonedScene} scale={1.5} />
      </group>
    </Float>
  );
}

// Preload model
useGLTF.preload("/models/robot.glb");

export default function HeroRobot() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00ffaa" />
        <pointLight position={[-5, -3, 5]} intensity={0.5} color="#aa00ff" />
        <spotLight
          position={[0, 5, 3]}
          intensity={0.8}
          angle={0.5}
          penumbra={0.5}
          color="#00ffaa"
        />
        <RobotModel />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
