console.log("script.js loaded");

function scrollToProducts() {
    console.log("Dive In clicked at: " + new Date().toLocaleTimeString());
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error("Products section not found!");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const diveButton = document.querySelector('.cta-button');
    if (diveButton) {
        diveButton.addEventListener('click', scrollToProducts);
    } else {
        console.error("Dive In button not found!");
    }
});

document.querySelectorAll('.peek-button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Sneak peek coming soon—imagine the wild stuff inside!');
    });
});