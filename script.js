console.log("script.js loaded at: " + new Date().toLocaleTimeString());

// Fancy icon animation
const icons = document.querySelectorAll('.box-icon');
icons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.classList.add('animate');
        console.log(`${icon.parentElement.querySelector('h3').textContent} icon hovered!`);
    });
    icon.addEventListener('mouseleave', () => {
        icon.classList.remove('animate');
    });
});

// Peek button alerts
const peekButtons = document.querySelectorAll('.peek-button');
peekButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Sneak peek coming soon—imagine the wild stuff inside!');
    });
});

// Simple tilt effect for box items (no eval)
const boxItems = document.querySelectorAll('.box-item');
boxItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const tiltX = (y / rect.height) * 15;
        const tiltY = -(x / rect.width) * 15;
        item.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
});

// Fireworks explosion on "Dive In!" button
const diveInButton = document.querySelector('.hero .cta-button');
diveInButton.addEventListener('click', (e) => {
    e.preventDefault();
    for (let i = 0; i < 10; i++) {
        const package = document.createElement('div');
        package.innerHTML = '📦';
        package.classList.add('firework-package');
        const rect = diveInButton.getBoundingClientRect();
        package.style.left = `${rect.left + rect.width / 2}px`;
        package.style.top = `${rect.top + rect.height / 2}px`;
        document.body.appendChild(package);
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        package.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${x}px, ${y}px) scale(0.5)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out',
            fill: 'forwards'
        });
        setTimeout(() => package.remove(), 800);
    }
    setTimeout(() => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    }, 800);
});