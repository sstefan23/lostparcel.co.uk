console.log("script.js loaded at: " + new Date().toLocaleTimeString());

const peekButtons = document.querySelectorAll('.peek-button');
peekButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Sneak peek coming soon—imagine the wild stuff inside!');
    });
});