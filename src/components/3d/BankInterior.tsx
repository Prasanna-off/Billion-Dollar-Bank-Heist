import React from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGame } from '../../state/GameContext';
import { audioManager } from '../../audio/AudioManager';

export const BankInterior: React.FC = () => {
  const { currentScene, setScene } = useGame();

  const handleCorridorClick = () => {
    if (currentScene === 'BANK_INTERIOR') {
      audioManager.playSfx('footstep');
      setScene('SECURITY_CORRIDOR');
    }
  };

  return (
    <group position={[0, 0, -4]}>
      {/* Floor - Polished Warm Marble / Granite */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[18, 0.1, 12]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Ceiling with Office Grid */}
      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[18, 0.2, 12]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.8} />
      </mesh>

      {/* Side Walls with Warm Cream Finish */}
      <mesh position={[-9, 2.5, 0]} receiveShadow>
        <boxGeometry args={[0.2, 5, 12]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.5} />
      </mesh>
      <mesh position={[9, 2.5, 0]} receiveShadow>
        <boxGeometry args={[0.2, 5, 12]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.5} />
      </mesh>

      {/* Overhead Fluorescent Light Panels */}
      {[-4, 0, 4].map((x, xi) =>
        [-3, 0, 3].map((z, zi) => (
          <group key={`${xi}-${zi}`} position={[x, 4.95, z]}>
            <mesh>
              <boxGeometry args={[2.2, 0.05, 1.1]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2.0} />
            </mesh>
            <pointLight position={[0, -0.3, 0]} intensity={1.5} distance={8} color="#ffffff" />
          </group>
        ))
      )}

      {/* Wooden Bank Service Counters with Glass Panels */}
      <group position={[4.8, 0.65, 0]}>
        {/* Oak Wooden Desk Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.6, 1.3, 8.4]} />
          <meshStandardMaterial color="#b45309" roughness={0.4} />
        </mesh>
        {/* Black Marble Countertop */}
        <mesh position={[0, 0.68, 0]} castShadow>
          <boxGeometry args={[2.8, 0.08, 8.6]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.6} />
        </mesh>
        {/* Bulletproof Glass Screens */}
        <mesh position={[-0.6, 1.25, 0]}>
          <boxGeometry args={[0.08, 1.1, 8.0]} />
          <meshPhysicalMaterial
            color="#e0f2fe"
            transmission={0.9}
            transparent
            roughness={0.02}
          />
        </mesh>
      </group>

      {/* Round Customer Desks */}
      {[-2.8, -5.8].map((x, i) => (
        <group key={i} position={[x, 0.6, 1.5]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.1, 1.1, 1.2, 16]} />
            <meshStandardMaterial color="#d97706" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.62, 0]} castShadow>
            <cylinderGeometry args={[1.2, 1.2, 0.08, 16]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Waiting Lounge Chairs */}
      {[-6.5, -4.5].map((x, i) => (
        <group key={i} position={[x, 0.45, -2.5]}>
          <mesh castShadow>
            <boxGeometry args={[0.9, 0.9, 0.9]} />
            <meshStandardMaterial color="#0369a1" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.65, -0.4]} castShadow>
            <boxGeometry args={[0.9, 0.65, 0.12]} />
            <meshStandardMaterial color="#0284c7" roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Restricted Security Door leading to Safety Deposit Corridor */}
      <group
        position={[0, 2.2, -6]}
        onClick={handleCorridorClick}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <mesh>
          <boxGeometry args={[3.4, 4.4, 0.25]} />
          <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Neon Indicator Frame */}
        <mesh position={[0, 0, 0.14]} rotation={[0, 0, Math.PI / 4]}>
          <ringGeometry args={[1.5, 1.58, 4]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>

        <group position={[0, 2.4, 0.2]}>
          <Text
            fontSize={0.3}
            color="#0284c7"
            anchorX="center"
            anchorY="middle"
          >
            SAFETY DEPOSIT CORRIDOR →
          </Text>
        </group>
      </group>

      {/* Navigation Ring */}
      {currentScene === 'BANK_INTERIOR' && (
        <group
          position={[0, 0.1, -4]}
          onClick={handleCorridorClick}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.85, 1.1, 32]} />
            <meshBasicMaterial color="#0284c7" transparent opacity={0.9} />
          </mesh>
        </group>
      )}
    </group>
  );
};
