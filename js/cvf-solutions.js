// Mobile toggle
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
mobileToggle && mobileToggle.addEventListener('click', () => {
  if (mobileMenu.style.display === 'none') mobileMenu.style.display = 'block'; else mobileMenu.style.display = 'none';
});

// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile menu
      if (window.innerWidth <= 900) mobileMenu.style.display = 'none';
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
    if (slides != null && slides.length > 0) {
      slides[idx].classList.add('active');
      idx = (idx + 1) % slides.length;
    }
  }
  nextSlide();
  setInterval(nextSlide, 5000);
});

// document.addEventListener("DOMContentLoaded", () => {
//   const canvas = document.getElementById('particles-bg');
//   if (!canvas) return;

//   const ctx = canvas.getContext('2d');
//   let w, h;
//   const particles = [];
//   window.particlesArray = particles;

//   function resize() {
//     w = canvas.width = window.innerWidth;
//     h = canvas.height = window.innerHeight;
//   }
//   window.addEventListener('resize', resize);
//   resize();

//   // Create particles
//   for (let i = 0; i < 75; i++) {
//     particles.push({
//       x: Math.random() * w,
//       y: Math.random() * h,
//       vx: (Math.random() - 0.5) * 0.5,
//       vy: (Math.random() - 0.5) * 0.5
//     });
//   }

//   function draw() {
//     ctx.clearRect(0, 0, w, h);
//     ctx.fillStyle = 'rgba(0, 200, 255, 0.6)';
//     ctx.strokeStyle = 'rgba(0, 200, 255, 0.2)';
//     ctx.lineWidth = 1;

//     for (let i = 0; i < particles.length; i++) {
//       const p = particles[i];
//       p.x += p.vx;
//       p.y += p.vy;

//       if (p.x < 0 || p.x > w) p.vx *= -1;
//       if (p.y < 0 || p.y > h) p.vy *= -1;

//       ctx.beginPath();
//       ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
//       ctx.fill();

//       // Connect nearby particles
//       for (let j = i + 1; j < particles.length; j++) {
//         const q = particles[j];
//         const dx = p.x - q.x;
//         const dy = p.y - q.y;
//         const dist = Math.sqrt(dx * dx + dy * dy);
//         if (dist < 100) {
//           ctx.beginPath();
//           ctx.moveTo(p.x, p.y);
//           ctx.lineTo(q.x, q.y);
//           ctx.stroke();
//         }
//       }
//     }

//     requestAnimationFrame(draw);
//   }

//   draw();
// });


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
  let logoPoints = [];
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
  logoImg.src = "../images/logo.jpg"; // use correct path from your HTML
  logoImg.crossOrigin = "anonymous"; // allows pixel access if hosted

  logoImg.onload = () => {
    const tempCanvas = document.createElement("canvas");
    const targetWidth = Math.min(w, h) * 0.35; // about a third of the screen
    const aspect = logoImg.height / logoImg.width;
    const targetHeight = targetWidth * aspect;

    tempCanvas.width = targetWidth;
    tempCanvas.height = targetHeight;

    const tctx = tempCanvas.getContext("2d");
    tctx.drawImage(logoImg, 0, 0, targetWidth, targetHeight);
    const imageData = tctx.getImageData(0, 0, targetWidth, targetHeight).data;

    const points = [];
    const step = 3; // smaller = higher resolution (more points)

    for (let y = 0; y < targetHeight; y += step) {
      for (let x = 0; x < targetWidth; x += step) {
        const i = (y * targetWidth + x) * 4;
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const brightness = (r + g + b) / 3;

        // Ignore white/near-white background pixels
        if (brightness < 240) {
          points.push({ x, y });
        }
      }
    }

    // Center the logo
    const offsetX = w / 2 - targetWidth / 2;
    const offsetY = h / 2 - targetHeight / 2;

    // Assign points globally
    logoPoints = points.map(p => ({
      x: p.x + offsetX,
      y: p.y + offsetY
    }));

    console.log(`✅ Generated ${logoPoints.length} logo points.`);
  };



  // --- Logo transition animation ---
//   window.animateLogoTransition = async function () {
//     if (!logoPoints.length || !particles.length) {
//       console.warn("⚠️ Logo points or particles not ready");
//       return;
//     }

//     console.log("🔥 Starting logo transition...");

//     // Assign each particle a random target from the logo shape
//     for (let i = 0; i < particles.length; i++) {
//       const p = particles[i];
//       const target = logoPoints[i % logoPoints.length];
//       p.tx = target.x;
//       p.ty = target.y;
//     }

//     mode = "collapse";

//     // collapse for 1.2s
//     await new Promise((r) => setTimeout(r, 1200));

//     mode = "logo"; // hold for a moment
//     await new Promise((r) => setTimeout(r, 800));

//     mode = "disperse"; // particles fly away
//     await new Promise((r) => setTimeout(r, 1000));

//     mode = "free"; // back to normal
//     console.log("✅ Transition done");
//   };


  // --- Draw loop ---
  function draw() {
  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = "rgba(0, 200, 255, 0.6)";
  ctx.strokeStyle = "rgba(0, 200, 255, 0.2)";
  ctx.lineWidth = 1;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    if (mode === "logo") {
      // Move smoothly toward logo target
      p.x += (p.tx - p.x) * 0.08;
      p.y += (p.ty - p.y) * 0.08;
    } else {
      // Normal free-floating motion
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Draw connections
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

document.addEventListener("DOMContentLoaded", () => {
  const pageContent = document.getElementById("page-content");

  // Fade in on page load
  pageContent.classList.add("fade-in");
  requestAnimationFrame(() => {
    pageContent.classList.remove("fade-in");
  });

  // Intercept internal link clicks for fade-out
  const links = document.querySelectorAll('a[href]:not([href^="#"])');

  links.forEach(link => {
    link.addEventListener("click", function(e) {
      const url = new URL(link.href, window.location.href);

      // Skip external links
      if (url.origin !== window.location.origin) return;

      e.preventDefault(); // stop immediate navigation
      pageContent.classList.add("fade-out");

      // After fade-out completes, navigate
      pageContent.addEventListener("transitionend", () => {
        window.location.href = link.href;
      }, { once: true });
    });
  });
});