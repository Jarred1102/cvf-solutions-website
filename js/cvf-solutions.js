// Mobile toggle
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
mobileToggle && mobileToggle.addEventListener('click', ()=>{
    if(mobileMenu.style.display === 'none') mobileMenu.style.display = 'block'; else mobileMenu.style.display = 'none';
});

// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if(href.length > 1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
        // close mobile menu
        if(window.innerWidth <= 900) mobileMenu.style.display = 'none';
    }
    });
});

// // Contact form submission (basic)
// const contactForm = document.getElementById('contactForm');
// const formStatus = document.getElementById('formStatus');
// const formEndpoint = '/submit-form'; // change this to your backend endpoint or 3rd-party service

// contactForm.addEventListener('submit', async (e)=>{
//     e.preventDefault();
//     formStatus.textContent = 'Sending...';
//     const fd = new FormData(contactForm);
//     const payload = {};
//     fd.forEach((v,k)=>payload[k]=v);

//     try{
//     const res = await fetch(formEndpoint,{
//         method:'POST',
//         headers:{'Content-Type':'application/json'},
//         body: JSON.stringify(payload)
//     });
//     if(res.ok){
//         formStatus.textContent = 'Message sent — we will contact you soon.';
//         contactForm.reset();
//     } else {
//         const txt = await res.text();
//         formStatus.textContent = 'Error sending message.';
//         console.error('Form error',res.status,txt);
//     }
//     }catch(err){
//     console.error(err);
//     formStatus.textContent = 'Could not send message. Please email info@cvf-solutions.com.';
//     }
// });

// Simple slideshow for homepage
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll('.slideshow-container img');
  console.log("slides found:", slides.length);
  let idx = 0;
  function nextSlide() {
    slides.forEach(s => s.classList.remove('active'));
    slides[idx].classList.add('active');
    idx = (idx + 1) % slides.length;
  }
  nextSlide();
  setInterval(nextSlide, 5000);
});


document.addEventListener("DOMContentLoaded", () => {
  const pageContent = document.getElementById("page-content");

  // Fade in on page load
  pageContent.classList.add("fade-in");
  requestAnimationFrame(() => {
    pageContent.classList.remove("fade-in");
  });

  // --- Particle system setup ---
  const canvas = document.getElementById("particles-bg");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let w, h;
  const particles = [];
  const logoPoints = [];
  let mode = "free";
  let logoReady = false;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  // Create base particles
  for (let i = 0; i < 75; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    });
  }

  // Load and sample logo
  const logoImg = new Image();
  logoImg.src = "../images/logo.jpg"; // ensure path correct (relative to page)
  logoImg.onload = () => {
    const tempCanvas = document.createElement("canvas");
    const size = Math.min(w, h) * 0.3;
    tempCanvas.width = size;
    tempCanvas.height = size;

    const tctx = tempCanvas.getContext("2d");
    tctx.drawImage(logoImg, 0, 0, size, size);
    const data = tctx.getImageData(0, 0, size, size).data;

    logoPoints.length = 0;
    for (let y = 0; y < size; y += 3) {
      for (let x = 0; x < size; x += 3) {
        const i = (y * size + x) * 4;
        const brightness = data[i] + data[i + 1] + data[i + 2];
        if (brightness < 700) logoPoints.push({ x, y });
      }
    }

    logoReady = logoPoints.length > 0;
    console.log(`Logo points ready: ${logoPoints.length}`);
  };

  // --- Logo transition animation ---
  window.animateLogoTransition = async function () {
    if (!logoReady) return; // don't try until logo is ready

    const ease = (t) => 0.5 - 0.5 * Math.cos(Math.PI * t);

    // Create centered targets
    const targets = particles.map((_, i) => {
      const lp = logoPoints[i % logoPoints.length];
      return {
        x: lp.x + w / 2 - (Math.min(w, h) * 0.3) / 2,
        y: lp.y + h / 2 - (Math.min(w, h) * 0.3) / 2,
      };
    });

    // Collapse to logo
    const collapseDuration = 1500;
    const startTime = performance.now();
    await new Promise((resolve) => {
      const step = (now) => {
        const t = Math.min((now - startTime) / collapseDuration, 1);
        const eased = ease(t);
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const tgt = targets[i];
          p.x += (tgt.x - p.x) * 0.1 * eased;
          p.y += (tgt.y - p.y) * 0.1 * eased;
        }
        if (t < 1) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });

    await new Promise((r) => setTimeout(r, 800)); // pause briefly

    // Disperse outward
    const disperseDuration = 1500;
    const disperseStart = performance.now();
    await new Promise((resolve) => {
      const step = (now) => {
        const t = Math.min((now - disperseStart) / disperseDuration, 1);
        const eased = ease(t);
        for (let p of particles) {
          const dx = p.x - w / 2;
          const dy = p.y - h / 2;
          p.x += dx * 0.03 * eased;
          p.y += dy * 0.03 * eased;
        }
        if (t < 1) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });
  };

  // --- Draw loop ---
  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(0, 200, 255, 0.6)";
    ctx.strokeStyle = "rgba(0, 200, 255, 0.2)";
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();

  // --- Fade and navigation handler ---
  const links = document.querySelectorAll('a[href]:not([href^="#"])');
  links.forEach((link) => {
    link.addEventListener("click", async (e) => {
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || link.href.startsWith("mailto:")) return;

      e.preventDefault();
      pageContent.classList.add("fade-out");
      await new Promise((r) => setTimeout(r, 400));

      if (window.animateLogoTransition) await window.animateLogoTransition();

      // Allow animation to finish
      setTimeout(() => {
        window.location.href = link.href;
      }, 600);
    });
  });
});


/* WORKING PAGE FADE IN/OUT TRANSITIONS */

// document.addEventListener("DOMContentLoaded", () => {
//   const pageContent = document.getElementById("page-content");

//   // Fade in on page load
//   pageContent.classList.add("fade-in");
//   requestAnimationFrame(() => {
//     pageContent.classList.remove("fade-in");
//   });

//   // Intercept internal link clicks for fade-out
//   const links = document.querySelectorAll('a[href]:not([href^="#"])');

//   links.forEach(link => {
//     link.addEventListener("click", function(e) {
//       const url = new URL(link.href, window.location.href);

//       // Skip external links
//       if (url.origin !== window.location.origin) return;

//       e.preventDefault(); // stop immediate navigation
//       pageContent.classList.add("fade-out");

//       // After fade-out completes, navigate
//       pageContent.addEventListener("transitionend", () => {
//         window.location.href = link.href;
//       }, { once: true });
//     });
//   });
// });