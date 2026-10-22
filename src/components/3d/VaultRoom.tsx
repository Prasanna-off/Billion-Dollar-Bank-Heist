import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGame } from '../../state/GameContext';
import { audioManager } from '../../audio/AudioManager';

export const VaultRoom: React.FC = () => {
  const { currentScene, setScene } = useGame();

  const vaultDoorGroupRef = useRef<THREE.Group>(null);
  const lockingWheelRef = useRef<THREE.Group>(null);
  const gear1Ref = useRef<THREE.Mesh>(null);
  const gear2Ref = useRef<THREE.Mesh>(null);
  const winGlowLightRef = useRef<THREE.PointLight>(null);

  const isWin = currentScene === 'WIN_SEQUENCE';
  const isLoss = currentScene === 'LOSS_SEQUENCE';

  // Generate overflowing cash bundles mountain
  const moneyBundles = useMemo(() => {
    const bundles: { pos: [number, number, number]; rot: [number, number, number]; scale: [number, number, number] }[] = [];
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 2.8;
      const x = Math.cos(angle) * radius * 0.9;
      const z = 0.8 + Math.sin(angle) * (radius * 0.6) + Math.random() * 1.5;
      const y = 0.08 + Math.max(0, (2.5 - radius) * 0.35) + Math.random() * 0.15;
      bundles.push({
        pos: [x, y, z],
        rot: [(Math.random() - 0.5) * 0.3, Math.random() * Math.PI, (Math.random() - 0.5) * 0.3],
        scale: [0.55 + Math.random() * 0.1, 0.22 + Math.random() * 0.05, 0.32 + Math.random() * 0.08],
      });
    }
    for (let i = 0; i < 70; i++) {
      const x = (Math.random() - 0.5) * 2.2;
      const y = 0.4 + Math.random() * 1.8;
      const z = -0.5 - Math.random() * 2.0;
      bundles.push({
        pos: [x, y, z],
        rot: [(Math.random() - 0.5) * 0.4, Math.random() * Math.PI, (Math.random() - 0.5) * 0.4],
        scale: [0.55 + Math.random() * 0.1, 0.22 + Math.random() * 0.05, 0.32 + Math.random() * 0.08],
      });
    }
    return bundles;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (isWin) {
      if (lockingWheelRef.current) {
        lockingWheelRef.current.rotation.z += delta * 5.0;
      }
      if (gear1Ref.current) gear1Ref.current.rotation.z += delta * 4.0;
      if (gear2Ref.current) gear2Ref.current.rotation.z -= delta * 4.0;

      if (vaultDoorGroupRef.current) {
        vaultDoorGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          vaultDoorGroupRef.current.rotation.y,
          -Math.PI * 0.65,
          delta * 1.8
        );
      }
      if (winGlowLightRef.current) {
        winGlowLightRef.current.intensity = 5.0 + Math.sin(time * 8) * 1.5;
      }
    } else {
      if (vaultDoorGroupRef.current) {
        vaultDoorGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          vaultDoorGroupRef.current.rotation.y,
          0,
          delta * 4.0
        );
      }
    }
  });

  const handleTerminalClick = () => {
    if (currentScene === 'VAULT_ROOM') {
      audioManager.playSfx('click');
      setScene('PASSWORD_TERMINAL');
    }
  };

  return (
    <group position={[0, 0, -16]}>
      {/* Vault Chamber Room Floor & Ceiling */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[16, 0.1, 10]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 6.5, 0]}>
        <boxGeometry args={[16, 0.2, 10]} />
        <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.6} />
      </mesh>

      {/* Massive Vault Reinforced Steel Bulkhead Wall */}
      <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[16, 6.4, 0.6]} />
        <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.85} />
      </mesh>

      {/* Vault Circular Door Outer Frame / Bezel with Rivets */}
      <group position={[0, 3.2, 0.35]}>
        <mesh>
          <torusGeometry args={[2.7, 0.45, 24, 64]} />
          <meshStandardMaterial color="#475569" metalness={0.92} roughness={0.2} />
        </mesh>
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, ri) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh
              key={ri}
              position={[Math.cos(rad) * 2.9, Math.sin(rad) * 2.9, 0.2]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.08, 0.08, 0.2, 12]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.1} />
            </mesh>
          );
        })}
      </group>

      {/* Inside Vault Sanctum Interior */}
      <group position={[0, 0, -4]}>
        {/* Back Wall Safety Deposit Lockers */}
        <group position={[0, 3.2, -4]}>
          <mesh>
            <boxGeometry args={[12, 6.4, 0.2]} />
            <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.25} />
          </mesh>
          {[-4, -2, 0, 2, 4].map((x, xi) =>
            [-1.8, -0.6, 0.6, 1.8].map((y, yi) => (
              <mesh key={`${xi}-${yi}`} position={[x, y, 0.12]}>
                <boxGeometry args={[1.6, 0.8, 0.04]} />
                <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
              </mesh>
            ))
          )}
        </group>

        {/* Pyramids of Gold Bullion Bricks */}
        <group position={[-2.5, 0.6, -2]}>
          <mesh position={[0, -0.4, 0]} castShadow>
            <boxGeometry args={[2.5, 0.3, 2.0]} />
            <meshStandardMaterial color="#78350f" roughness={0.9} />
          </mesh>
          {[-0.6, 0, 0.6].map((gx, gi) => (
            <mesh key={gi} position={[gx, 0.1, 0]} castShadow>
              <boxGeometry args={[0.5, 0.5, 1.2]} />
              <meshStandardMaterial
                color="#eab308"
                metalness={0.98}
                roughness={0.08}
                emissive="#ca8a04"
                emissiveIntensity={0.25}
              />
            </mesh>
          ))}
          <mesh position={[0, 0.55, 0]} castShadow>
            <boxGeometry args={[1.2, 0.35, 0.8]} />
            <meshStandardMaterial
              color="#eab308"
              metalness={0.98}
              roughness={0.08}
              emissive="#ca8a04"
              emissiveIntensity={0.35}
            />
          </mesh>
        </group>

        {/* Golden Interior Overhead Spotlight */}
        <pointLight
          ref={winGlowLightRef}
          position={[0, 4.5, -1.5]}
          color="#fef08a"
          intensity={isWin ? 5 : 1.2}
          distance={12}
        />
      </group>

      {/* Overflowing Cash Bundles Mountain spilling out of Vault Doorway */}
      {(isWin || currentScene === 'PASSWORD_TERMINAL') && (
        <group position={[0, 0, 0]}>
          {moneyBundles.map((b, bi) => (
            <group key={bi} position={b.pos} rotation={b.rot} scale={b.scale}>
              <mesh castShadow receiveShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#e2e8f0" roughness={0.7} metalness={0.05} />
              </mesh>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.02, 1.02, 0.25]} />
                <meshStandardMaterial color="#0284c7" roughness={0.5} />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {/* Massive Vault Door Pivot (Hinged on Left at x = -2.7) */}
      <group ref={vaultDoorGroupRef} position={[-2.7, 3.2, 0.35]}>
        <group position={[2.7, 0, 0]}>
          <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[2.55, 2.55, 0.7, 48]} />
            <meshStandardMaterial color="#1e293b" metalness={0.94} roughness={0.16} />
          </mesh>

          <mesh position={[0, 0, 0.38]}>
            <ringGeometry args={[1.8, 2.3, 48]} />
            <meshStandardMaterial color="#475569" metalness={0.95} roughness={0.2} />
          </mesh>

          <mesh ref={gear1Ref} position={[-1.2, 0.9, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.12, 14]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh ref={gear2Ref} position={[1.2, -0.9, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.12, 14]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.1} />
          </mesh>

          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <mesh
                key={i}
                position={[Math.cos(rad) * 2.5, Math.sin(rad) * 2.5, 0]}
                rotation={[0, 0, rad + Math.PI / 2]}
              >
                <cylinderGeometry args={[0.13, 0.13, 0.65, 16]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.98} roughness={0.1} />
              </mesh>
            );
          })}

          <group ref={lockingWheelRef} position={[0, 0, 0.48]}>
            <mesh>
              <torusGeometry args={[0.65, 0.09, 16, 36]} />
              <meshStandardMaterial color="#f1f5f9" metalness={0.98} roughness={0.08} />
            </mesh>
            {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4].map((spokeAngle, si) => (
              <mesh key={si} rotation={[0, 0, spokeAngle]}>
                <boxGeometry args={[1.4, 0.09, 0.08]} />
                <meshStandardMaterial color="#f1f5f9" metalness={0.98} />
              </mesh>
            ))}
            <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.22, 0.25, 0.18, 20]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Massive Left Hinge Joint */}
      <group position={[-2.7, 3.2, 0.35]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.35, 0.35, 4.2, 24]} />
          <meshStandardMaterial color="#475569" metalness={0.95} roughness={0.2} />
        </mesh>
      </group>

      {/* Vault Access Interactive Terminal Console */}
      <group
        position={[3.4, 2.2, 0.6]}
        onClick={handleTerminalClick}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.8, 1.2, 0.18]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.25, 0.1]}>
          <planeGeometry args={[0.65, 0.5]} />
          <meshStandardMaterial
            color={isWin ? '#059669' : isLoss ? '#dc2626' : '#0284c7'}
            emissive={isWin ? '#10b981' : isLoss ? '#ef4444' : '#0284c7'}
            emissiveIntensity={1.2}
          />
        </mesh>
        <Text
          position={[0, 0.25, 0.12]}
          fontSize={0.09}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          FBI VAULT LOCK
        </Text>
        <Text
          position={[0, -0.25, 0.12]}
          fontSize={0.07}
          color="#fef08a"
          anchorX="center"
          anchorY="middle"
        >
          TAP TO UNLOCK
        </Text>
        <pointLight
          position={[0, 0.4, 0.3]}
          color={isWin ? '#10b981' : isLoss ? '#ef4444' : '#0284c7'}
          intensity={2.2}
          distance={4}
        />
      </group>
    </group>
  );
};
