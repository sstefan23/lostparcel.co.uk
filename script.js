// Log when script loads
console.log("script.js loaded");

// Scroll to products section
function scrollToProducts() {
    console.log("Dive In clicked at: " + new Date().toLocaleTimeString());
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error("Products section not found!");
    }
}

// Add event listener instead of inline onclick
document.addEventListener('DOMContentLoaded', () => {
    const diveButton = document.querySelector('.cta-button');
    if (diveButton) {
        diveButton.addEventListener('click', scrollToProducts);
    } else {
        console.error("Dive In button not found!");
    }
});

// Keep the peek button logic
document.querySelectorAll('.peek-button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Sneak peek coming soon—imagine the wild stuff inside!');
    });
});