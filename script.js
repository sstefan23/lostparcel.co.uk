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
        console.log("Element position - left:", rect.left, "top:", rect.top, "width:", rect.width, "height:", rect.height);
        for (let i = 0; i < 10; i++) {
            const package = document.createElement('div');
            package.innerHTML = emojisToShow[i];
            package.classList.add('firework-package');
            package.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`;
            package.style.top = `${rect.top + rect.height / 2 + window.scrollY}px`;
            document.body.appendChild(package);
            console.log("Firework " + i + " added at left:", package.style.left, "top:", package.style.top);
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
            setTimeout(() => {
                console.log("Removing firework " + i);
                package.remove();
            }, 1000);
        }
    }

    const diveInButton = document.querySelector('.hero .cta-button');
    if (diveInButton) {
        console.log("Button found!");
        diveInButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const debugDiv = document.createElement('div');
            debugDiv.style.cssText = 'position: fixed; top: 10px; left: 10px; background: red; color: white; padding: 10px; z-index: 9999;';
            document.body.appendChild(debugDiv);
            debugDiv.textContent = "Dive In tapped";

            const silentSound = document.getElementById('silent');
            const bangSound = document.getElementById('bang');

            if (silentSound && bangSound) {
                debugDiv.textContent += " | Sounds found";
                silentSound.currentTime = 0;
                silentSound.muted = true;
                silentSound.play()
                    .then(() => {
                        debugDiv.textContent += " | Silent played";
                        bangSound.currentTime = 0;
                        bangSound.muted = false;
                        bangSound.play()
                            .then(() => debugDiv.textContent += " | Bang played!")
                            .catch(error => debugDiv.textContent += " | Bang error: " + error.message);
                    })
                    .catch(error => debugDiv.textContent += " | Silent error: " + error.message);
                setTimeout(() => debugDiv.remove(), 3000);
            } else {
                debugDiv.textContent += " | Sound missing!";
                setTimeout(() => debugDiv.remove(), 3000);
            }

            const emojisToShow = getRandomEmojis(20, 2);
            for (let i = 0; i < 20; i++) {
                const package = document.createElement('div');
                package.innerHTML = emojisToShow[i];
                package.classList.add('firework-package');
                const rect = diveInButton.getBoundingClientRect();
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
            const introSection = document.getElementById('intro');
            if (introSection) {
                debugDiv.textContent += " | Scrolling...";
                setTimeout(() => {
                    introSection.scrollIntoView({ behavior: 'smooth' });
                }, 1000);
            } else {
                debugDiv.textContent += " | Intro not found";
            }
        });
        diveInButton.addEventListener('click', (e) => {
            e.preventDefault();
            diveInButton.dispatchEvent(new Event('touchstart'));
        });
    } else {
        console.log("Button NOT found! Selector: .hero .cta-button");
    }

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
            const buyButton = item.querySelector('.peek-button');
            if (buyButton) {
                console.log("Buy button found in box-item");
                buyButton.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    console.log("Buy Now tapped - shaking box!");
                    item.classList.add('shake');
                    setTimeout(() => {
                        item.classList.remove('shake');
                        console.log("Shake done - triggering fireworks!");
                        triggerFireworks(item);
                    }, 2000);
                });
                buyButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    buyButton.dispatchEvent(new Event('touchstart'));
                });
            } else {
                console.log("Buy button NOT found in box-item!");
            }
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

    const grabMineButton = document.querySelector('.cta .cta-button');
    if (grabMineButton) {
        console.log("Grab Mine button found!");
        grabMineButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            console.log("Grab Mine tapped - scrolling to products!");
            const productsSection = document.getElementById('products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.log("Products section not found!");
            }
        });
        grabMineButton.addEventListener('click', (e) => {
            e.preventDefault();
            grabMineButton.dispatchEvent(new Event('touchstart'));
        });
    } else {
        console.log("Grab Mine button NOT found! Selector: .cta .cta-button");
    }
});