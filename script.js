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

// Tilt effect for box items
VanillaTilt.init(document.querySelectorAll(".box-item"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.3
});

// Fireworks explosion on "Dive In!" button
const diveInButton = document.querySelector('.hero .cta-button');
diveInButton.addEventListener('click', (e) => {
    // Prevent default scroll briefly for effect
    e.preventDefault();

    // Create explosion effect
    for (let i = 0; i < 10; i++) { // 10 mini packages
        const package = document.createElement('div');
        package.innerHTML = '📦';
        package.classList.add('firework-package');
        
        // Random position near button
        const rect = diveInButton.getBoundingClientRect();
        package.style.left = `${rect.left + rect.width / 2}px`;
        package.style.top = `${rect.top + rect.height / 2}px`;
        
        document.body.appendChild(package);

        // Random trajectory
        const angle = Math.random() * Math.PI * 2; // Full circle
        const distance = 100 + Math.random() * 100; // 100-200px flight
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        // Animate
        package.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${x}px, ${y}px) scale(0.5)`, opacity: 0 }
        ], {
            duration: 800, // 0.8s flight
            easing: 'ease-out',
            fill: 'forwards' // Stay at end state
        });

        // Clean up after animation
        setTimeout(() => package.remove(), 800);
    }

    // Trigger scroll after effect
    setTimeout(() => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    }, 800);
});