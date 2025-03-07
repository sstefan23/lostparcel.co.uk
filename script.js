console.log("script.js loaded at: " + new Date().toLocaleTimeString());
const diveInButton = document.querySelector('.hero .cta-button');
if (diveInButton) {
    console.log("Button found!");
    diveInButton.addEventListener('click', (e) => {
        console.log("Dive In clicked!");
        alert("Button works!");
    }, { passive: true });
    diveInButton.addEventListener('mousedown', () => console.log("Mouse down"));
    diveInButton.addEventListener('touchstart', () => console.log("Touch start"), { passive: true });
    diveInButton.addEventListener('pointerdown', () => console.log("Pointer down"));
    diveInButton.style.cursor = 'pointer';
} else {
    console.log("Button NOT found!");
}