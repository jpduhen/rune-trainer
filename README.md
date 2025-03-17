# Rune Trainer

Een interactieve web-applicatie om de Oudnoorse runen te leren. Deze trainer helpt je bij het onthouden van de namen en betekenissen van de 24 runen uit het Oudnoorse runenalfabet (Elder Futhark).

## Features

- Interactieve quiz met visuele feedback
- Tijdsregistratie en highscore systeem
- Thematische achtergronden voor elke rune
- Geluidsfeedback voor juiste en foutieve antwoorden
- Responsive design
- Lokale opslag van beste scores en tijden

## Technologieën

- HTML5
- CSS3 (met variabelen en moderne layout technieken)
- JavaScript (vanilla)
- Web Audio API voor geluidsfeedback

## Installatie

1. Clone de repository:
```bash
git clone https://github.com/[gebruikersnaam]/rune-trainer.git
```

2. Open de `index.html` in je browser of gebruik een lokale server.

## Gebruik

1. Start de trainer door de `index.html` te openen
2. Kies de juiste naam en betekenis voor elke rune
3. Je krijgt direct feedback op je antwoorden
4. Volg je voortgang via de scorebord
5. Probeer je beste tijd te verbeteren!

## Project Structuur

```
rune-trainer/
├── index.html
├── script.js
├── styles.css
├── assets/
│   ├── backgrounds/
│   │   └── [24 rune achtergronden]
│   ├── runes/
│   │   └── [24 rune afbeeldingen]
│   └── sounds/
│       ├── correct.mp3
│       └── incorrect.mp3
└── README.md
```

## Ontwikkeling

De applicatie is gebouwd met vanilla JavaScript en maakt gebruik van moderne web-technologieën zonder externe dependencies. De code is gestructureerd met:

- Modulaire functies voor verschillende aspecten van de trainer
- CSS variabelen voor consistente styling
- Event listeners voor interactiviteit
- Lokale opslag voor persistentie van scores

## Bijdragen

Bijdragen zijn welkom! Voor grote wijzigingen, open eerst een issue om te bespreken wat je wilt veranderen.

## Licentie

Dit project is open source en beschikbaar onder de MIT License.
