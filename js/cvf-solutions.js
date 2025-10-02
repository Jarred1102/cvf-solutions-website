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
