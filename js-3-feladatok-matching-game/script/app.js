'use strict';
const playPhotosArr = [
    /*
    './img/aaeeeab34593fe55b6413887aedcea5d.png',
    './img/applejack-rarity-twilight-sparkle-pinkie-pie-rainbow-dash-jack-2a6407c3313a80ed4d318df0350294ab.png',
    './img/fluttershy-applejack-pinkie-pie-twilight-sparkle-rainbow-dash-my-little-pony-fe9bf0dd635e0b665747324cfb01ab65.png',
    './img/fluttershy-rainbow-dash-pinkie-pie-twilight-sparkle-princess-luna-my-little-pony-c9f8cd083a68f225ca85a42ead6a3064.png',
    './img/pinkie-pie-rainbow-dash-rarity-twilight-sparkle-applejack-pinkie-pie-png-image-f9f9d007c36213dac045b356ceb64c76.png',
    './img/pinkie-pie-twilight-sparkle-pony-rarity-rainbow-dash-pie-0c4a23e67afe3bb4b9666c223f35a1ce.png',
    './img/pinkie-pie-rainbow-dash-twilight-sparkle-rarity-pony-unicorn-birthday-3d0abeed62ae289b39786596c9b9a93b.png',
    './img/pony-pinkie-pie-twilight-sparkle-applejack-bonbon-my-little-pony-1bb5e348f9fb07e0a5d1f9ff4cab316f.png',
    './img/rarity-twilight-sparkle-my-little-pony-unicorn-unicorn-face-1521868bc32ecae1652518a470dbbf05.png',
    */
    `./img/rainbow-dash-my-little-pony-twilight-sparkle-deviantart-dash-48cdab4eae42f0afd0cac08f660daa4f.png`,
    './img/rainbow-dash-twilight-sparkle-my-little-pony-rainbow-dash-cliparts-88974a3df3c9e6d82040cefe66f5de43.png',
    './img/rarity-pinkie-pie-rainbow-dash-spike-twilight-sparkle-my-little-pony-d83e1e713a7f4627626701742b97b5ec.png',
    './img/rarity-pinkie-pie-twilight-sparkle-spike-applejack-rarity-cliparts-b23f6b451bd2a7e49604c2ed12ad6bc2.png',
    `./img/twilight-sparkle-pony-pinkie-pie-applejack-princess-celestia-twilight-fcda48c70f7a8f7cab490ee1031025b9.png`,
];

// https://www.pngegg.com/en/png-zzlec/download


let playRound = 0;
let openedCards = [];
let roundNum = 0;
let pairNum = 0;
let startedPlay = false;
let lastParentid;

// @description game timer
const timer = document.querySelector("#clock");
let second = 0,
    minute = 0,
    hour = 0;
// ------------

const checkedGameFinish = () => {
    pairNum += 1;
    if (pairNum == playPhotosArr.length) {
        setTimeout(() => {
            restartGame();
            clearInterval(setInterval);
        }, 5000);
    }
}

const cardOpen = () => {
    playChecking();

    if (openedCards.length >= 2) {
        roundNum += 1;
        if (openedCards[0] === openedCards[1]) {
            setTimeout(() => {
                openedCards.forEach((val, i) => {
                    document.querySelectorAll(`.${val.replaceAll(' ', '.')}`)[i].classList.add(`pair`);
                    document.querySelectorAll(`.${val.replaceAll(`flip-card-inner`, `image`)
                    .replaceAll(` watched`, ``).replaceAll(' ', '.')}`)[i]
                        .classList.add(`pulsePair`);
                });
                checkedGameFinish();
                openedCards = [];
                lastParentid = 0;
            }, 800)
        } else {
            setTimeout(() => {
                openedCards.forEach((val) => document.querySelector(`.${val.replaceAll(' ', '.')}`).classList.remove(`watched`));
                openedCards = [];
                lastParentid = 0;
            }, 2750)
        }
    }
};

const playChecking = () => {
    if (!startedPlay) {
        startTimer();
        startedPlay = true;
    }
}
const addClickEvents = (e) => {
    const evParentClass = e.target.parentElement.getAttribute('class');
    const evParentId = e.target.parentElement.getAttribute('id');
    if (lastParentid != evParentId) {
        if (evParentClass.indexOf(`flip-card-inner`) > -1 && openedCards.length < 2) {
            let ele = e.target.parentElement.classList.add(`watched`);
            openedCards.push(e.target.parentElement.getAttribute(`class`));
            cardOpen();
        } else {
            console.error(e);
        }
        lastParentid = evParentId
    }
}


const shuffleDoubleArr = (playIconsArr) => {
    let array = playIconsArr.concat(playIconsArr);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}


const restartGame = () => {
    const element = document.querySelector(`#playGround__${playRound}`);
    element.classList.add('hidden');
    element.remove(`playGround`);
    second = 0;
    minute = 0;
    hour = 0;
    startedPlay = false;
    lastParentid = 0;
    openedCards = [];
    roundNum = 0;
    pairNum = 0;
    startGame();
}


const startGame = () => {
    playRound += 1
    document.querySelector('#playContainer')
        .appendChild(elFactory('div', {
            class: 'playGround',
            id: `playGround__${playRound}`
        }));

    buildGameCards();
    addEvents();
}

const buildGameCards = () => {
    const playGround = document.querySelector(`#playGround__${playRound}`);
    const shuffledIcons = shuffleDoubleArr(playPhotosArr);
    shuffledIcons.forEach((icon, index) => {
        if (icon != '') {
            let clName = icon.replaceAll('.', '').replaceAll('/', '').replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '');
            let el = elFactory('div', {
                    class: `flip-card flipcard-div`,
                    id: `flip-card_${index}`
                },
                elFactory('div', {
                        class: `flip-card-inner flip-card-innerId_${clName}`,
                        id: `flip-card-inner_${index}`
                    },
                    elFactory('div', {
                        class: `flip-card-front flip-card-frontId_${clName}`,
                        id: `flip-card-front_${index}`
                    }),
                    elFactory('div', {
                            class: `flip-card-back flip-card-backId_${clName}`,
                            id: `flip-card-back_${index}`
                        },
                        elFactory('img', {
                            src: `${icon}`,
                            alt: "card image",
                            class: `image imageId_${clName}`
                        })
                    )
                )
            )
            playGround.appendChild(el);
        }
    })
}

// elFactory(type, attributes, ...children)
const elFactory = (type, attributes, ...children) => {
    const el = document.createElement(type);

    for (let key in attributes) {
        el.setAttribute(key, attributes[key]);
    }

    children.forEach((child) => {
        if (typeof child === "string") {
            el.appendChild(document.createTextNode(child));
        } else {
            el.appendChild(child);
        }
    });
    return el;
}

// @description game timer
// const timer = document.querySelector("#clock");
// let second = 0, minute = 0, hour = 0;
timer.innerHTML = minute.toString().padStart(2, '0') + ":" + second.toString().padStart(2, '0');

const startTimer = () => {
    setInterval(() => {
        timer.innerHTML = minute.toString().padStart(2, '0') + ":" + second.toString().padStart(2, '0');
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}



const addEvents = () => {
    document.querySelectorAll('.flip-card-inner')
        .forEach((card) => card.addEventListener(`click`, addClickEvents));
};

startGame();