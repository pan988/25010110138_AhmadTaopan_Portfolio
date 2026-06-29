// ===========1. RESPONSIVE NAVIGATION MENU===============
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
   menuIcon.classList.toggle('bx-x');
   navbar.classList.toggle('active');
};

// Tutup navbar saat link diklik
document.querySelectorAll('.navbar a').forEach(link => {
   link.addEventListener('click', () => {
      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
   });
});

// ===========2. FORM VALIDATION===============
const contactForm = document.getElementById('contactForm');

if (contactForm) {
   contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const fullName = document.getElementById('fullName');
      const emailInput = document.getElementById('emailInput');
      const messageInput = document.getElementById('messageInput');

      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');
      const successMsg = document.getElementById('successMsg');

      // Reset error
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      fullName.classList.remove('error-border');
      emailInput.classList.remove('error-border');
      messageInput.classList.remove('error-border');
      successMsg.style.display = 'none';

      let isValid = true;

      // Validasi nama
      if (fullName.value.trim() === '') {
         nameError.textContent = '⚠ Nama tidak boleh kosong.';
         fullName.classList.add('error-border');
         isValid = false;
      }

      // Validasi email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput.value.trim() === '') {
         emailError.textContent = '⚠ Email tidak boleh kosong.';
         emailInput.classList.add('error-border');
         isValid = false;
      } else if (!emailRegex.test(emailInput.value.trim())) {
         emailError.textContent = '⚠ Format email tidak valid.';
         emailInput.classList.add('error-border');
         isValid = false;
      }

      // Validasi pesan (minimal 10 karakter)
      if (messageInput.value.trim().length < 10) {
         messageError.textContent = '⚠ Pesan minimal 10 karakter.';
         messageInput.classList.add('error-border');
         isValid = false;
      }

      // Jika semua valid
      if (isValid) {
         successMsg.style.display = 'block';
         contactForm.reset();
         setTimeout(() => {
            successMsg.style.display = 'none';
         }, 5000);
      }
   });
}

// ===========3. SMOOTH SCROLLING===============
// Sudah ditangani oleh CSS: scroll-behavior: smooth
// Tambahan: offset untuk fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
         e.preventDefault();
         const headerHeight = document.querySelector('.header').offsetHeight;
         const targetPosition = target.offsetTop - headerHeight;
         window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
         });
      }
   });
});

// ===========4. BACK TO TOP BUTTON===============
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
   if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
   } else {
      backToTopBtn.classList.remove('show');
   }
});

backToTopBtn.addEventListener('click', () => {
   window.scrollTo({
      top: 0,
      behavior: 'smooth'
   });
});

// ===========5. SKILL PROGRESS BAR ANIMATION===============
// Animasi progress bar saat section Skills terlihat di layar
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkills = (entries, observer) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth + '%';
         });
         observer.unobserve(entry.target);
      }
   });
};

const skillObserver = new IntersectionObserver(animateSkills, {
   threshold: 0.3
});

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
   skillObserver.observe(skillsSection);
}

// ===========6. ACTIVE NAV LINK ON SCROLL===============
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
   let current = '';
   const headerHeight = document.querySelector('.header').offsetHeight;

   sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 50;
      if (window.scrollY >= sectionTop) {
         current = section.getAttribute('id');
      }
   });

   navLinks.forEach(link => {
      link.style.color = '';
      link.style.borderBottom = '3px solid transparent';
      if (link.getAttribute('href') === '#' + current) {
         link.style.color = 'var(--main-color)';
         link.style.borderBottom = '3px solid var(--main-color)';
      }
   });
});
