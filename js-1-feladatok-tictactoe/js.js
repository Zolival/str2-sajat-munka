'use strict';

let horizontalCells;
let verticalCells;
let resultNumber = 3 ; //((or 5))
let playRound = 0 ;
let xPlayer = [];
let yPlayer = [];

let playerIcon = 'X';

const winnerTest = (id, playerSign) => {
    let indexOf = id.indexOf('-');
    let rowIndex = parseFloat(id.slice(0, indexOf));
    let colIndex = parseFloat(id.slice(indexOf+1 , ));
    let playerSteps;
    if(playerSign === 'X'){
        playerSteps = xPlayer;
    }else{
        playerSteps = yPlayer;
    }
    
    // let winner;
    let trueCounter = 0;

    ruleStore3(colIndex, rowIndex)
    .forEach((array, index) => {
        trueCounter = 0;
        array.forEach((val)=>{
            if(playerSteps.includes(val)){
                trueCounter += 1;
                console.log('trueCounter = ', trueCounter);
            };    
            if(trueCounter == resultNumber -1){
                console.log(index, `${playerSign} NYERT!`);
                massage('.massage', `${playerSign} NYERT !!!`)
                removeAllEvents();
            }        
        })
    });
}
const massage = (destination, massage) => {
    document.querySelector(destination).innerHTML = massage;
}

const removeAllEvents = () => {
    document.querySelectorAll('.free')
        .forEach(v=>{v.setAttribute('class', 'cells blank')}) ;

    document.querySelectorAll('.cells')
        .forEach(e => e.removeEventListener('click', addClickEvents));

}

const ruleStore3 = (colIndex, rowIndex) => {
// Erre ki kell találni jobb megoldást! Van ötletetek?
    let rowControlNegative = [`${rowIndex}-${colIndex -1}` ,`${rowIndex}-${colIndex -2}`];
    let rowControlPositive = [`${rowIndex}-${colIndex +1}` , `${rowIndex}-${colIndex +2}`];
    let centerControl1 = [`${rowIndex}-${colIndex -1}` ,`${rowIndex}-${colIndex +1}`];
    
    let colControlNegative = [`${rowIndex -1}-${colIndex}`, `${rowIndex -2}-${colIndex}`];
    let colControlPositive = [`${rowIndex +1}-${colIndex}`, `${rowIndex +2}-${colIndex}`];
    let centerControl2 = [`${rowIndex -1}-${colIndex}`, `${rowIndex +1}-${colIndex}`];
            
    let diagonalControlNegative1 = [`${rowIndex -1}-${colIndex -1}`, `${rowIndex -2}-${colIndex -2}`];
    let diagonalControlNegative2 = [`${rowIndex -1}-${colIndex +1}` , `${rowIndex -2}-${colIndex +2}`];
    let centerControl3 = [`${rowIndex +1}-${colIndex +1}` , `${rowIndex -1}-${colIndex -1}`];
            
    let diagonalControlPositive1 = [`${rowIndex +1}-${colIndex +1}`, `${rowIndex +2}-${colIndex +2}`];
    let diagonalControlPositive2 = [`${rowIndex +1}-${colIndex -1}`, `${rowIndex +2}-${colIndex -2}`];
    let centerControl4 = [`${rowIndex +1}-${colIndex -1}`, `${rowIndex -1}-${colIndex +1}`]; 

    let resultNumber3 = [rowControlNegative, rowControlPositive, colControlNegative, colControlPositive, diagonalControlNegative1, diagonalControlNegative2, diagonalControlPositive1, diagonalControlPositive2, centerControl1, centerControl2, centerControl3, centerControl4];
    // console.log('ruleStore3 = ', resultNumber3)
    return resultNumber3
}

const restartGame = () => {
    document.querySelector('#playGround__'+ playRound)
        .setAttribute('class', 'table hidden');
        massage('.massage', '')
        playRound += 1;
        document.querySelector('#container')
        .appendChild(elFactory('table', {class: 'table', id: 'playGround__'+ playRound}));
    verticalCells = document.querySelector('#rowNumber').value;
    horizontalCells = document.querySelector('#colNumber').value;
    xPlayer = [];
    yPlayer = [];
    playerIcon = 'X'
    buildGameGround();
}

const startGame = () => {
    playRound +=1
    document.querySelector('#container')
        .appendChild(elFactory('table', {class: 'table', id: 'playGround__'+ playRound}));
        
    verticalCells = document.querySelector('#rowNumber').value;
    horizontalCells = document.querySelector('#colNumber').value;

    let starts__btn = document.querySelector('#starts__btn');
    starts__btn.innerHTML = 'Restart game';
    starts__btn.onclick = restartGame;
    
    buildGameGround();
}

const buildGameGround = ()=>{
    const playGround = document.querySelector('#playGround__'+ playRound);
    
    for(let v = 0; v < verticalCells; v += 1){
        const tr = elFactory('tr', {id: `tr_${v}`, class: 'rows'}, );
        
        for(let h = 0; h < horizontalCells; h += 1){
            const td = elFactory('td', {id:`${v}-${h}`, class:'cells free'}, ' ');
            
            td.addEventListener('click', addClickEvents);
            
            tr.appendChild(td);
        }
        playGround.appendChild(tr);
        
    } 
}

const addClickEvents = (e)=>{
    if(e.target.getAttribute('class').indexOf('free') >-1){

        e.target.innerHTML = playerIcon;  
        e.target.setAttribute('class', 'cells busy');           
        if(playerIcon == 'X'){
            e.target.style.background = 'green';
            winnerTest(e.target.getAttribute('id'), 'X');
            xPlayer.push(e.target.getAttribute('id'));
            playerIcon = '0';
        }else{
            e.target.style.background = 'red';
            winnerTest(e.target.getAttribute('id'), '0');
            yPlayer.push(e.target.getAttribute('id'));
            playerIcon = 'X';
        }
    }else{                    
    }
}


const elFactory = (type, attributes, content) => {
    if(type){
        const el = document.createElement(type);
        if(attributes){
            for(let key in attributes){
                el.setAttribute(key, attributes[key])
            }
        }

        if(content){
            el.appendChild(document.createTextNode(content));
        }
        return el
    }
}