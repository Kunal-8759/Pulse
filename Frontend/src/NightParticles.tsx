// src/components/NightParticles.tsx
import React, { useEffect, useRef } from 'react';
import './NightParticles.css'; // <-- You'll create this in the next step

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export function NightParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Particle[] = [];
    const maxParticles = 60;

    for (let i = 0; i < maxParticles; i++) {
      createParticle();
    }

    function createParticle(): Particle {
      const x = Math.random() * canvas!.width;
      const y = canvas!.height + Math.random() * 20;
      const size = Math.random() * 2 + 0.5;
      const speedY = Math.random() * 0.5 + 0.1;
      const opacity = Math.random() * 0.6 + 0.3;
      const maxLife = Math.random() * 500 + 500;

      const particle = { x, y, size, speedY, opacity, life: 0, maxLife };
      particles.push(particle);
      return particle;
    }

    function updateParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y -= p.speedY;
        p.life += 1;
        if (p.y < -10 || p.life >= p.maxLife) {
          particles.splice(i, 1);
          createParticle();
        }
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        let fadeOpacity = p.opacity;
        if (p.life < 50) {
          fadeOpacity = (p.life / 50) * p.opacity;
        } else if (p.life > p.maxLife - 50) {
          fadeOpacity = ((p.maxLife - p.life) / 50) * p.opacity;
        }

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `rgba(255, 255, 210, ${fadeOpacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 210, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${fadeOpacity * 1.5})`;
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    let animationId: number;
    function animate() {
      updateParticles();
      drawParticles();
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="night-particles-canvas" />;
}
