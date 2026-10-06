// 1. Mobile menu toggle
const navLinks = document.querySelector('.nav-links');
document.querySelector('.nav-toggle').addEventListener('click', () => navLinks.classList.toggle('show'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('show')));

// 2. FAQ accordion
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => q.parentElement.classList.toggle('open'));
});

// 3. Pincode check (dummy list - replace with real data later)
const servicePincodes = ['110001', '122001', '400001', '560001', '201301'];
document.getElementById('pincodeForm').addEventListener('submit', e => {
  e.preventDefault();
  const pin = document.getElementById('pincode').value.trim();
  const msg = document.getElementById('pincodeMsg');
  if (!/^\d{6}$/.test(pin)) {
    msg.textContent = 'Please enter a valid 6-digit pincode.';
    msg.style.color = 'crimson';
  } else if (servicePincodes.includes(pin)) {
    msg.textContent = '🎉 Great! We deliver to ' + pin + ' in 30 minutes.';
    msg.style.color = 'var(--primary)';
  } else {
    msg.textContent = "Sorry, we're not in " + pin + ' yet. Coming soon!';
    msg.style.color = 'var(--accent)';
  }
});

// 4. Contact form validation (no backend - static site)
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const msg = document.getElementById('formMsg');
  if (!form.checkValidity()) {
    msg.textContent = 'Please fill all fields with valid details.';
    msg.style.color = 'crimson';
    return;
  }
  msg.textContent = 'Thanks! We will get back to you soon.';
  msg.style.color = 'var(--primary)';
  form.reset();
});

// 5. Animated counters - start when stats come into view
const counters = document.querySelectorAll('.counter');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString('en-IN') + (current === target ? '+' : '');
      if (current === target) clearInterval(timer);
    }, 20);
    observer.unobserve(el);
  });
});
counters.forEach(c => observer.observe(c));

// 6. Footer year
document.getElementById('year').textContent = new Date().getFullYear();
