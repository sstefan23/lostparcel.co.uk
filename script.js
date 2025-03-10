console.log("script.js loaded at: " + new Date().toLocaleTimeString());

// Ensure DOM is fully loaded before running any code
document.addEventListener('DOMContentLoaded', () => {
    // Prize emojis for fireworks
    const prizeEmojis = [
        '📱', '🎮', '👕', '💻', '⌚', '🎧', '📷', '👜', '👟', '🎁',
        '💍', '🛍️', '🎤', '📺', '🎲', '🏀', '🎸', '🖥️', '👗', '🚗'
    ];

    // Function to get random emojis with max repeat limit
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

    // Dive In button functionality (optimized for performance)
    const diveInButton = document.querySelector('.hero .cta-button');
    if (diveInButton) {
        console.log("Button found!");
        diveInButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            console.log("Dive In tapped!");
            const bangSound = document.getElementById('bang');
            if (bangSound) {
                bangSound.currentTime = 0;
                bangSound.play().catch(error => console.log("Audio error:", error));
            }
            const emojisToShow = getRandomEmojis(10, 2); // Reduced to 10 for less lag
            for (let i = 0; i < 10; i++) {
                const package = document.createElement('div');
                package.innerHTML = emojisToShow[i];
                package.classList.add('firework-package');
                const rect = diveInButton.getBoundingClientRect();
                package.style.left = `${rect.left + rect.width / 2}px`;
                package.style.top = `${rect.top + rect.height / 2}px`;
                document.body.appendChild(package);
                const angle = Math.random() * Math.PI * 2;
                const distance = 50 + Math.random() * 50; // Reduced distance
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                package.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: 'translate(0, 0) scale(1.5)', opacity: 1, offset: 0.15 },
                    { transform: `translate(${x}px, ${y}px) scale(0.75)`, opacity: 0 }
                ], {
                    duration: 1000, // Reduced to 1 second
                    easing: 'ease-out',
                    fill: 'forwards'
                });
                setTimeout(() => package.remove(), 1000);
            }
            const introSection = document.getElementById('intro');
            if (introSection) {
                setTimeout(() => {
                    introSection.scrollIntoView({ behavior: 'smooth' });
                }, 1000); // Matches reduced animation duration
            } else {
                console.log("Intro section not found!");
            }
        });
    } else {
        console.log("Button NOT found!");
    }

    // Box items animation on load
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

    // Box icons glowing on tap (mobile-friendly)
    const boxIcons = document.querySelectorAll('.box-icon');
    console.log("Found " + boxIcons.length + " box icons"); // Should log 3
    boxIcons.forEach((icon, index) => {
        console.log(`Setting up box-icon ${index} (class: ${icon.className})`);
        icon.addEventListener('touchstart', (e) => {
            e.preventDefault();
            console.log(`Tapped box-icon ${index}`);
            icon.classList.add('glowing');
            setTimeout(() => {
                icon.classList.remove('glowing');
                console.log(`Glow removed from box-icon ${index}`);
            }, 2000); // 2 seconds for testing
        });
    });
});