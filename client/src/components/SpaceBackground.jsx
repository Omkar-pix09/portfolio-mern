import { useEffect, useRef } from "react";

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let animationId;
    let width = 0;
    let height = 0;
    let time = 0;

    let particles = [];
    let shootingStars = [];
    let pulses = [];

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
    };

    const config = {
      maxParticles: 220,
      connectionDistance: 130,
      mouseRadius: 180,
    };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createParticles();
    }

    function createParticles() {
      const count = Math.min(
        config.maxParticles,
        Math.max(80, Math.floor((width * height) / 7000))
      );

      particles = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.6 + 0.2,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.005,
          ai: Math.random() < 0.2,
        });
      }
    }

    function createShootingStar() {
      shootingStars.push({
        x: Math.random() * width,
        y: -30,
        vx: 5 + Math.random() * 5,
        vy: 4 + Math.random() * 4,
        life: 1,
        length: 80 + Math.random() * 100,
      });
    }

    function createPulse() {
      const particle =
        particles[Math.floor(Math.random() * particles.length)];

      if (!particle) return;

      pulses.push({
        x: particle.x,
        y: particle.y,
        radius: 0,
        life: 1,
      });
    }

    function drawBackground() {
      const gradient = ctx.createRadialGradient(
        width / 2,
        height * 0.35,
        0,
        width / 2,
        height / 2,
        Math.max(width, height)
      );

      gradient.addColorStop(0, "#120d2a");
      gradient.addColorStop(0.35, "#09091b");
      gradient.addColorStop(0.7, "#050711");
      gradient.addColorStop(1, "#020308");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    function drawNebula() {
      const clouds = [
        {
          x: width * 0.15,
          y: height * 0.2,
          color: "rgba(100,60,255,0.12)",
        },
        {
          x: width * 0.85,
          y: height * 0.65,
          color: "rgba(30,130,255,0.09)",
        },
        {
          x: width * 0.55,
          y: height * 0.9,
          color: "rgba(200,50,200,0.07)",
        },
      ];

      clouds.forEach((cloud) => {
        const gradient = ctx.createRadialGradient(
          cloud.x,
          cloud.y,
          0,
          cloud.x,
          cloud.y,
          Math.min(width, height) * 0.55
        );

        gradient.addColorStop(0, cloud.color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });
    }

    function updateParticles() {
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;

        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        if (mouse.active) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.mouseRadius && distance > 0) {
            const force = 1 - distance / config.mouseRadius;
            const angle = Math.atan2(dy, dx);

            particle.vx += Math.cos(angle) * force * 0.01;
            particle.vy += Math.sin(angle) * force * 0.01;
          }
        }

        particle.vx *= 0.995;
        particle.vy *= 0.995;

        particle.vx +=
          Math.sin(time * 0.001 + particle.phase) * 0.0003;

        particle.vy +=
          Math.cos(time * 0.001 + particle.phase) * 0.0003;
      });
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.connectionDistance) {
            const opacity =
              (1 - distance / config.connectionDistance) * 0.22;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            ctx.strokeStyle = `rgba(110,150,255,${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
    }

    function drawParticles() {
      particles.forEach((particle) => {
        const twinkle =
          Math.sin(time * particle.speed + particle.phase) * 0.3 + 0.7;

        const alpha = particle.alpha * twinkle;

        const color = particle.ai
          ? "150,120,255"
          : "220,235,255";

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.ai ? particle.radius * 1.4 : particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(${color},${alpha})`;

        if (particle.ai) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(130,100,255,0.8)";
        }

        ctx.fill();

        ctx.shadowBlur = 0;
      });
    }

    function drawAICore() {
      const x = width / 2;
      const y = height / 2;

      const radius = Math.min(width, height) * 0.08;

      const glow = ctx.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        radius * 3
      );

      glow.addColorStop(0, "rgba(130,100,255,0.12)");
      glow.addColorStop(0.4, "rgba(80,120,255,0.05)");
      glow.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = glow;
      ctx.fillRect(
        x - radius * 3,
        y - radius * 3,
        radius * 6,
        radius * 6
      );

      for (let i = 0; i < 3; i++) {
        ctx.save();

        ctx.translate(x, y);
        ctx.rotate(time * 0.0004 * (i + 1));

        ctx.beginPath();

        ctx.ellipse(
          0,
          0,
          radius * (1.5 + i * 0.25),
          radius * (0.4 + i * 0.1),
          0,
          0,
          Math.PI * 2
        );

        ctx.strokeStyle = `rgba(130,150,255,${0.08 - i * 0.015})`;
        ctx.lineWidth = 1;

        ctx.stroke();

        ctx.restore();
      }

      const core = ctx.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        radius
      );

      core.addColorStop(0, "rgba(210,190,255,0.2)");
      core.addColorStop(0.4, "rgba(100,120,255,0.08)");
      core.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = core;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawPulses() {
      pulses = pulses.filter((pulse) => pulse.life > 0);

      pulses.forEach((pulse) => {
        pulse.radius += 2;
        pulse.life -= 0.015;

        ctx.beginPath();

        ctx.arc(
          pulse.x,
          pulse.y,
          pulse.radius,
          0,
          Math.PI * 2
        );

        ctx.strokeStyle = `rgba(120,160,255,${
          pulse.life * 0.2
        })`;

        ctx.lineWidth = 1;
        ctx.stroke();
      });
    }

    function drawShootingStars() {
      shootingStars = shootingStars.filter(
        (star) => star.life > 0
      );

      shootingStars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;
        star.life -= 0.015;

        const tailX =
          star.x - star.vx * (star.length / 8);

        const tailY =
          star.y - star.vy * (star.length / 8);

        const gradient = ctx.createLinearGradient(
          star.x,
          star.y,
          tailX,
          tailY
        );

        gradient.addColorStop(
          0,
          `rgba(255,255,255,${star.life})`
        );

        gradient.addColorStop(
          1,
          "rgba(100,130,255,0)"
        );

        ctx.beginPath();

        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();

        ctx.arc(
          star.x,
          star.y,
          2,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(255,255,255,${star.life})`;

        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(150,180,255,1)";

        ctx.fill();

        ctx.shadowBlur = 0;
      });
    }

    function drawMouseEffect() {
      if (!mouse.active) return;

      ctx.beginPath();

      ctx.arc(
        mouse.x,
        mouse.y,
        60 + Math.sin(time * 0.006) * 5,
        0,
        Math.PI * 2
      );

      ctx.strokeStyle = "rgba(130,170,255,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();

      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);

      ctx.fillStyle = "rgba(180,200,255,0.8)";

      ctx.shadowBlur = 15;
      ctx.shadowColor = "rgba(130,160,255,0.8)";

      ctx.fill();

      ctx.shadowBlur = 0;
    }

    function draw() {
      time++;

      drawBackground();
      drawNebula();

      updateParticles();

      drawConnections();
      drawParticles();
      drawAICore();
      drawPulses();
      drawShootingStars();
      drawMouseEffect();

      if (time % 180 === 0) {
        createPulse();
      }

      if (time % 350 === 0) {
        createShootingStar();
      }

      animationId = requestAnimationFrame(draw);
    }

    function handleMouseMove(event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    }

    function handleMouseLeave() {
      mouse.active = false;
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}
import { useEffect, useRef } from "react";

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let animationId;
    let width = 0;
    let height = 0;
    let time = 0;

    let particles = [];
    let shootingStars = [];
    let pulses = [];

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
    };

    const config = {
      maxParticles: 220,
      connectionDistance: 130,
      mouseRadius: 180,
    };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createParticles();
    }

    function createParticles() {
      const count = Math.min(
        config.maxParticles,
        Math.max(80, Math.floor((width * height) / 7000))
      );

      particles = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.6 + 0.2,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.005,
          ai: Math.random() < 0.2,
        });
      }
    }

    function createShootingStar() {
      shootingStars.push({
        x: Math.random() * width,
        y: -30,
        vx: 5 + Math.random() * 5,
        vy: 4 + Math.random() * 4,
        life: 1,
        length: 80 + Math.random() * 100,
      });
    }

    function createPulse() {
      const particle =
        particles[Math.floor(Math.random() * particles.length)];

      if (!particle) return;

      pulses.push({
        x: particle.x,
        y: particle.y,
        radius: 0,
        life: 1,
      });
    }

    function drawBackground() {
      const gradient = ctx.createRadialGradient(
        width / 2,
        height * 0.35,
        0,
        width / 2,
        height / 2,
        Math.max(width, height)
      );

      gradient.addColorStop(0, "#120d2a");
      gradient.addColorStop(0.35, "#09091b");
      gradient.addColorStop(0.7, "#050711");
      gradient.addColorStop(1, "#020308");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    function drawNebula() {
      const clouds = [
        {
          x: width * 0.15,
          y: height * 0.2,
          color: "rgba(100,60,255,0.12)",
        },
        {
          x: width * 0.85,
          y: height * 0.65,
          color: "rgba(30,130,255,0.09)",
        },
        {
          x: width * 0.55,
          y: height * 0.9,
          color: "rgba(200,50,200,0.07)",
        },
      ];

      clouds.forEach((cloud) => {
        const gradient = ctx.createRadialGradient(
          cloud.x,
          cloud.y,
          0,
          cloud.x,
          cloud.y,
          Math.min(width, height) * 0.55
        );

        gradient.addColorStop(0, cloud.color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });
    }

    function updateParticles() {
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;

        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        if (mouse.active) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.mouseRadius && distance > 0) {
            const force = 1 - distance / config.mouseRadius;
            const angle = Math.atan2(dy, dx);

            particle.vx += Math.cos(angle) * force * 0.01;
            particle.vy += Math.sin(angle) * force * 0.01;
          }
        }

        particle.vx *= 0.995;
        particle.vy *= 0.995;

        particle.vx +=
          Math.sin(time * 0.001 + particle.phase) * 0.0003;

        particle.vy +=
          Math.cos(time * 0.001 + particle.phase) * 0.0003;
      });
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.connectionDistance) {
            const opacity =
              (1 - distance / config.connectionDistance) * 0.22;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            ctx.strokeStyle = `rgba(110,150,255,${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
    }

    function drawParticles() {
      particles.forEach((particle) => {
        const twinkle =
          Math.sin(time * particle.speed + particle.phase) * 0.3 + 0.7;

        const alpha = particle.alpha * twinkle;

        const color = particle.ai
          ? "150,120,255"
          : "220,235,255";

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.ai ? particle.radius * 1.4 : particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(${color},${alpha})`;

        if (particle.ai) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(130,100,255,0.8)";
        }

        ctx.fill();

        ctx.shadowBlur = 0;
      });
    }

    function drawAICore() {
      const x = width / 2;
      const y = height / 2;

      const radius = Math.min(width, height) * 0.08;

      const glow = ctx.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        radius * 3
      );

      glow.addColorStop(0, "rgba(130,100,255,0.12)");
      glow.addColorStop(0.4, "rgba(80,120,255,0.05)");
      glow.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = glow;
      ctx.fillRect(
        x - radius * 3,
        y - radius * 3,
        radius * 6,
        radius * 6
      );

      for (let i = 0; i < 3; i++) {
        ctx.save();

        ctx.translate(x, y);
        ctx.rotate(time * 0.0004 * (i + 1));

        ctx.beginPath();

        ctx.ellipse(
          0,
          0,
          radius * (1.5 + i * 0.25),
          radius * (0.4 + i * 0.1),
          0,
          0,
          Math.PI * 2
        );

        ctx.strokeStyle = `rgba(130,150,255,${0.08 - i * 0.015})`;
        ctx.lineWidth = 1;

        ctx.stroke();

        ctx.restore();
      }

      const core = ctx.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        radius
      );

      core.addColorStop(0, "rgba(210,190,255,0.2)");
      core.addColorStop(0.4, "rgba(100,120,255,0.08)");
      core.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = core;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawPulses() {
      pulses = pulses.filter((pulse) => pulse.life > 0);

      pulses.forEach((pulse) => {
        pulse.radius += 2;
        pulse.life -= 0.015;

        ctx.beginPath();

        ctx.arc(
          pulse.x,
          pulse.y,
          pulse.radius,
          0,
          Math.PI * 2
        );

        ctx.strokeStyle = `rgba(120,160,255,${
          pulse.life * 0.2
        })`;

        ctx.lineWidth = 1;
        ctx.stroke();
      });
    }

    function drawShootingStars() {
      shootingStars = shootingStars.filter(
        (star) => star.life > 0
      );

      shootingStars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;
        star.life -= 0.015;

        const tailX =
          star.x - star.vx * (star.length / 8);

        const tailY =
          star.y - star.vy * (star.length / 8);

        const gradient = ctx.createLinearGradient(
          star.x,
          star.y,
          tailX,
          tailY
        );

        gradient.addColorStop(
          0,
          `rgba(255,255,255,${star.life})`
        );

        gradient.addColorStop(
          1,
          "rgba(100,130,255,0)"
        );

        ctx.beginPath();

        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();

        ctx.arc(
          star.x,
          star.y,
          2,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(255,255,255,${star.life})`;

        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(150,180,255,1)";

        ctx.fill();

        ctx.shadowBlur = 0;
      });
    }

    function drawMouseEffect() {
      if (!mouse.active) return;

      ctx.beginPath();

      ctx.arc(
        mouse.x,
        mouse.y,
        60 + Math.sin(time * 0.006) * 5,
        0,
        Math.PI * 2
      );

      ctx.strokeStyle = "rgba(130,170,255,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();

      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);

      ctx.fillStyle = "rgba(180,200,255,0.8)";

      ctx.shadowBlur = 15;
      ctx.shadowColor = "rgba(130,160,255,0.8)";

      ctx.fill();

      ctx.shadowBlur = 0;
    }

    function draw() {
      time++;

      drawBackground();
      drawNebula();

      updateParticles();

      drawConnections();
      drawParticles();
      drawAICore();
      drawPulses();
      drawShootingStars();
      drawMouseEffect();

      if (time % 180 === 0) {
        createPulse();
      }

      if (time % 350 === 0) {
        createShootingStar();
      }

      animationId = requestAnimationFrame(draw);
    }

    function handleMouseMove(event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    }

    function handleMouseLeave() {
      mouse.active = false;
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}