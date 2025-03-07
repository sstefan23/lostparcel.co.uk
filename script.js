console.log("script.js loaded at: " + new Date().toLocaleTimeString());
const diveInButton = document.querySelector('.hero .cta-button');
if (diveInButton) {
    console.log("Button found!");
    diveInButton.addEventListener('click', () => {
        console.log("Dive In clicked!");
        alert("Button works!");
    });
} else {
    console.log("Button NOT found!");
}