import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraRig } from './CameraRig';
import { BankExterior } from './BankExterior';
import { BankInterior } from './BankInterior';
import { SecurityCorridor } from './SecurityCorridor';
import { VaultRoom } from './VaultRoom';
import { Particles } from './Particles';
import { useGame } from '../../state/GameContext';

export const CanvasContainer: React.FC = () => {
  const { currentScene, settings } = useGame();

  const isWin = currentScene === 'WIN_SEQUENCE';
  const isLoss = currentScene === 'LOSS_SEQUENCE';

  const particleCount =
    settings.graphicsQuality === 'LOW'
      ? 60
      : settings.graphicsQuality === 'MEDIUM'
      ? 150
      : 300;

  const enableShadows = settings.graphicsQuality !== 'LOW';

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        shadows={enableShadows}
        camera={{ position: [0, 5, 25], fov: 50 }}
        gl={{
          antialias: settings.graphicsQuality !== 'LOW',
          powerPreference: 'high-performance',
        }}
        dpr={
          settings.graphicsQuality === 'LOW'
            ? 0.8
            : settings.graphicsQuality === 'MEDIUM'
            ? 1.0
            : Math.min(window.devicePixelRatio, 2)
        }
      >
        <Suspense fallback={null}>
          <CameraRig />

          {/* Sky background color */}
          <color
            attach="background"
            args={[
              isLoss ? '#3b0707' : isWin ? '#064e3b' : '#38bdf8', // Daytime Sunny Sky Blue
            ]}
          />

          {/* Daylight Atmospheric Fog */}
          <fog
            attach="fog"
            args={[
              isLoss ? '#450a0a' : isWin ? '#064e3b' : '#7dd3fc',
              12,
              45,
            ]}
          />

          {/* Daytime Ambient Light */}
          <ambientLight
            intensity={isLoss ? 0.9 : isWin ? 1.4 : 1.2}
            color={isLoss ? '#f87171' : isWin ? '#d1fae5' : '#ffffff'}
          />

          {/* Bright Directional Sunlight casting crisp shadows */}
          <directionalLight
            position={[16, 28, 20]}
            intensity={isLoss ? 1.5 : 1.6}
            color={isLoss ? '#ef4444' : '#fffbeb'}
            castShadow={enableShadows}
            shadow-mapSize-width={enableShadows ? 1024 : 512}
            shadow-mapSize-height={enableShadows ? 1024 : 512}
            shadow-bias={-0.0001}
          />

          {/* Blue Sky Fill Light */}
          <directionalLight
            position={[-14, 15, -6]}
            intensity={0.6}
            color="#bae6fd"
          />

          {/* 3D Scene Components */}
          <BankExterior />
          <BankInterior />
          <SecurityCorridor />
          <VaultRoom />

          {/* Particle Effects */}
          {isWin && <Particles type="win" count={particleCount} />}
          {isLoss && <Particles type="loss" count={particleCount} />}
          {!isWin && !isLoss && <Particles type="ambient" count={particleCount} />}
        </Suspense>
      </Canvas>
    </div>
  );
};
