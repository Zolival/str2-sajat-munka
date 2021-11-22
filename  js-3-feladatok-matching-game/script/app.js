'use strict';
let cardNumber = 10 ;
let playRound = 0 ;
let playIconsArr = ['A', 'B', 'C', 'D', 'E'];
let playPhotosArr = [
    './img/1-15985_spike-fluttershy-fluttershy-pinkie-pie-my-little-pony-svg.png',
    './img/aaeeeab34593fe55b6413887aedcea5d.png',
    './img/imgbin-pinkie-pie-pony-applejack-rarity-birthday-birthday-9bqgHZUDB4H9Bq5ASimDEqeLn.jpg',
    './img/pinkie-pie-rainbow-dash-twilight-sparkle-rarity-pony-unicorn-birthday.jpg',
    './img/twilight-sparkle-pinkie-pie-rainbow-dash-rarity-pony-twilight-sparkle-transparent-png-thumbnail.jpg'
];


function shuffleDubleArr(playIconsArr) {
    let array = playIconsArr.concat(playIconsArr);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}


const restartGame = () => {
    document.querySelector(`#playGround__${playRound}`)
        .setAttribute('class', 'playGround hidden');
        massage('.massage', '')
        playRound += 1;
        document.querySelector('#playContainer')
        .appendChild(elFactory('div', {class: 'playGround', id: `playGround__${playRound}`}));
    
    buildGameGround();
}


const startGame = () => {
    playRound +=1
    document.querySelector('#playContainer')
        .appendChild(elFactory('div', {class: 'playGround', id: `playGround__${playRound}`}));
    
    buildGameCards();
}

const buildGameCards = ()=>{
    const playGround = document.querySelector(`#playGround__${playRound}`);
    const suffledIcons = shuffleDubleArr(playPhotosArr);
    suffledIcons.forEach((icon, index)=>{
        playGround.appendChild(
            elFactory('div', {class:"flip-card", id:`flip-card_${index}`}, 
                elFactory('div', {class:"flip-card-inner", id:`flip-card-inner_${index}`},
                    elFactory('div', {class:"flip-card-front", id:`flip-card-front_${index}`}),
                    elFactory('div', {class:"flip-card-back", id:`flip-card-back_${index}`},
                        // elFactory('h1', {class:"icns"} , icon )
                        elFactory('img', {src: icon , alt: "Avatar", class: 'img'} )
                    )
                )
            )
            
        );
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


startGame();
