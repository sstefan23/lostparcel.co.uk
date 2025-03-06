console.log("script.js loaded at: " + new Date().toLocaleTimeString());

function scrollToProducts() {
    console.log("Scroll triggered at: " + new Date().toLocaleTimeString());
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Attach listener directly
const diveButton = document.querySelector('.cta-button');
if (diveButton) {
    diveButton.addEventListener('click', () => {
        console.log("Click detected at: " + new Date().toLocaleTimeString());
        scrollToProducts();
    });
} else {
    console.error("Dive In button not found!");
}

const peekButtons = document.querySelectorAll('.peek-button');
peekButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Sneak peek coming soon—imagine the wild stuff inside!');
    });
});