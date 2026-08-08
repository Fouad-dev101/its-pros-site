// ===== Mobile navigation =====
const toggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

toggle.setAttribute('aria-expanded', 'false');

toggle.addEventListener('click', () => {
  const open = mobileNav.style.display === 'block';
  mobileNav.style.display = open ? 'none' : 'block';
  toggle.setAttribute('aria-expanded', String(!open));
});

document.querySelectorAll('#mobileNav a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.style.display = 'none';
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Close mobile menu with Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav.style.display === 'block') {
    mobileNav.style.display = 'none';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  }
});

// ===== Contact form =====
// Uses FormSubmit.co (no backend required). The FIRST message ever sent
// to a given address triggers a one-time confirmation e-mail from
// FormSubmit -- someone has to click "Activate form" in that e-mail before
// submissions start arriving normally. After that, it just works.
const form = document.getElementById('quoteForm');
const statusEl = document.getElementById('formStatus');

if (form) {
  const btn = form.querySelector('.submit-btn');
  const btnDefaultText = btn.textContent;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Honeypot: if this hidden field got filled in, it's a bot -- bail silently.
    if (form._honey.value) return;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      statusEl.textContent = 'Merci de remplir les champs obligatoires (*).';
      statusEl.style.color = '#e0745a';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Envoi en cours…';
    statusEl.textContent = '';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: form.phone.value.trim(),
          message: message,
          _subject: form._subject.value,
          _template: form._template.value
        })
      });

      if (!res.ok) throw new Error('Réponse serveur invalide');

      btn.textContent = 'Demande envoyée ✓';
      statusEl.textContent = 'Merci, votre demande a bien été envoyée. Nous revenons vers vous rapidement.';
      statusEl.style.color = 'var(--teal)';
      form.reset();

    } catch (err) {
      btn.disabled = false;
      btn.textContent = btnDefaultText;
      statusEl.textContent = "L'envoi a échoué. Merci de réessayer, ou d'appeler directement au 06 51 06 43 71.";
      statusEl.style.color = '#e0745a';
    }
  });
}
