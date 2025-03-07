console.log("script.js loaded at: " + new Date().toLocaleTimeString());
const diveInButton = document.querySelector('.hero .cta-button');
if (diveInButton) {
    diveInButton.addEventListener('click', (e) => {
        e.preventDefault(); // Stops default behavior
        console.log("Dive In clicked!");
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
    }); // No passive: true
} else {
    console.log("Button NOT found!");
}