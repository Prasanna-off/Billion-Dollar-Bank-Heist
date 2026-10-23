import React, { useRef, useEffect } from 'react';

interface ExplosionVideoPlayerProps {
  onEnded?: () => void;
}

export const ExplosionVideoPlayer: React.FC<ExplosionVideoPlayerProps> = ({ onEnded }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animId: number;

    const processChromaKey = () => {
      if (!ctx || video.paused || video.ended || !video.videoWidth) return;

      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const len = frame.data.length / 4;

      for (let i = 0; i < len; i++) {
        const r = frame.data[i * 4];
        const g = frame.data[i * 4 + 1];
        const b = frame.data[i * 4 + 2];

        // Green Screen removal filter
        if (g > 90 && g > r * 1.2 && g > b * 1.2) {
          frame.data[i * 4 + 3] = 0; // Pure transparent
        } else if (g > 70 && g > r * 1.05 && g > b * 1.05) {
          // Soft edge blending for green spill
          const diff = g - Math.max(r, b);
          frame.data[i * 4 + 3] = Math.max(0, 255 - diff * 3.5);
        }
      }
      ctx.putImageData(frame, 0, 0);
    };

    const render = () => {
      processChromaKey();
      animId = requestAnimationFrame(render);
    };

    video.play().catch(() => {});
    animId = requestAnimationFrame(render);

    const handleEnded = () => {
      if (onEnded) onEnded();
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      cancelAnimationFrame(animId);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onEnded]);

  return (
    <div className="fixed inset-0 w-screen h-screen z-50 pointer-events-none overflow-hidden flex items-center justify-center">
      {/* Hidden single green screen explosion video */}
      <video
        ref={videoRef}
        src="/assets/video/explosion_greenscreen.mp4"
        playsInline
        muted
        crossOrigin="anonymous"
        className="hidden"
      />

      {/* Fullscreen chroma-keyed blast canvas covering entire screen */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover filter drop-shadow-[0_0_80px_rgba(255,100,0,1)] scale-105"
      />
    </div>
  );
};
