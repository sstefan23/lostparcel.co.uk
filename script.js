console.log("script.js loaded at: " + new Date().toLocaleTimeString());

const diveInButton = document.querySelector('.hero .cta-button');
diveInButton.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Dive In clicked!");
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
});