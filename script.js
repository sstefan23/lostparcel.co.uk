console.log("script.js loaded at: " + new Date().toLocaleTimeString());
const diveInButton = document.querySelector('.hero .cta-button');

const prizeEmojis = [
    '📱', '🎮', '👕', '💻', '⌚', '🎧', '📷', '👜', '👟', '🎁',
    '💍', '🛍️', '🎤', '📺', '🎲', '🏀', '🎸', '🖥️', '👗', '🚗'
];

function getRandomEmojis(count, maxRepeats) {
    const shuffled = [...prizeEmojis].sort(() => 0.5 - Math.random());
    const result = [];
    const usedCount = {};
    
    for (let i = 0; i < count; i++) {
        let emoji;
        do {
            emoji = shuffled[Math.floor(Math.random() * shuffled.length)];
        } while ((usedCount[emoji کرد یا 0) >= maxRepeats);
        
        usedCount[emoji] = (usedCount[emoji] || 0) + 1;
        result.push(emoji);
    }
    return result;
}

if (diveInButton) {
    console.log("Button found!");
    diveInButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("Dive In clicked!");
        
        // Play bang sound
        const bangSound = document.getElementById('bang');
        if (bangSound) {
            bangSound.currentTime = 0; // Rewind to start
            bangSound.play().catch(error => console.log("Audio play failed:", error));
        }
        
        const emojisToShow = getRandomEmojis(20, 2);
        
        for (let i = 0; i < 20; i++) {
            const package = document.createElement('div');
            package.innerHTML = emojisToShow[i];
            package.classList.add('firework-package');
            const rect = diveInButton.getBoundingClientRect();
            package.style.left = `${rect.left + rect.width / 2}px`;
            package.style.top = `${rect.top + rect.height / 2}px`;
            document.body.appendChild(package);
            const angle = Math.random() * Math.PI * 2;
            const distance = 100 + Math.random() * 100;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            package.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: 'translate(0, 0) scale(1.5)', opacity: 1, offset: 0.15 },
                { transform: `translate(${x}px, ${y}px) scale(0.75)`, opacity: 0 }
            ], {
                duration: 1500,
                easing: 'ease-out',
                fill: 'forwards'
            });
            setTimeout(() => package.remove(), 1500);
        }
        const productsSection = document.getElementById('products');
        if (productsSection) {
            setTimeout(() => {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }, 1500);
        } else {
            console.log("Products section not found!");
        }
    });
} else {
    console.log("Button NOT found!");
}