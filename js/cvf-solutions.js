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
  const canvas = document.getElementById('particles-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h;
  const particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Create particles
  for (let i = 0; i < 75; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(0, 200, 255, 0.6)';
    ctx.strokeStyle = 'rgba(0, 200, 255, 0.2)';
    ctx.lineWidth = 1;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Connect nearby particles
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
});

