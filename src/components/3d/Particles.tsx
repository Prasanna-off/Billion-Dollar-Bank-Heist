import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  type: 'ambient' | 'win' | 'loss';
  count?: number;
}

export const Particles: React.FC<ParticlesProps> = ({ type, count = 120 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      if (type === 'ambient') {
        pos[i * 3] = (Math.random() - 0.5) * 40;
        pos[i * 3 + 1] = Math.random() * 15;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 40;

        // Subtle cyan / golden ambient dust
        col[i * 3] = 0.2 + Math.random() * 0.4;
        col[i * 3 + 1] = 0.6 + Math.random() * 0.4;
        col[i * 3 + 2] = 0.8 + Math.random() * 0.2;

        vel[i * 3] = (Math.random() - 0.5) * 0.02;
        vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
        vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      } else if (type === 'win') {
        // Exploding gold money particles & confetti from vault
        pos[i * 3] = (Math.random() - 0.5) * 4;
        pos[i * 3 + 1] = 2 + Math.random() * 3;
        pos[i * 3 + 2] = -12 + (Math.random() - 0.5) * 4;

        // Rich Gold / Emerald green
        if (Math.random() > 0.4) {
          col[i * 3] = 1.0; // Gold
          col[i * 3 + 1] = 0.85;
          col[i * 3 + 2] = 0.1;
        } else {
          col[i * 3] = 0.1; // Emerald
          col[i * 3 + 1] = 1.0;
          col[i * 3 + 2] = 0.4;
        }

        vel[i * 3] = (Math.random() - 0.5) * 0.15;
        vel[i * 3 + 1] = 0.08 + Math.random() * 0.18;
        vel[i * 3 + 2] = 0.05 + Math.random() * 0.15;
      } else {
        // Loss blast fire & smoke particles
        pos[i * 3] = (Math.random() - 0.5) * 3;
        pos[i * 3 + 1] = 1.5 + Math.random() * 3;
        pos[i * 3 + 2] = -12 + (Math.random() - 0.5) * 3;

        // Fiery red/orange/smoke
        if (Math.random() > 0.5) {
          col[i * 3] = 1.0;
          col[i * 3 + 1] = 0.2 + Math.random() * 0.3;
          col[i * 3 + 2] = 0.05;
        } else {
          col[i * 3] = 0.3;
          col[i * 3 + 1] = 0.3;
          col[i * 3 + 2] = 0.3;
        }

        vel[i * 3] = (Math.random() - 0.5) * 0.25;
        vel[i * 3 + 1] = 0.1 + Math.random() * 0.25;
        vel[i * 3 + 2] = 0.1 + Math.random() * 0.2;
      }
    }
    return [pos, col, vel];
  }, [count, type]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      if (type === 'ambient') {
        array[i * 3] += velocities[i * 3];
        array[i * 3 + 1] += velocities[i * 3 + 1];
        array[i * 3 + 2] += velocities[i * 3 + 2];

        if (array[i * 3 + 1] > 15) array[i * 3 + 1] = 0;
        if (array[i * 3 + 1] < 0) array[i * 3 + 1] = 15;
      } else if (type === 'win') {
        array[i * 3] += velocities[i * 3];
        array[i * 3 + 1] += velocities[i * 3 + 1];
        array[i * 3 + 2] += velocities[i * 3 + 2];

        velocities[i * 3 + 1] -= delta * 0.15; // Gravity

        if (array[i * 3 + 1] < 0) {
          array[i * 3] = (Math.random() - 0.5) * 6;
          array[i * 3 + 1] = 4 + Math.random() * 3;
          array[i * 3 + 2] = -10 + Math.random() * 6;
          velocities[i * 3 + 1] = 0.05 + Math.random() * 0.15;
        }
      } else {
        // Loss explosion expansion
        array[i * 3] += velocities[i * 3];
        array[i * 3 + 1] += velocities[i * 3 + 1];
        array[i * 3 + 2] += velocities[i * 3 + 2];

        velocities[i * 3] *= 0.97;
        velocities[i * 3 + 1] *= 0.97;
        velocities[i * 3 + 2] *= 0.97;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={type === 'ambient' ? 0.08 : 0.22}
        vertexColors
        transparent
        opacity={type === 'ambient' ? 0.6 : 0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
