console.log("script.js loaded at: " + new Date().toLocaleTimeString());
const diveInButton = document.querySelector('.hero .cta-button');
if (diveInButton) {
    console.log("Button found!");
    diveInButton.addEventListener('click', (e) => {
        console.log("Dive In clicked!");
        alert("Button works!");
    });
    console.log("Is button clickable? " + (diveInButton.style.pointerEvents !== 'none'));
    diveInButton.addEventListener('mousedown', () => console.log("Mouse down on button"));
    diveInButton.addEventListener('touchstart', () => console.log("Touch start on button"));
    // Force cursor and test
    diveInButton.style.cursor = 'pointer';
    diveInButton.addEventListener('click', (e) => console.log("Click event target: " + e.target.tagName));
} else {
    console.log("Button NOT found!");
}