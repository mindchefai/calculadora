// src/components/Confetti.tsx
import { useEffect } from 'react';

interface ConfettiProps {
  duration?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ duration = 3000 }) => {
  useEffect(() => {
    const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces: Array<{
      x: number;
      y: number;
      rotation: number;
      speed: number;
      size: number;
      color: string;
      swing: number;
      swingSpeed: number;
    }> = [];

    const colors = ['#e5b45f', '#d4a04a', '#203c42', '#2c413d', '#f59e0b', '#fbbf24'];

    // Crear piezas de confeti
    for (let i = 0; i < 150; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        rotation: Math.random() * 360,
        speed: Math.random() * 3 + 2,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        swing: Math.random() * 2 - 1,
        swingSpeed: Math.random() * 0.1 + 0.05
      });
    }

    let animationId: number;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed > duration) {
        cancelAnimationFrame(animationId);
        canvas.style.display = 'none';
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pieces.forEach((piece) => {
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rotation * Math.PI) / 180);
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 1.5);
        ctx.restore();

        piece.y += piece.speed;
        piece.x += Math.sin(piece.y * piece.swingSpeed) * piece.swing;
        piece.rotation += piece.speed;

        if (piece.y > canvas.height) {
          piece.y = -20;
          piece.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [duration]);

  return (
    <canvas
      id="confetti-canvas"
      className="fixed inset-0 pointer-events-none z-[60]"
      style={{ mixBlendMode: 'normal' }}
    />
  );
};

export default Confetti;