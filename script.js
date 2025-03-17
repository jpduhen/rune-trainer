let currentScore = 0;
let highScore = localStorage.getItem('runeHighScore') || 0;
let currentRune = null;
let nameAnswered = false;
let meaningAnswered = false;
let remainingRunes = [];
let correctNames = 0;
let correctMeanings = 0;
let startTime = null;
let elapsedTime = 0;
let timerInterval = null;
let bestTime = localStorage.getItem('runeBestTime') || null;

// Thematische kleuren voor runen
const runeThemes = {
    "FEHU": {
        primary: '#DAA520',  // Goud voor rijkdom
        secondary: '#8B4513',  // Bruin voor vee
        pattern: 'repeating-linear-gradient(45deg, rgba(218, 165, 32, 0.1)  0%, transparent 50%)',
        background: 'assets/backgrounds/01-fehu.webp'
    },
    "URUZ": {
        primary: '#2F4F4F',
        secondary: '#8B4513',
        pattern: 'radial-gradient(circle at 50% 50%, rgba(47, 79, 79, 0.2) 0%, transparent 50%)',
        background: 'assets/backgrounds/02-uruz.webp'
    },
    "THURISAZ": {
        primary: '#4B0082',
        secondary: '#FFD700',
        pattern: 'linear-gradient(45deg, rgba(75, 0, 130, 0.2)  0%, transparent 50%)',
        background: 'assets/backgrounds/03-thurisaz.webp'
    },
    "ANSUZ": {
        primary: '#191970',
        secondary: '#C0C0C0',
        pattern: 'radial-gradient(circle at 30% 50%, rgba(192, 192, 192, 0.1) 0%, transparent 50%)',
        background: 'assets/backgrounds/04-ansuz.webp'
    },
    "RAIDHO": {
        primary: '#556B2F',
        secondary: '#8B4513',
        pattern: 'repeating-linear-gradient(-45deg, rgba(85, 107, 47, 0.1) 0%, transparent 50%)',
        background: 'assets/backgrounds/05-raidho.webp'
    },
    "KENNAZ": {
        primary: '#8B0000',
        secondary: '#FFA500',
        pattern: 'radial-gradient(circle at 50% 50%, rgba(255, 165, 0, 0.2) 0%, transparent 50%)',
        background: 'assets/backgrounds/06-kennaz.webp'
    },
    "GEBO": {
        primary: '#4682B4',
        secondary: '#DAA520',
        pattern: 'linear-gradient(0deg, rgba(70, 130, 180, 0.1) 0%, transparent 50%)',
        background: 'assets/backgrounds/07-gebo.webp'
    },
    "WUNJO": {
        primary: '#FFD700',
        secondary: '#9370DB',
        pattern: 'radial-gradient(circle at 70% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
        background: 'assets/backgrounds/08-wunjo.webp'
    },
    "HAGALAZ": {
        primary: '#708090',
        secondary: '#F0F8FF',
        pattern: 'radial-gradient(circle at 30% 30%, rgba(240, 248, 255, 0.1) 0%, transparent 50%)',
        background: 'assets/backgrounds/09-hagalaz.webp'
    },
    "NAUTHIZ": {
        primary: '#2F4F4F',
        secondary: '#8B0000',
        pattern: 'repeating-linear-gradient(90deg, rgba(139, 0, 0, 0.1)  0%, transparent 50%)',
        background: 'assets/backgrounds/10-nauthiz.webp'
    },
    "ISA": {
        primary: '#87CEEB',
        secondary: '#F0F8FF',
        pattern: 'radial-gradient(circle at 50% 50%, rgba(240, 248, 255, 0.2) 0%, transparent 50%)',
        background: 'assets/backgrounds/11-isa.webp'
    },
    "JERA": {
        primary: '#8B4513',
        secondary: '#DAA520',
        pattern: 'repeating-linear-gradient(45deg, rgba(139, 69, 19, 0.1) 0%, transparent 50%)',
        background: 'assets/backgrounds/12-jera.webp'
    },
    "EIHWAZ": {
        primary: '#2F4F4F',
        secondary: '#006400',
        pattern: 'radial-gradient(circle at 50% 50%, rgba(0, 100, 0, 0.2) 0%, transparent 50%)',
        background: 'assets/backgrounds/13-eihwaz.webp'
    },
    "PERTHRO": {
        primary: '#4B0082',
        secondary: '#800080',
        pattern: 'linear-gradient(45deg, rgba(75, 0, 130, 0.2) 0%, transparent 50%)',
        background: 'assets/backgrounds/14-perthro.webp'
    },
    "ALGIZ": {
        primary: '#4682B4',
        secondary: '#F0F8FF',
        pattern: 'radial-gradient(circle at 50% 50%, rgba(70, 130, 180, 0.2) 0%, transparent 50%)',
        background: 'assets/backgrounds/15-algiz.webp'
    },
    "SOWILO": {
        primary: '#FFD700',
        secondary: '#FFA500',
        pattern: 'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.2) 0%, transparent 50%)',
        background: 'assets/backgrounds/16-sowilo.webp'
    },
    "TIWAZ": {
        primary: '#8B0000',
        secondary: '#4B0082',
        pattern: 'linear-gradient(45deg, rgba(139, 0, 0, 0.2) 0%, transparent 50%)',
        background: 'assets/backgrounds/17-tiwaz.webp'
    },
    "BERKANA": {
        primary: '#228B22',
        secondary: '#006400',
        pattern: 'radial-gradient(circle at 50% 50%, rgba(34, 139, 34, 0.2) 0%, transparent 50%)',
        background: 'assets/backgrounds/18-berkana.webp'
    },
    "EHWAZ": {
        primary: '#8B4513',
        secondary: '#A0522D',
        pattern: 'repeating-linear-gradient(-45deg, rgba(139, 69, 19, 0.1) 0%, transparent 50%)',
        background: 'assets/backgrounds/19-ehwaz.webp'
    },
    "MANNAZ": {
        primary: '#4682B4',
        secondary: '#191970',
        pattern: 'radial-gradient(circle at 50% 50%, rgba(70, 130, 180, 0.2) 0%, transparent 50%)',
        background: 'assets/backgrounds/20-mannaz.webp'
    },
    "LAGUZ": {
        primary: '#00008B',
        secondary: '#4682B4',
        pattern: 'radial-gradient(circle at 50% 50%, rgba(0, 0, 139, 0.2) 0%, transparent 50%)',
        background: 'assets/backgrounds/21-laguz.webp'
    },
    "INGUZ": {
        primary: '#228B22',
        secondary: '#8B4513',
        pattern: 'radial-gradient(circle at 50% 50%, rgba(34, 139, 34, 0.2) 0%, transparent 50%)',
        background: 'assets/backgrounds/22-inguz.webp'
    },
    "OTHALA": {
        primary: '#8B4513',
        secondary: '#DAA520',
        pattern: 'repeating-linear-gradient(45deg, rgba(139, 69, 19, 0.1) 0%, transparent 50%)',
        background: 'assets/backgrounds/23-othala.webp'
    },
    "DAGAZ": {
        primary: '#FFD700',
        secondary: '#4682B4',
        pattern: 'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.2) 0%, transparent 50%)',
        background: 'assets/backgrounds/24-dagaz.webp'
    }
};

// Functie om de achtergrond te updaten
function updateBackground(runeName) {
    const runeNumber = {
        'FEHU': '01',
        'URUZ': '02',
        'THURISAZ': '03',
        'ANSUZ': '04',
        'RAIDHO': '05',
        'KENNAZ': '06',
        'GEBO': '07',
        'WUNJO': '08',
        'HAGALAZ': '09',
        'NAUDHIZ': '10',
        'ISA': '11',
        'JERA': '12',
        'EIHWAZ': '13',
        'PERTHRO': '14',
        'ALGIZ': '15',
        'SOWILO': '16',
        'TIWAZ': '17',
        'BERKANA': '18',
        'EHWAZ': '19',
        'MANNAZ': '20',
        'LAGUZ': '21',
        'INGUZ': '22',
        'OTHALA': '23',
        'DAGAZ': '24'
    };

    const number = runeNumber[runeName.toUpperCase()];
    if (number) {
        // Verwijder bestaande overlay als die er is
        let overlay = document.querySelector('.background-overlay');
        if (overlay) {
            overlay.remove();
        }

        // Maak nieuwe overlay
        overlay = document.createElement('div');
        overlay.className = 'background-overlay';
        document.body.appendChild(overlay);

        // Stel de achtergrond in
        const backgroundPath = `assets/backgrounds/${number}-${runeName.toLowerCase()}.webp`;
        overlay.style.backgroundImage = `url('${backgroundPath}')`;
    }
}

function updateRuneImage(runeName) {
    const runeImage = document.getElementById('runeImage');
    if (runeImage) {
        const runeNumber = {
            'FEHU': '01',
            'URUZ': '02',
            'THURISAZ': '03',
            'ANSUZ': '04',
            'RAIDHO': '05',
            'KENNAZ': '06',
            'GEBO': '07',
            'WUNJO': '08',
            'HAGALAZ': '09',
            'NAUDHIZ': '10',
            'ISA': '11',
            'JERA': '12',
            'EIHWAZ': '13',
            'PERTHRO': '14',
            'ALGIZ': '15',
            'SOWILO': '16',
            'TIWAZ': '17',
            'BERKANA': '18',
            'EHWAZ': '19',
            'MANNAZ': '20',
            'LAGUZ': '21',
            'INGUZ': '22',
            'OTHALA': '23',
            'DAGAZ': '24'
        };

        const number = runeNumber[runeName.toUpperCase()];
        if (number) {
            const imagePath = `assets/images/${number}-${runeName.toLowerCase() === 'kenaz' ? 'kennaz' : runeName.toLowerCase()}.png`;
            runeImage.src = imagePath;
            runeImage.alt = `Rune ${runeName}`;
        }
    }
}

// Functie om een array te shuffelen
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Functie om de timer te updaten
function updateTimer() {
    if (!startTime) return;
    
    const elapsedSeconds = Math.floor((new Date() - startTime) / 1000);
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    document.getElementById('timer').textContent = 
        `Tijd: ${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Functie om het spel te starten
function startGame() {
    // Reset spelstatus
    remainingRunes = shuffleArray([...RUNES]);
    correctNames = correctMeanings = currentScore = 0;
    startTime = new Date();
    
    // Reset en start timer
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
    
    loadNextRune();
}

// Functie om opties te genereren
function generateOptions(correctAnswer, type) {
    // Filter eerst alle beschikbare opties
    const availableOptions = RUNES
        .filter(rune => rune[type] !== correctAnswer)
        .map(rune => rune[type]);
    
    // Neem 3 willekeurige opties
    const randomOptions = shuffleArray([...availableOptions]).slice(0, 3);
    
    // Voeg het juiste antwoord toe en shuffle alles
    const options = shuffleArray([correctAnswer, ...randomOptions]);
    
    // Als het een betekenis is, split dan de woorden en shuffle ze
    if (type === 'meaning') {
        return options.map(option => {
            const words = option.split(',').map(word => word.trim());
            return shuffleArray(words).join(', ');
        });
    }
    
    return options;
}

// Functie om de eindscore te tonen
function showFinalScore() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    elapsedTime = Math.floor((new Date() - startTime) / 1000);
    const totalScore = correctNames + correctMeanings;
    const percentage = Math.round((totalScore / (RUNES.length * 2)) * 100);
    
    // Update beste tijd
    if (totalScore === RUNES.length * 2 && (!bestTime || elapsedTime < parseInt(bestTime))) {
        bestTime = elapsedTime.toString();
        localStorage.setItem('runeBestTime', bestTime);
    }
    
    // Update beste score
    if (totalScore > highScore) {
        highScore = totalScore;
        localStorage.setItem('runeHighScore', highScore);
    }
    
    // Format tijd
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };
    
    // Toon eindscore
    const gameContainer = document.querySelector('.game-container');
    gameContainer.innerHTML = `
        <h2>Spel Afgelopen!</h2>
        <div class="final-score">
            <p>Tijd: ${formatTime(elapsedTime)}</p>
            <p>Correcte Namen: ${correctNames} van de ${RUNES.length}</p>
            <p>Correcte Betekenissen: ${correctMeanings} van de ${RUNES.length}</p>
            <p>Totaal Score: ${percentage}%</p>
            ${bestTime ? `<p>Beste Tijd: ${formatTime(bestTime)}</p>` : ''}
        </div>
        <button id="restart-button" class="option-button">Opnieuw Spelen</button>
    `;

    document.getElementById('restart-button').addEventListener('click', () => location.reload());
}

// Functie om een nieuwe rune te laden
function loadNextRune() {
    if (remainingRunes.length === 0) {
        showFinalScore();
        return;
    }

    currentRune = remainingRunes.pop();
    nameAnswered = false;
    meaningAnswered = false;
    
    // Update de rune afbeelding
    const runeImage = document.getElementById('runeImage');
    if (runeImage) {
        const runeNumber = {
            'FEHU': '01', 'URUZ': '02', 'THURISAZ': '03', 'ANSUZ': '04',
            'RAIDHO': '05', 'KENNAZ': '06', 'GEBO': '07', 'WUNJO': '08',
            'HAGALAZ': '09', 'NAUDHIZ': '10', 'ISA': '11', 'JERA': '12',
            'EIHWAZ': '13', 'PERTHRO': '14', 'ALGIZ': '15', 'SOWILO': '16',
            'TIWAZ': '17', 'BERKANA': '18', 'EHWAZ': '19', 'MANNAZ': '20',
            'LAGUZ': '21', 'INGUZ': '22', 'OTHALA': '23', 'DAGAZ': '24'
        };
        
        const number = runeNumber[currentRune.name.toUpperCase()];
        if (number) {
            const imagePath = `assets/images/${number}-${currentRune.name.toLowerCase() === 'kenaz' ? 'kennaz' : currentRune.name.toLowerCase() === 'dagaz' ? 'dagaz' : currentRune.name.toLowerCase()}.png`;
            
            const newImage = new Image();
            newImage.onload = () => {
                runeImage.src = imagePath;
                runeImage.classList.remove('error');
                updateBackground(currentRune.name.toUpperCase());
            };
            
            newImage.onerror = () => {
                runeImage.alt = `Kon rune ${currentRune.name} niet laden`;
                runeImage.classList.add('error');
            };
            
            newImage.src = imagePath;
        }
    }
    
    // Genereer en toon de opties
    ['name', 'meaning'].forEach(type => {
        const container = document.getElementById(`${type}-options`);
        if (container) {
            const options = generateOptions(currentRune[type], type);
            container.innerHTML = options.map(option => `
                <button class="option-button" onclick="checkAnswer('${option}', '${type}')">
                    ${option}
                </button>
            `).join('');
        }
    });
    
    // Update voortgang
    const currentScoreElement = document.getElementById('current-score');
    if (currentScoreElement) {
        currentScoreElement.textContent = `${correctNames + correctMeanings}/${RUNES.length * 2}`;
    }
    
    // Verberg de "Volgende" knop
    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.classList.add('hidden');
    }
}

// Functie om antwoorden te controleren
function checkAnswer(selectedAnswer, type) {
    if ((type === 'name' && nameAnswered) || (type === 'meaning' && meaningAnswered)) {
        return;
    }
    
    const correctAnswer = currentRune[type];
    const buttons = document.querySelectorAll(`#${type}-options .option-button`);
    const correctSound = document.getElementById('correct-sound');
    const incorrectSound = document.getElementById('incorrect-sound');
    const nextButton = document.getElementById('nextButton');
    
    // Functie om woorden te vergelijken ongeacht volgorde
    const compareAnswers = (answer1, answer2) => {
        if (type === 'meaning') {
            const words1 = answer1.split(',').map(word => word.trim());
            const words2 = answer2.split(',').map(word => word.trim());
            return words1.length === words2.length && 
                   words1.sort().join(',') === words2.sort().join(',');
        }
        return answer1 === answer2;
    };
    
    const isCorrect = compareAnswers(selectedAnswer, correctAnswer);
    
    // Update UI en speel geluid
    buttons.forEach(button => {
        const buttonText = button.textContent.trim();
        if (compareAnswers(buttonText, correctAnswer)) {
            button.classList.add('correct');
        } else if (buttonText === selectedAnswer) {
            button.classList.add('incorrect');
        }
    });
    
    // Update score en speel geluid
    if (isCorrect) {
        type === 'name' ? correctNames++ : correctMeanings++;
        correctSound.currentTime = 0;
        correctSound.play();
        document.getElementById('current-score').textContent = 
            `${correctNames + correctMeanings}/${RUNES.length * 2}`;
    } else {
        incorrectSound.currentTime = 0;
        incorrectSound.play();
    }
    
    // Update antwoord status
    type === 'name' ? nameAnswered = true : meaningAnswered = true;
    
    // Toon volgende knop als beide vragen zijn beantwoord
    if (nameAnswered && meaningAnswered) {
        nextButton.classList.remove('hidden');
        nextButton.disabled = false;
    }
}

// Verwijder de oude styleSheet toevoeging en vervang met nieuwe stijl
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    :root {
        --background-color: #1a1a1a;
        --text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        --border-radius: 8px;
        --transition: all 0.5s ease;
    }

    body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        background-color: var(--background-color);
        transition: var(--transition);
        position: relative;
        overflow-x: hidden;
    }

    body::before {
        content: '';
        position: fixed;
        inset: 0;
        background: var(--norse-border);
        opacity: 0.1;
        z-index: -3;
        pointer-events: none;
    }

    .background-overlay {
        content: '';
        position: fixed;
        inset: 0;
        background: 
            var(--rune-pattern),
            linear-gradient(45deg, var(--rune-primary) 0%, var(--rune-secondary) 100%);
        opacity: 0.2;
        z-index: -1;
        pointer-events: none;
        transition: var(--transition);
    }

    .game-container {
        position: relative;
        z-index: 1;
    }

    .score-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(0, 0, 0, 0.4);
        padding: 1rem;
        border-radius: var(--border-radius);
        margin-bottom: 2rem;
        border: 1px solid var(--accent-color);
    }

    .score-item {
        text-align: center;
        flex: 1;
        color: var(--accent-color);
        text-shadow: var(--text-shadow);
        font-family: 'Cinzel', serif;
    }

    .score-label {
        font-size: 0.8rem;
        opacity: 0.8;
        margin-bottom: 0.2rem;
    }

    .score-value {
        font-size: 1.2rem;
        font-weight: bold;
    }

    #timer {
        font-size: 1.2rem;
        font-weight: bold;
    }

    .option-button {
        background: rgba(0, 0, 0, 0.6);
        border: 1px solid var(--accent-color);
        color: var(--accent-color);
        padding: 0.5rem 1rem;
        margin: 0.5rem;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: var(--transition);
        font-family: 'Cinzel', serif;
    }

    .option-button:hover:not(.correct):not(.incorrect) {
        background: rgba(0, 0, 0, 0.8);
        transform: translateY(-2px);
    }

    .option-button:disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }

    .option-button.correct {
        background-color: rgba(0, 255, 0, 0.2) !important;
        border-color: #00ff00 !important;
        color: #00ff00 !important;
        pointer-events: none;
        transform: none !important;
    }

    .option-button.incorrect {
        background-color: rgba(255, 0, 0, 0.2) !important;
        border-color: #ff0000 !important;
        color: #ff0000 !important;
        pointer-events: none;
        transform: none !important;
    }
`;

document.head.appendChild(styleSheet);

// Verplaats alle initialisatie code naar binnen de DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    // Helper functies
    const formatTime = (seconds) => {
        if (!seconds) return '-';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Update bestaande score elementen
    document.getElementById('current-score').textContent = `0/${RUNES.length * 2}`;
    document.getElementById('high-score').textContent = highScore;
    document.getElementById('best-time').textContent = formatTime(bestTime);

    // Voeg event listener toe voor de "Volgende" knop
    document.getElementById('nextButton').addEventListener('click', loadNextRune);

    // Initialiseer en start het spel
    updateBackground("FEHU");
    startGame();

    // Update sound paths
    const correctSound = new Audio('assets/sounds/correct.mp3');
    const incorrectSound = new Audio('assets/sounds/incorrect.mp3');
}); 
