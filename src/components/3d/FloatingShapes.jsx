import { Float, MeshDistortMaterial } from "@react-three/drei";

export default function FloatingShapes() {
  return (
    <group>
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[-4, 2, -5]} scale={1.5}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial color="#22d3ee" speed={3} distort={0.4} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[4, -2, -4]} rotation={[Math.PI / 4, 0, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#1e40af" wireframe />
        </mesh>
      </Float>
    </group>
  );
}