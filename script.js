console.log("script.js loaded at: " + new Date().toLocaleTimeString());

document.addEventListener('DOMContentLoaded', () => {
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

    function triggerFireworks(element) {
        console.log("Triggering fireworks for element:", element);
        const emojisToShow = getRandomEmojis(10, 2);
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 10; i++) {
            const package = document.createElement('div');
            package.innerHTML = emojisToShow[i];
            package.classList.add('firework-package');
            package.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`;
            package.style.top = `${rect.top + rect.height / 2 + window.scrollY}px`;
            document.body.appendChild(package);
            const angle = Math.random() * Math.PI * 2;
            const distance = 200 + Math.random() * 200;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            package.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: 'translate(0, 0) scale(1.5)', opacity: 1, offset: 0.15 },
                { transform: `translate(${x}px, ${y}px) scale(0.75)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out',
                fill: 'forwards'
            });
            setTimeout(() => package.remove(), 1000);
        }
    }

    function playSounds() {
        const silentSound = document.getElementById('silent');
        const bangSound = document.getElementById('bang');

        if (silentSound && bangSound) {
            silentSound.currentTime = 0;
            silentSound.muted = true;
            silentSound.play().then(() => {
                bangSound.currentTime = 0;
                bangSound.muted = false;
                bangSound.play().catch(error => console.error("Bang sound error:", error));
            }).catch(error => console.error("Silent sound error:", error));
        } else {
            console.warn("Sound elements missing!");
        }
    }

    const diveInButton = document.querySelector('.hero .cta-button');
    if (diveInButton) {
        diveInButton.addEventListener('click', (e) => {
            e.preventDefault();
            playSounds();
        });
    }
});
