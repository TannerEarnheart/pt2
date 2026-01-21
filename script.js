// Animated time display
let currentHour = 12;
const timeDisplay = document.getElementById('time');

function updateTime() {
    timeDisplay.textContent = `${currentHour}:00 AM`;
    currentHour++;
    if (currentHour > 6) currentHour = 12;
}

function setTime(hour) {
    currentHour = hour;
    timeDisplay.textContent = `${currentHour}:00 AM`;
}

const timeInterval = setInterval(updateTime, 3000);

// Camera label update
const cameraLabel = document.querySelector('.camera-label');

function updateCamera(label) {
    cameraLabel.textContent = label;
}

// Door interaction
const door = document.getElementById('door');
const doorScreen = document.getElementById('doorScreen');
const pizzeriaInterior = document.getElementById('pizzeriaInterior');
const questionScreen = document.getElementById('questionScreen');
const continueBtn = document.getElementById('continueBtn');

door.addEventListener('click', () => {
    // Play creaky door sound effect doesnt work idk how to fix :(
    door.style.transform = 'rotateY(-90deg)';
    door.style.opacity = '0';
    
    setTimeout(() => {
        doorScreen.style.display = 'none';
        pizzeriaInterior.classList.add('active');
        updateCamera('CAM 02 - MAIN HALL');
    }, 800);
});

// Continue to party area!!!!
continueBtn.addEventListener('click', () => {
    pizzeriaInterior.style.display = 'none';
    document.getElementById('partyArea').classList.add('active');
    updateCamera('CAM 03 - PRIZE CORNER');
});

// Gift box from the goat
const giftBox = document.getElementById('giftBox');
const partyArea = document.getElementById('partyArea');

giftBox.addEventListener('click', () => {
    giftBox.classList.add('opening');
    
    setTimeout(() => {
        partyArea.style.display = 'none';
        questionScreen.classList.add('active');
        updateCamera('CAM 04 - OFFICE');
        setTime(6);
    }, 800);
});

// Gift popups for herrrrrrrrrrrrrrrrr
document.querySelectorAll('.mini-gift').forEach(item => {
    item.addEventListener('click', () => {
        const messageNum = item.getAttribute('data-message');
        document.getElementById('popup' + messageNum).classList.add('show');
    });
});

function closePopup(num) {
    document.getElementById('popup' + num).classList.remove('show');
}

// Button interactions
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');

// Yes button - show celebration
yesBtn.addEventListener('click', () => {
    questionScreen.style.display = 'none';
    celebration.classList.add('show');
    updateCamera('CAM 05 - CELEBRATION');
    clearInterval(timeInterval);
    setTime(6);
    
    // Play celebration sound
    const celebrationSound = document.getElementById('celebrationSound');
    if (celebrationSound) {
        try {
            celebrationSound.pause();
            celebrationSound.currentTime = 0;
            const p = celebrationSound.play();
            if (p && typeof p.catch === 'function') {
                p.catch(() => { /* ignore play interruption */ });
            }
        } catch (e) {
            // ignore
        }
    }
    
    // Change background to party mode
    document.body.style.background = 'linear-gradient(135deg, #ff0080 0%, #ffaa00 50%, #00ff00 100%)';
});

// No button - it runs away :)
let noBtnClickCount = 0;
const noButtonTexts = [
    "NO... 😰",
    "Are you sure? 😱",
    "Freddy's watching... 👀",
    "Don't make him angry! 🐻",
    "Last chance! ⚠️"
];

noBtn.addEventListener('mouseenter', () => {
    const office = document.querySelector('.office-bg');
    const container = office.getBoundingClientRect();
    
    // supposed to be shadows but idk where it ran off to
    const shadow = document.getElementById('shadow');
    shadow.style.opacity = '0.7';
    setTimeout(() => {
        shadow.style.opacity = '0.3';
    }, 500);
    
    // Move button away
    const maxX = 200;
    const maxY = 100;
    
    const newX = (Math.random() - 0.5) * maxX;
    const newY = (Math.random() - 0.5) * maxY;
    
    noBtn.style.transform = `translate(${newX}px, ${newY}px)`;
    
    // Change button text
    noBtnClickCount++;
    if (noBtnClickCount < noButtonTexts.length) {
        noBtn.textContent = noButtonTexts[noBtnClickCount];
    }
    
    // Make yes button bigger each time you hover no
    const currentScale = 1 + (noBtnClickCount * 0.15);
    yesBtn.style.transform = `translateX(-120%) scale(${currentScale})`;
    
    // Flash the screen red briefly AUR AUR AUR
    document.body.style.transition = 'background 0.1s';
    document.body.style.background = '#ff0000';
    setTimeout(() => {
        document.body.style.background = '#1a1a1a';
    }, 100);
});

// If she managed to click no
noBtn.addEventListener('click', () => {
    alert("⚠️ SYSTEM ERROR: This option is currently out of order. Please try the other button!");
});

// Static effect on camera display
setInterval(() => {
    const camera = document.querySelector('.security-camera');
    camera.style.opacity = Math.random() > 0.95 ? '0.5' : '1';
}, 100);
