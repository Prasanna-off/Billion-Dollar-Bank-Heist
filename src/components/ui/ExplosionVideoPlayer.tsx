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
    if (!ctx) return;

    let animationFrameId: number;

    const processFrame = () => {
      if (video.paused || video.ended) return;

      if (video.videoWidth && video.videoHeight) {
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const l = frame.data.length / 4;

        for (let i = 0; i < l; i++) {
          const r = frame.data[i * 4];
          const g = frame.data[i * 4 + 1];
          const b = frame.data[i * 4 + 2];

          // Key out green screen background
          if (g > 95 && g > r * 1.25 && g > b * 1.25) {
            frame.data[i * 4 + 3] = 0; // Transparent
          } else if (g > 80 && g > r * 1.1 && g > b * 1.1) {
            // Soft edge feathering
            const diff = g - Math.max(r, b);
            frame.data[i * 4 + 3] = Math.max(0, 255 - diff * 3);
          }
        }
        ctx.putImageData(frame, 0, 0);
      }

      animationFrameId = requestAnimationFrame(processFrame);
    };

    video.play().catch((err) => {
      console.warn('Video autoplay failed:', err);
    });

    video.addEventListener('play', () => {
      animationFrameId = requestAnimationFrame(processFrame);
    });

    const handleEnded = () => {
      if (onEnded) onEnded();
    };
    video.addEventListener('ended', handleEnded);

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onEnded]);

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Hidden Source Video */}
      <video
        ref={videoRef}
        src="/assets/video/explosion_video.mp4"
        playsInline
        muted
        crossOrigin="anonymous"
        className="hidden"
      />

      {/* Chroma-keyed Realtime Canvas Explosion Overlay */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover pointer-events-none filter drop-shadow-[0_0_50px_rgba(255,100,0,0.8)]"
      />
    </div>
  );
};
