'use strict';
let cardNumber = 10 ;
let playRound = 0 ;
let playIconsArr = ['A', 'B', 'C', 'D', 'E'];
let playPhotosArr = [
    './img/aaeeeab34593fe55b6413887aedcea5d.png',
    './img/rarity-pinkie-pie-rainbow-dash-spike-twilight-sparkle-my-little-pony-d83e1e713a7f4627626701742b97b5ec.png',
    './img/fluttershy-rainbow-dash-pinkie-pie-twilight-sparkle-princess-luna-my-little-pony-c9f8cd083a68f225ca85a42ead6a3064.png',
    './img/pinkie-pie-rainbow-dash-twilight-sparkle-rarity-pony-unicorn-birthday-3d0abeed62ae289b39786596c9b9a93b.png',
    // './img/applejack-rarity-twilight-sparkle-pinkie-pie-rainbow-dash-jack-2a6407c3313a80ed4d318df0350294ab.png',
    // `./img/rainbow-dash-my-little-pony-twilight-sparkle-deviantart-dash-48cdab4eae42f0afd0cac08f660daa4f.png`,
    `./img/twilight-sparkle-pony-pinkie-pie-applejack-princess-celestia-twilight-fcda48c70f7a8f7cab490ee1031025b9.png`
];

let openedCards = [];
let clickCounter = 0 ;
let roundNum = 0;
let startedPlay = false;

const cardOpen = () => {
    if(!startedPlay){
        startTimer();
        startedPlay = true;
    }
    console.log(`openedCards = `, openedCards);
    if(openedCards.length >= 2){
        roundNum += 1;
        if(openedCards[0] === openedCards[1]){
            openedCards.forEach( (val, i)=> {
                let el = document.querySelector(`${val}`);
                el.classList.add('pair');
                console.log('cardOpen  el=', el)
                openedCards = []
            });
        } else {
            console.log('cardOpen else');
            setTimeout(()=>{
                openedCards.forEach( (val)=> document.querySelector(`.${val}`).classList.remove(`watched`) );
                openedCards = []
            }, 3750)
        }
    }
};


const addClickEvents = (e) => {
    clickCounter += 1
    const evParentClass = e.target.parentElement.getAttribute('class');
    console.log('evParentClass = ', evParentClass);
    if(evParentClass.indexOf(`flip-card-inner`) > -1) {
        let ele = e.target.parentElement.classList.add(`watched`);
        openedCards.push(e.target.parentElement.getAttribute(`class`));
        cardOpen();
    }else {
        console.error(e);
    }
}
        

const shuffleDubleArr = (playIconsArr) => {
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
        massage('.massage', '');
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
            let clName = icon.replaceAll('.', '').replaceAll('/', '');
            // console.log(clName)
            let el = elFactory('div', {class: `flip-card flipcard-div`, id:`flip-card_${index}`}, 
                elFactory('div', {class:`flip-card-inner imgInnerId_${clName}`, id:`flip-card-inner_${index}`},
                    elFactory('div', {class:`flip-card-front flip-card-frontId_${clName}`, id:`flip-card-front_${index}`}),
                    elFactory('div', {class:`flip-card-back imgBackId_${clName}`, id:`flip-card-back_${index}`},
                        elFactory('img', {src: `${icon}` , alt: "card img", class: 'img'} )
                    )
                )
            )
            // el.addEventListener('click', addClickEvents);
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

// @description game timer
let second = 0, minute = 0, hour = 0;
const timer = document.querySelector("#clock");
var interval;
const startTimer =() => {
    interval = setInterval(() => {
        timer.innerHTML = minute.toString().padStart(2, '0') +":"+second.toString().padStart(2, '0') ;
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    }, 1000);
}



startGame();

(() => {
    document.querySelectorAll('.flip-card-inner')
    .forEach( (card) => card.addEventListener(`click`, addClickEvents) );
})();