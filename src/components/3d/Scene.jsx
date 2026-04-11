import { useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext"; 
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ContactShadows, Float, Sparkles, Stars } from "@react-three/drei";
import Robot from "./Robot";

export default function Scene() {
  const { theme } = useTheme();
  const location = useLocation();
  const path = location.pathname;
  const groupRef = useRef(); // Reference for smooth movement

  const isMobile = window.innerWidth < 1024;
  const isDark = theme === "dark";

  // Page States
  const isAboutPage = path === "/about";
  const isSkillsPage = path === "/skills";
  const isProjectsPage = path === "/projects";
  const isContactPage = path === "/contact";

  const getTargetPosition = () => {
    if (isMobile) {
      if (isSkillsPage) return [0, -2, -3];
      if (isAboutPage || isProjectsPage || isContactPage) return [0, -2.5, -2];
      return [0, -1.2, 0];
    }
    if (isAboutPage) return [3.5, -0.5, -1]; // Adjusted slightly for balance
    if (isProjectsPage) return [4.2, -0.8, -2]; 
    if (isContactPage) return [3.2, -0.4, 0]; 
    if (isSkillsPage) return [0, -2.2, -5];
    return [2.5, -1, 0];
  };

  const getTargetRotation = () => {
    if (isAboutPage || isProjectsPage || isContactPage) return [0, -0.5, 0];
    if (isSkillsPage) return [0, 0.3, 0];
    return [0, 0, 0];
  };

  // THE SMOOTHING ENGINE
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const targetPos = getTargetPosition();
    const targetRot = getTargetRotation();

    // Smoothly Lerp Position (0.1 is the speed - lower is smoother)
    groupRef.current.position.lerp(new THREE.Vector3(...targetPos), 0.1);

    // Smoothly Lerp Rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRot[1],
      0.1
    );
  });

  return (
    <>
      <Stars radius={100} depth={50} count={isDark ? 5000 : 1000} factor={4} fade speed={1} />
      <Sparkles count={isSkillsPage ? 100 : 40} scale={10} size={2} speed={0.4} opacity={isDark ? 0.3 : 0.6} color={isDark ? "cyan" : "#0284c7"} />

      <ambientLight intensity={isDark ? 0.5 : 1.2} /> 
      <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} intensity={isDark ? 2.5 : 3.5} color={isSkillsPage ? "#a855f7" : "#0ea5e9"} castShadow />
      <pointLight position={[-10, 2, -5]} intensity={isDark ? 2 : 1} color="#8b5cf6" />

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={groupRef} scale={isMobile ? (isSkillsPage ? 1.8 : 1.3) : (isSkillsPage ? 3.2 : 1.6)}>
          <Robot />
        </group>
      </Float>

      {!isSkillsPage && !isProjectsPage && (
        <ContactShadows position={[0, -2.5, 0]} opacity={isDark ? 0.4 : 0.1} scale={20} blur={2.5} far={4.5} />
      )}
    </>
  );
}