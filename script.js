// Scroll to products section
function scrollToProducts() {
    console.log("Dive In clicked!");
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Peek button placeholder
document.querySelectorAll('.peek-button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Sneak peek coming soon—imagine the wild stuff inside!');
    });
});