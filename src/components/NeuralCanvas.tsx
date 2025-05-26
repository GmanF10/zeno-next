import { useEffect, useRef } from 'react';

export default function NeuralCanvas() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let nodes = [];
    let particles = [];
    const NODE_COUNT = 100;
    const PARTICLE_COUNT = 150;
    const MAX_DISTANCE = 150;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    class Node {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.baseRadius = 1 + Math.random() * 2.5;
        this.radius = this.baseRadius;
        this.pulseDirection = 1;
        this.colorHue = 140 + Math.random() * 60;
      }
      move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x <= 0 || this.x >= width) this.vx *= -1;
        if (this.y <= 0 || this.y >= height) this.vy *= -1;
        this.radius += 0.02 * this.pulseDirection;
        if (this.radius > this.baseRadius * 1.3 || this.radius < this.baseRadius * 0.7) {
          this.pulseDirection *= -1;
        }
        this.colorHue += 0.2;
        if (this.colorHue > 200) this.colorHue = 140;
      }
      draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3);
        gradient.addColorStop(0, `hsla(${this.colorHue}, 100%, 70%, 0.9)`);
        gradient.addColorStop(1, `hsla(${this.colorHue}, 100%, 70%, 0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${this.colorHue}, 100%, 70%)`;
        ctx.shadowColor = `hsl(${this.colorHue}, 100%, 70%)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 0.8 + 0.3;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.3 + 0.1;
      }
      move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.x = width;
        else if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        else if (this.y > height) this.y = 0;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57, 255, 20, ${this.opacity})`;
        ctx.fill();
      }
    }

    function connectNodes() {
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DISTANCE) {
            const alpha = 1 - dist / MAX_DISTANCE;
            ctx.strokeStyle = `hsla(${nodes[i].colorHue}, 100%, 70%, ${alpha * 0.7})`;
            ctx.lineWidth = 1;
            ctx.shadowColor = ctx.strokeStyle;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }
    }

    const mouse = { x: 0, y: 0, active: false };

    canvas.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });
    canvas.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    function repelFromMouse(node, mouse) {
      if (!mouse.active) return;
      const dx = node.x - mouse.x;
      const dy = node.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repelRadius = 150;
      if (dist < repelRadius) {
        const force = (repelRadius - dist) / repelRadius;
        const angle = Math.atan2(dy, dx);
        node.vx += Math.cos(angle) * force * 0.5;
        node.vy += Math.sin(angle) * force * 0.5;
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => { p.move(); p.draw(); });
      nodes.forEach((node) => { repelFromMouse(node, mouse); node.move(); node.draw(); });
      connectNodes();
      requestAnimationFrame(animate);
    }

    function init() {
      resize();
      nodes = Array.from({ length: NODE_COUNT }, () => new Node());
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
      animate();
    }

    window.addEventListener('resize', resize);
    init();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas id="neuralCanvas" ref={canvasRef} style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1
    }} />
  );
}
