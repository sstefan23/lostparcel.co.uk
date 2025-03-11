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

    // Dive In button logic
    const diveInButton = document.querySelector('.hero .cta-button');
    if (diveInButton) {
        console.log("Button found!");
        diveInButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            console.log("Dive In tapped - starting fireworks!");
            const bangSound = document.getElementById('bang');
            if (bangSound) {
                console.log("Playing bang sound");
                bangSound.currentTime = 0;
                bangSound.play().catch(error => console.log("Audio error:", error));
            } else {
                console.log("Bang sound not found!");
            }
            const emojisToShow = getRandomEmojis(10, 2);
            for (let i = 0; i < 10; i++) {
                const package = document.createElement('div');
                package.innerHTML = emojisToShow[i];
                package.classList.add('firework-package');
                const rect = diveInButton.getBoundingClientRect();
                package.style.left = `${rect.left + rect.width / 2}px`;
                package.style.top = `${rect.top + rect.height / 2}px`;
                document.body.appendChild(package);
                const angle = Math.random() * Math.PI * 2;
                const distance = 50 + Math.random() * 50;
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
            const introSection = document.getElementById('intro');
            if (introSection) {
                console.log("Scrolling to intro section");
                setTimeout(() => {
                    introSection.scrollIntoView({ behavior: 'smooth' });
                }, 1000);
            } else {
                console.log("Intro section not found!");
            }
        });
        // Add click fallback for desktop
        diveInButton.addEventListener('click', (e) => {
            e.preventDefault();
            diveInButton.dispatchEvent(new Event('touchstart')); // Trigger touchstart logic
        });
    } else {
        console.log("Button NOT found! Selector: .hero .cta-button");
    }

    // Animate cards when they come into view
    const boxItems = document.querySelectorAll('.box-item');
    console.log("Found " + boxItems.length + " box items");
    if (boxItems.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    item.style.setProperty('--index', Array.from(boxItems).indexOf(item));
                    item.classList.add('flip-in');
                    console.log(`Box-item ${item.style.getPropertyValue('--index')} flipped in`);
                    observer.unobserve(item);
                }
            });
        }, {
            threshold: 0.3
        });

        boxItems.forEach(item => {
            observer.observe(item);
        });
    } else {
        console.log("No box items found!");
    }

    const boxIcons = document.querySelectorAll('.box-icon');
    console.log("Found " + boxIcons.length + " box icons");
    boxIcons.forEach((icon, index) => {
        console.log(`Setting up box-icon ${index} (class: ${icon.className})`);
        icon.addEventListener('touchstart', (e) => {
            e.preventDefault();
            console.log(`Tapped box-icon ${index}`);
            icon.classList.add('glowing');
            setTimeout(() => {
                icon.classList.remove('glowing');
                console.log(`Glow removed from box-icon ${index}`);
            }, 2000);
        });
    });
});