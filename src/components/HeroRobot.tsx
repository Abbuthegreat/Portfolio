import { useRef } from "react";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function RobotModel() {
  const groupRef = useRef<THREE.Group>(null);
  const baseRotation = useRef(new THREE.Euler(0, 0, 0));
  const targetRotation = useRef(new THREE.Euler(0, 0, 0));
  const lastPointer = useRef<{ x: number; y: number } | null>(null);
  const isDragging = useRef(false);
  const isHovering = useRef(false);
  const hasBaseRotation = useRef(false);
  const targetScale = useRef(new THREE.Vector3(1, 1, 1));

  const { scene } = useGLTF("/models/Dazzling%20Jofo-Waasa.glb");

  const modelPosition: [number, number, number] = [0, -2.0, 0];

  useFrame(() => {
    if (!groupRef.current) {
      return;
    }

    if (!hasBaseRotation.current) {
      baseRotation.current.copy(groupRef.current.rotation);
      targetRotation.current.copy(groupRef.current.rotation);
      hasBaseRotation.current = true;
    }

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      0.15
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      0.15
    );

    const hoverScale = isHovering.current ? 1.03 : 1.0;
    targetScale.current.set(hoverScale, hoverScale, hoverScale);
    groupRef.current.scale.lerp(targetScale.current, 0.12);
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    const target = event.currentTarget as Element;
    if (target.setPointerCapture) {
      target.setPointerCapture(event.pointerId);
    }
    isDragging.current = true;
    lastPointer.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    const target = event.currentTarget as Element;
    if (target.releasePointerCapture) {
      target.releasePointerCapture(event.pointerId);
    }
    isDragging.current = false;
    lastPointer.current = null;
    targetRotation.current.copy(baseRotation.current);
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!isDragging.current || !lastPointer.current) {
      return;
    }

    const deltaX = event.clientX - lastPointer.current.x;
    const deltaY = event.clientY - lastPointer.current.y;

    targetRotation.current.y += deltaX * 0.005;
    targetRotation.current.x += deltaY * 0.005;
    targetRotation.current.x = THREE.MathUtils.clamp(
      targetRotation.current.x,
      -0.6,
      0.6
    );

    lastPointer.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerOver = () => {
    isHovering.current = true;
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    // Only reset if we're not dragging and actually leaving the canvas
    if (!isDragging.current) {
      const target = event.currentTarget as Element;
      const rect = target.getBoundingClientRect();
      
      // Check if pointer is actually outside the canvas
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        isHovering.current = false;
        targetRotation.current.copy(baseRotation.current);
      }
    }
  };

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <primitive object={scene} scale={50} position={modelPosition} />
    </group>
  );
}

// Preload model
useGLTF.preload("/models/Dazzling%20Jofo-Waasa.glb");

export default function HeroRobot() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        className="bg-transparent"
        gl={{ alpha: true }}
      >
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
