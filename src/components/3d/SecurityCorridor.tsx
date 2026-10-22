import React from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGame } from '../../state/GameContext';
import { audioManager } from '../../audio/AudioManager';

export const SecurityCorridor: React.FC = () => {
  const { currentScene, setScene } = useGame();

  const handleVaultApproach = () => {
    if (currentScene === 'SECURITY_CORRIDOR') {
      audioManager.playSfx('footstep');
      setScene('VAULT_ROOM');
    }
  };

  return (
    <group position={[0, 0, -10]}>
      {/* High-Gloss White Floor Tiles */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[8.4, 0.1, 10.4]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.15} metalness={0.4} />
      </mesh>

      {/* Ceiling with Recessed Light Panels */}
      <mesh position={[0, 5.2, 0]}>
        <boxGeometry args={[8.4, 0.2, 10.4]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} />
      </mesh>

      {/* Bright Ceiling Panels */}
      {[-3, 0, 3].map((z, i) => (
        <group key={i} position={[0, 5.15, z]}>
          <mesh>
            <boxGeometry args={[3.0, 0.05, 1.8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2.5} />
          </mesh>
          <pointLight position={[0, -0.4, 0]} intensity={2.0} distance={10} color="#ffffff" />
        </group>
      ))}

      {/* Left Wall - Brushed Stainless Steel Safety Deposit Box Lockers */}
      <group position={[-4.0, 2.6, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.4, 5.2, 10.4]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Deposit Box Panels with Golden Keyholes */}
        {[-3.5, -2, -0.5, 1, 2.5, 4].map((z, zi) =>
          [-1.6, -0.8, 0, 0.8, 1.6].map((y, yi) => (
            <group key={`${zi}-${yi}`} position={[0.22, y, z]}>
              <mesh>
                <boxGeometry args={[0.02, 0.7, 1.3]} />
                <meshStandardMaterial color="#475569" metalness={0.92} roughness={0.2} />
              </mesh>
              {/* Dual Gold Keyholes */}
              {[-0.25, 0.25].map((kx, ki) => (
                <mesh key={ki} position={[0.02, 0, kx]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.035, 0.035, 0.02, 8]} />
                  <meshStandardMaterial color="#eab308" metalness={0.98} roughness={0.1} />
                </mesh>
              ))}
            </group>
          ))
        )}
      </group>

      {/* Right Wall - Brushed Stainless Steel Safety Deposit Box Lockers */}
      <group position={[4.0, 2.6, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.4, 5.2, 10.4]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Deposit Box Panels with Golden Keyholes */}
        {[-3.5, -2, -0.5, 1, 2.5, 4].map((z, zi) =>
          [-1.6, -0.8, 0, 0.8, 1.6].map((y, yi) => (
            <group key={`${zi}-${yi}`} position={[-0.22, y, z]}>
              <mesh>
                <boxGeometry args={[0.02, 0.7, 1.3]} />
                <meshStandardMaterial color="#475569" metalness={0.92} roughness={0.2} />
              </mesh>
              {/* Dual Gold Keyholes */}
              {[-0.25, 0.25].map((kx, ki) => (
                <mesh key={ki} position={[-0.02, 0, kx]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.035, 0.035, 0.02, 8]} />
                  <meshStandardMaterial color="#eab308" metalness={0.98} roughness={0.1} />
                </mesh>
              ))}
            </group>
          ))
        )}
      </group>

      {/* Heavy Steel Vault Entrance Doorway (Back Wall) */}
      <group
        position={[0, 2.6, -5.2]}
        onClick={handleVaultApproach}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <mesh>
          <boxGeometry args={[4.4, 5.2, 0.3]} />
          <meshStandardMaterial color="#1e293b" metalness={0.95} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0, 0.18]}>
          <torusGeometry args={[1.7, 0.16, 16, 36]} />
          <meshStandardMaterial color="#0284c7" metalness={0.9} />
        </mesh>

        <group position={[0, 2.8, 0.2]}>
          <Text
            fontSize={0.28}
            color="#0284c7"
            anchorX="center"
            anchorY="middle"
          >
            FBI CENTRAL VAULT SANCTUM →
          </Text>
        </group>
      </group>

      {/* Navigation Ring */}
      {currentScene === 'SECURITY_CORRIDOR' && (
        <group
          position={[0, 0.1, -3.2]}
          onClick={handleVaultApproach}
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
