console.log("script.js loaded at: " + new Date().toLocaleTimeString());

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
        } while ((usedCount[emoji] || 0) >= maxRepeats);
        usedCount[emoji] = (usedCount[emoji] || 0) + 1;
        result.push(emoji);
    }
    return result;
}

const diveInButton = document.querySelector('.hero .cta-button');
if (diveInButton) {
    console.log("Button found!");
    diveInButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("Dive In clicked!");
        const bangSound = document.getElementById('bang');
        if (bangSound) {
            bangSound.currentTime = 0;
            bangSound.play().catch(error => console.log("Audio error:", error));
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
        const introSection = document.getElementById('intro');
        if (introSection) {
            setTimeout(() => {
                introSection.scrollIntoView({ behavior: 'smooth' });
            }, 1500);
        } else {
            console.log("Intro section not found!");
        }
    });
} else {
    console.log("Button NOT found!");
}

const boxItems = document.querySelectorAll('.box-item');
console.log("Found " + boxItems.length + " box items");
if (boxItems.length > 0) {
    boxItems.forEach((item, index) => {
        console.log(`Animating box-item ${index}`);
        item.style.animation = `slideIn 0.5s ease-out ${index * 0.2}s forwards`;
    });
} else {
    console.log("No box items found!");
}

// Simplified glowing logic with touch support
const boxIcons = document.querySelectorAll('.box-icon');
console.log("Found " + boxIcons.length + " box icons"); // Should log 3
boxIcons.forEach((icon, index) => {
    console.log(`Setting up box-icon ${index} (class: ${icon.className})`);
    // Add both click and touchstart for mobile compatibility
    ['click', 'touchstart'].forEach(eventType => {
        icon.addEventListener(eventType, (e) => {
            e.preventDefault(); // Prevent default touch behavior
            e.stopPropagation(); // Stop bubbling
            console.log(`Box-icon ${index} triggered by ${eventType} - glowing`);
            icon.classList.add('glowing');
            setTimeout(() => {
                console.log(`Box-icon ${index} glow timeout - removing`);
                icon.classList.remove('glowing');
            }, 2000); // 2 seconds for testing
        });
    });
});