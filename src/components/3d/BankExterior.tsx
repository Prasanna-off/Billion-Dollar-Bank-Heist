import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGame } from '../../state/GameContext';
import { audioManager } from '../../audio/AudioManager';

export const BankExterior: React.FC = () => {
  const { currentScene, setScene } = useGame();
  const leftDoorRef = useRef<THREE.Mesh>(null);
  const rightDoorRef = useRef<THREE.Mesh>(null);
  const cameraSearchlightRef = useRef<THREE.SpotLight>(null);
  const cameraMeshRef = useRef<THREE.Group>(null);

  const isEntryOrInside =
    currentScene !== 'MAIN_MENU' &&
    currentScene !== 'HOW_TO_PLAY' &&
    currentScene !== 'BANK_EXTERIOR' &&
    currentScene !== 'SETTINGS' &&
    currentScene !== 'ADMIN_LOGIN' &&
    currentScene !== 'ADMIN_DASHBOARD';

  useFrame((state, delta) => {
    const targetDoorOffset = isEntryOrInside ? 1.6 : 0;
    if (leftDoorRef.current) {
      leftDoorRef.current.position.x = THREE.MathUtils.lerp(
        leftDoorRef.current.position.x,
        -0.8 - targetDoorOffset,
        delta * 3.5
      );
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.position.x = THREE.MathUtils.lerp(
        rightDoorRef.current.position.x,
        0.8 + targetDoorOffset,
        delta * 3.5
      );
    }

    // Security camera gentle scanning
    const time = state.clock.getElapsedTime();
    if (cameraMeshRef.current) {
      cameraMeshRef.current.rotation.y = Math.sin(time * 1.5) * 0.4;
      cameraMeshRef.current.rotation.x = 0.2 + Math.sin(time * 0.9) * 0.1;
    }
  });

  const handleDoorClick = () => {
    if (currentScene === 'BANK_EXTERIOR' || currentScene === 'MAIN_MENU') {
      audioManager.playSfx('door');
      setScene('BANK_ENTRY');
      setTimeout(() => {
        setScene('BANK_INTERIOR');
      }, 1400);
    }
  };

  return (
    <group position={[0, 0, 0]}>
      {/* Sunny Plaza Ground with Checkered Pattern */}
      <mesh position={[0, -0.05, 12]} receiveShadow>
        <boxGeometry args={[48, 0.1, 24]} />
        <meshStandardMaterial color="#64748b" roughness={0.6} metalness={0.15} />
      </mesh>

      {/* Decorative Paved Walking Path */}
      <mesh position={[0, -0.02, 10]} receiveShadow>
        <boxGeometry args={[14, 0.08, 18]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Vibrant Green Lawns & Palm Trees on both sides */}
      {[-16, 16].map((x, i) => (
        <group key={i} position={[x, 0.05, 8]}>
          <mesh receiveShadow>
            <boxGeometry args={[14, 0.15, 20]} />
            <meshStandardMaterial color="#16a34a" roughness={0.85} />
          </mesh>

          {/* Tropical Palm Trees */}
          {[-5, 5].map((tz, ti) => (
            <group key={ti} position={[0, 0, tz]}>
              {/* Tree Trunk */}
              <mesh position={[0, 2.2, 0]} castShadow>
                <cylinderGeometry args={[0.22, 0.32, 4.4, 8]} />
                <meshStandardMaterial color="#78350f" roughness={0.9} />
              </mesh>
              {/* Foliage Canopy */}
              <mesh position={[0, 4.6, 0]} castShadow>
                <sphereGeometry args={[1.8, 12, 12]} />
                <meshStandardMaterial color="#22c55e" roughness={0.7} />
              </mesh>
              <mesh position={[0, 5.5, 0]} castShadow>
                <sphereGeometry args={[1.2, 12, 12]} />
                <meshStandardMaterial color="#4ade80" roughness={0.6} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Grand Classical Marble Stairs (Multi-Tier) */}
      {[0, 1, 2, 3, 4].map((step) => (
        <mesh
          key={step}
          position={[0, 0.16 * step + 0.08, 4.5 - step * 0.55]}
          receiveShadow
          castShadow
        >
          <boxGeometry args={[24 - step * 1.0, 0.18, 4.2]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.25} metalness={0.2} />
        </mesh>
      ))}

      {/* Main Bank Building Marble Facade */}
      <mesh position={[0, 6.5, -0.6]} castShadow receiveShadow>
        <boxGeometry args={[26, 13, 2.6]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Classical Base Plinth */}
      <mesh position={[0, 0.9, 0.8]} castShadow receiveShadow>
        <boxGeometry args={[26.5, 1.4, 2.8]} />
        <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Triangular Classical Pediment Roof (Neoclassical Architecture) */}
      <group position={[0, 13.2, 0.9]}>
        <mesh rotation={[0, Math.PI / 4, 0]} castShadow>
          <cylinderGeometry args={[0, 11, 3.4, 4]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.35} metalness={0.25} />
        </mesh>
        {/* Entablature Cornice */}
        <mesh position={[0, -1.7, 0.2]} castShadow>
          <boxGeometry args={[26.5, 0.8, 2.8]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.2} />
        </mesh>
      </group>

      {/* Bank Name 3D Signage */}
      <group position={[0, 12.6, 2.2]}>
        <Text
          fontSize={0.85}
          color="#0369a1"
          anchorX="center"
          anchorY="middle"
        >
          FEDERAL BANK OF INDIA
          <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
        </Text>
      </group>

      <group position={[0, 11.5, 2.2]}>
        <Text
          fontSize={0.45}
          color="#d97706"
          anchorX="center"
          anchorY="middle"
        >
          ★ FBI CENTRAL VAULT FACILITY ★
          <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.1} />
        </Text>
      </group>

      {/* 6 Majestic Fluted Corinthian Style Columns */}
      {[-9.0, -5.4, -1.8, 1.8, 5.4, 9.0].map((x, i) => (
        <group key={i} position={[x, 6.4, 1.4]}>
          {/* Column Shaft */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.45, 0.5, 9.8, 24]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.15} />
          </mesh>
          {/* Ornate Golden Capital Top */}
          <mesh position={[0, 5.0, 0]} castShadow>
            <boxGeometry args={[1.35, 0.55, 1.35]} />
            <meshStandardMaterial color="#eab308" roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Golden Base Plinth */}
          <mesh position={[0, -5.0, 0]} castShadow>
            <boxGeometry args={[1.35, 0.55, 1.35]} />
            <meshStandardMaterial color="#eab308" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* 2 Tiers of Blue Reflective Grid Windows */}
      {[-7.2, -3.6, 3.6, 7.2].map((x, xi) => (
        <group key={xi}>
          {/* Ground Floor Window */}
          <group position={[x, 4.4, 0.75]}>
            <mesh castShadow>
              <boxGeometry args={[1.8, 2.4, 0.15]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 0, 0.09]}>
              <planeGeometry args={[1.6, 2.2]} />
              <meshPhysicalMaterial
                color="#0284c7"
                transmission={0.7}
                roughness={0.08}
                metalness={0.9}
              />
            </mesh>
          </group>

          {/* Upper Floor Window */}
          <group position={[x, 8.8, 0.75]}>
            <mesh castShadow>
              <boxGeometry args={[1.8, 2.4, 0.15]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 0, 0.09]}>
              <planeGeometry args={[1.6, 2.2]} />
              <meshPhysicalMaterial
                color="#0284c7"
                transmission={0.7}
                roughness={0.08}
                metalness={0.9}
              />
            </mesh>
          </group>
        </group>
      ))}

      {/* Grand Central Glass Portal & Sliding Doors */}
      <group position={[0, 3.4, 0.75]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.8, 5.2, 0.25]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>

        {/* Sliding Left & Right Doors with Blue Glass */}
        <mesh
          ref={leftDoorRef}
          position={[-0.85, 0, 0.14]}
          onClick={handleDoorClick}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <boxGeometry args={[1.6, 4.6, 0.1]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            transmission={0.85}
            transparent
            roughness={0.05}
            metalness={0.3}
          />
        </mesh>

        <mesh
          ref={rightDoorRef}
          position={[0.85, 0, 0.14]}
          onClick={handleDoorClick}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <boxGeometry args={[1.6, 4.6, 0.1]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            transmission={0.85}
            transparent
            roughness={0.05}
            metalness={0.3}
          />
        </mesh>

        {/* Gold Door Handles */}
        {[-0.2, 0.2].map((hx, hi) => (
          <mesh key={hi} position={[hx, 0, 0.24]}>
            <cylinderGeometry args={[0.04, 0.04, 0.9, 12]} />
            <meshStandardMaterial color="#eab308" metalness={0.98} roughness={0.1} />
          </mesh>
        ))}
      </group>

      {/* Security Scanning Camera */}
      <group ref={cameraMeshRef} position={[-2.4, 5.8, 1.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.35, 0.3, 0.7]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.38]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 16]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2.5} />
        </mesh>
        <spotLight
          ref={cameraSearchlightRef}
          position={[0, 0, 0.4]}
          target-position={[0, 0, 8]}
          angle={0.35}
          penumbra={0.6}
          intensity={2.5}
          color="#38bdf8"
          distance={16}
        />
      </group>

      {/* Street Lamps in Plaza */}
      {[-9, 9].map((x, i) => (
        <group key={i} position={[x, 0, 8]}>
          <mesh position={[0, 3.2, 0]}>
            <cylinderGeometry args={[0.09, 0.14, 6.4]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
          <mesh position={[0, 6.4, 0]}>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={1.8} />
          </mesh>
          <pointLight position={[0, 6.2, 0]} intensity={2.5} distance={10} color="#fef08a" />
        </group>
      ))}

      {/* Interactive Navigation Ring on steps */}
      {currentScene === 'BANK_EXTERIOR' && (
        <group
          position={[0, 0.9, 2.5]}
          onClick={handleDoorClick}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.2, 1.45, 32]} />
            <meshBasicMaterial color="#0284c7" transparent opacity={0.9} />
          </mesh>
        </group>
      )}
    </group>
  );
};
