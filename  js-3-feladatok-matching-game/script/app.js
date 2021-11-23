'use strict';
let cardNumber = 10 ;
let playRound = 0 ;
let playIconsArr = ['A', 'B', 'C', 'D', 'E'];
let playPhotosArr = [
    './img/aaeeeab34593fe55b6413887aedcea5d.png',
    './img/rarity-pinkie-pie-rainbow-dash-spike-twilight-sparkle-my-little-pony-d83e1e713a7f4627626701742b97b5ec.png',
    './img/fluttershy-rainbow-dash-pinkie-pie-twilight-sparkle-princess-luna-my-little-pony-c9f8cd083a68f225ca85a42ead6a3064.png',
    './img/pinkie-pie-rainbow-dash-twilight-sparkle-rarity-pony-unicorn-birthday-3d0abeed62ae289b39786596c9b9a93b.png',
    './img/applejack-rarity-twilight-sparkle-pinkie-pie-rainbow-dash-jack-2a6407c3313a80ed4d318df0350294ab.png'
];
const openedCards = [];
const cardOpen = () {
    openedCards.push(this);

    if(openedCards.length === 2){
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};

let clickCounter = 0 ;
const addClickEvents = (e)=>{
    
    // e.target.style.background = 'green';
    e.target.classList.add(`open`, `unmatched`);
    const eventClass = e.target.getAttribute('src');
    console.log('clickCounter, eventClass = ', clickCounter, eventClass);
    if(e.target.getAttribute('class').indexOf('imgIndex_') >-1){
        console.log(e.target.getAttribute('id'));        
    }
}
        /*
        e.target.innerHTML = playerIcon;  
        e.target.setAttribute('class', 'cells busy');
        if(playerIcon == 'X'){
            winnerTest(e.target.getAttribute('id'), 'X');
            xPlayer.push(e.target.getAttribute('id'));
            playerIcon = '0';
        }else{
            e.target.style.background = 'red';
            winnerTest(e.target.getAttribute('id'), '0');
            yPlayer.push(e.target.getAttribute('id'));
            playerIcon = 'X';
    }else{                    
    }
    */

function shuffleDubleArr(playIconsArr) {
    let array = playIconsArr.concat(playIconsArr);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}


const restartGame = () => {
    document.querySelector(`#deckId_${playRound}`)
        .setAttribute('class', 'hidden');
        massage('.massage', '');
        playRound += 1;
        document.querySelector('#playContainer')
        .appendChild(elFactory('div', {class: 'playGround', id: `deckId_${playRound}`}));
    
    buildGameGround();
}


const startGame = () => {
    playRound +=1
    document.querySelector('#playContainer')
        .appendChild(elFactory('div', {class: 'deck', id: `deckId_${playRound}`}));
    
    buildGameCards();
}

const buildGameCards = ()=>{
    const playGround = document.querySelector(`#deckId_${playRound}`);
    const suffledIcons = shuffleDubleArr(playPhotosArr);
    suffledIcons.forEach((icon, index)=>{
        
           let el = elFactory('div', {class: `card`, id:`card_${index}`}, 
                        elFactory('img', {src: icon , alt:"card img", class:'img'} )
                    )
            el.addEventListener('click', addClickEvents);
            playGround.appendChild(el);
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

const clock = document.querySelector('#clock');

const createTime = (date = new Date()) => {
    const intlHu = Intl.DateTimeFormat('hu', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
    const output = intlHu.format(date);
    clock.textContent = output;
    return new Promise((resolve) => {
        let id = setTimeout(() => {
            clearTimeout(id);
            resolve();
        }, 1000);
    });
};

(async () => {
    while (true) {
        await createTime();
    }
})();


startGame();
createTime(Date.UTC(2020, 11, 20, 3, 23, 16, 738))