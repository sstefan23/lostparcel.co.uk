console.log("script.js loaded at: " + new Date().toLocaleTimeString());
const diveInButton = document.querySelector('.hero .cta-button');
if (diveInButton) {
    console.log("Button found!");
    diveInButton.addEventListener('click', () => {
        console.log("Dive In clicked!");
        alert("Button works!");
    });
    // Test clickability
    console.log("Is button clickable? " + (diveInButton.style.pointerEvents !== 'none'));
    diveInButton.addEventListener('mousedown', () => console.log("Mouse down on button"));
    diveInButton.addEventListener('touchstart', () => console.log("Touch start on button"));
} else {
    console.log("Button NOT found!");
}