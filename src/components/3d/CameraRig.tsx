import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGame } from '../../state/GameContext';

interface CameraTarget {
  pos: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
}

export const CameraRig: React.FC = () => {
  const { currentScene } = useGame();
  const currentPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 5, 25));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 3, 0));

  // Compute desired camera position and focus target based on active scene
  const getSceneTarget = (): CameraTarget => {
    switch (currentScene) {
      case 'MAIN_MENU':
        return {
          pos: new THREE.Vector3(0, 6, 26),
          target: new THREE.Vector3(0, 4, 0),
          fov: 50,
        };
      case 'HOW_TO_PLAY':
        return {
          pos: new THREE.Vector3(-4, 5, 20),
          target: new THREE.Vector3(0, 4, 0),
          fov: 52,
        };
      case 'BANK_EXTERIOR':
        return {
          pos: new THREE.Vector3(0, 3.2, 16),
          target: new THREE.Vector3(0, 2.8, 0),
          fov: 48,
        };
      case 'BANK_ENTRY':
        return {
          pos: new THREE.Vector3(0, 2.2, 4),
          target: new THREE.Vector3(0, 2.2, -4),
          fov: 50,
        };
      case 'BANK_INTERIOR':
        return {
          pos: new THREE.Vector3(0, 2.5, -1),
          target: new THREE.Vector3(0, 2.2, -10),
          fov: 55,
        };
      case 'SECURITY_CORRIDOR':
        return {
          pos: new THREE.Vector3(0, 2.2, -6),
          target: new THREE.Vector3(0, 2.0, -14),
          fov: 50,
        };
      case 'VAULT_ROOM':
        return {
          pos: new THREE.Vector3(0, 2.4, -10),
          target: new THREE.Vector3(0, 2.4, -15),
          fov: 45,
        };
      case 'PASSWORD_TERMINAL':
        return {
          pos: new THREE.Vector3(1.1, 1.8, -13.2),
          target: new THREE.Vector3(1.5, 1.8, -14.4),
          fov: 38,
        };
      case 'WIN_SEQUENCE':
        return {
          pos: new THREE.Vector3(0, 2.3, -11.5),
          target: new THREE.Vector3(0, 2.3, -16.5),
          fov: 46,
        };
      case 'LOSS_SEQUENCE':
        return {
          pos: new THREE.Vector3(0, 2.8, -8.5),
          target: new THREE.Vector3(0, 2.2, -15),
          fov: 52,
        };
      default:
        return {
          pos: new THREE.Vector3(0, 4, 20),
          target: new THREE.Vector3(0, 3, 0),
          fov: 50,
        };
    }
  };

  useFrame((state, delta) => {
    const { pos: targetPos, target: targetLook, fov } = getSceneTarget();
    const camera = state.camera as THREE.PerspectiveCamera;

    // Stable smooth lerp without trembling/jitter
    const safeDelta = Math.min(delta, 0.05);
    const lerpFactor = THREE.MathUtils.clamp(safeDelta * 3.5, 0.01, 1.0);

    currentPos.current.lerp(targetPos, lerpFactor);
    currentLookAt.current.lerp(targetLook, lerpFactor);

    // Camera positioning without random Math.random() jitter
    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);

    if (Math.abs(camera.fov - fov) > 0.05) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, fov, lerpFactor);
      camera.updateProjectionMatrix();
    }
  });

  return null;
};
