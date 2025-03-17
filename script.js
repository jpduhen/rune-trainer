const runeThemes = {
    "FEHU": { background: '../assets/images/backgrounds/01-fehu.webp' },
    "URUZ": { background: '../assets/images/backgrounds/02-uruz.webp' },
    "THURISAZ": { background: '../assets/images/backgrounds/03-thurisaz.webp' },
    "ANSUZ": { background: '../assets/images/backgrounds/04-ansuz.webp' },
    "RAIDO": { background: '../assets/images/backgrounds/05-raidho.webp' },
    "KENNAZ": { background: '../assets/images/backgrounds/06-kennaz.webp' },
    "GEBO": { background: '../assets/images/backgrounds/07-gebo.webp' },
    "WUNJO": { background: '../assets/images/backgrounds/08-wunjo.webp' },
    "HAGALAZ": { background: '../assets/images/backgrounds/09-hagalaz.webp' },
    "NAUTHIZ": { background: '../assets/images/backgrounds/10-nauthiz.webp' },
    "ISA": { background: '../assets/images/backgrounds/11-isa.webp' },
    "JERA": { background: '../assets/images/backgrounds/12-jera.webp' },
    "EIHWAZ": { background: '../assets/images/backgrounds/13-eihwaz.webp' },
    "PERTHRO": { background: '../assets/images/backgrounds/14-perthro.webp' },
    "ALGIZ": { background: '../assets/images/backgrounds/15-algiz.webp' },
    "SOWILO": { background: '../assets/images/backgrounds/16-sowilo.webp' },
    "TIWAZ": { background: '../assets/images/backgrounds/17-tiwaz.webp' },
    "BERKANA": { background: '../assets/images/backgrounds/18-berkana.webp' },
    "EHWAZ": { background: '../assets/images/backgrounds/19-ehwaz.webp' },
    "MANNAZ": { background: '../assets/images/backgrounds/20-mannaz.webp' }
};

let currentRune = null;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

document.getElementById('high-score').textContent = highScore;

function updateBackground(runeName) {
    const runeDisplay = document.querySelector('.rune-display');
    
    // Verwijder bestaande achtergrond elementen
    const existingBackground = runeDisplay.querySelector('.background-image');
    const existingOverlay = runeDisplay.querySelector('.background-overlay');
    if (existingBackground) existingBackground.remove();
    if (existingOverlay) existingOverlay.remove();
    
    // Maak nieuwe achtergrond elementen
    const backgroundDiv = document.createElement('div');
    backgroundDiv.className = 'background-image';
    const overlayDiv = document.createElement('div');
    overlayDiv.className = 'background-overlay';
    
    // Voeg de elementen toe aan de DOM
    runeDisplay.insertBefore(overlayDiv, runeDisplay.firstChild);
    runeDisplay.insertBefore(backgroundDiv, runeDisplay.firstChild);
    
    // Stel de achtergrondafbeelding in
    if (runeThemes[runeName] && runeThemes[runeName].background) {
        console.log('Achtergrondpad:', runeThemes[runeName].background);
        backgroundDiv.style.backgroundImage = `url('${runeThemes[runeName].background}')`;
        
        // Test of de afbeelding geladen kan worden
        const img = new Image();
        img.onload = () => console.log('Achtergrond succesvol geladen');
        img.onerror = () => console.error('Fout bij laden achtergrond:', runeThemes[runeName].background);
        img.src = runeThemes[runeName].background;
    }
}

// Rest van de bestaande code hier...
