console.log("script.js loaded at: " + new Date().toLocaleTimeString());

const diveInButton = document.querySelector('.hero .cta-button');
diveInButton.addEventListener('click', () => {
    console.log("Dive In clicked!");
    alert("Button works!");
});