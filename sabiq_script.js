// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
    navToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

document.querySelectorAll('#navLinks a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Waitlist form
const form = document.getElementById('waitlistForm');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const original = btn.textContent;
        btn.textContent = 'Joining...';
        btn.disabled = true;
        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                document.getElementById('successMsg').style.display = 'flex';
                form.querySelector('input').value = '';
                btn.textContent = 'Joined!';
            } else throw new Error();
        } catch {
            btn.textContent = original;
            btn.disabled = false;
            alert('Something went wrong. Please try again.');
        }
    });
}
