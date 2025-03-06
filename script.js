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
    max: 15,       // Max tilt angle (degrees)
    speed: 400,    // Speed of the tilt animation
    glare: true,   // Add a shiny glare effect
    "max-glare": 0.3 // Glare opacity
});