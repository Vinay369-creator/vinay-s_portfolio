 // Starfield
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars(n) {
    stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.2,
        o: Math.random(),
        speed: Math.random() * 0.3 + 0.1,
        twinkle: Math.random() * Math.PI * 2
      });
    }
  }

  function drawStars(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.twinkle += s.speed * 0.02;
      const opacity = 0.3 + 0.5 * Math.abs(Math.sin(s.twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 200, 255, ${opacity})`;
      ctx.fill();
    });
    // A few colored sparkles
    stars.slice(0, 30).forEach(s => {
      const opacity = 0.4 + 0.4 * Math.abs(Math.sin(s.twinkle + 1));
      ctx.beginPath();
      ctx.arc(s.x * 0.8 + 100, s.y * 1.1, s.r * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 198, 255, ${opacity * 0.6})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }

  resize();
  createStars(180);
  drawStars();
  window.addEventListener('resize', () => { resize(); createStars(180); });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 100);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => io.observe(el));
