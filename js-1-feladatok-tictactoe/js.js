'use strict';

const horizontalCells = 5;
const verticalCells = 5;
let resultNumber = 3 ; //or 5
let xPlayer = [];
let yPlayer = [];

let playerIcon = 'X';

const winnerTest = (id, playersign)=>{
    let indexOf = id.indexOf('-');
    let rowIndex = parseFloat(id.slice(0, indexOf));
    let colIndex = parseFloat(id.slice(indexOf+1 , ));
    let playerSteps;
    if(playersign === 'X'){
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
                console.log(index, `${playersign} NYERT !!!`);
            }        
        })
    });
}      

const ruleStore3 = (colIndex, rowIndex)=>{

    let rowControlNegative = [`${rowIndex}-${colIndex -1}` ,`${rowIndex}-${colIndex -2}`];
    let rowControlPositive = [`${rowIndex}-${colIndex +1}` , `${rowIndex}-${colIndex +2}`];
    let centerControl1 = [`${rowIndex}-${colIndex -1}` ,`${rowIndex}-${colIndex +1}`];
    
    let colControlNegative = [`${rowIndex -1}-${colIndex}`, `${rowIndex -2}-${colIndex}`];
    let colControlPositive = [`${rowIndex +1}-${colIndex}`, `${rowIndex +2}-${colIndex}`];
    let centerControl2 = [`${rowIndex -1}-${colIndex}`, `${rowIndex +1}-${colIndex}`];
            
    let obliqueControlNegative1 = [`${rowIndex -1}-${colIndex -1}`, `${rowIndex -2}-${colIndex -2}`];
    let obliqueControlNegative2 = [`${rowIndex -1}-${colIndex +1}` , `${rowIndex -2}-${colIndex +2}`];
    let centerControl3 = [`${rowIndex +1}-${colIndex +1}` , `${rowIndex -1}-${colIndex -1}`];
            
    let obliqueControlPositive1 = [`${rowIndex +1}-${colIndex +1}`, `${rowIndex +2}-${colIndex +2}`];
    let obliqueControlPositive2 = [`${rowIndex +1}-${colIndex -1}`, `${rowIndex +2}-${colIndex -2}`];
    let centerControl4 = [`${rowIndex +1}-${colIndex -1}`, `${rowIndex -1}-${colIndex +1}`]; 

    let resultNumber3 = [rowControlNegative, rowControlPositive, colControlNegative, colControlPositive, obliqueControlNegative1, obliqueControlNegative2, obliqueControlPositive1, obliqueControlPositive2, centerControl1, centerControl2, centerControl3, centerControl4];
    // console.log('ruleStore3 = ', resultNumber3)
    return resultNumber3
}
  
/* 
    kiszámolható, hogy az aktuális cellába kattintva nyert-e az illető a többi indexhez képest?
    max 10 cella/sor és 10 cella/oszlop
    idnumber
    vízszintesen
    (ha kisebb mint max rowindex -3)
    +1, +2 (+3, +4)
    (ha nagyobb, mint X3)
    -1, -2 (-3, -4)
    
    függőlegesen
    + 10, +20 (+30, +40)
    (ha nagyobb, mint X3)
    -10, -20

    sréhen
    +11, +12 (+13, +14)
    (ha nagyobb, mint 29)
    -11, -12 (-13, -14)

    majd a meglévő számokat megkeresni a xPlayer vagy az yPlayer tömbökben ]
*/


const buildGameGround = ()=>{

    const playGround = document.querySelector('#playGround');
    
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
    // console.log('id = ', e.target.getAttribute('id'));
    if(e.target.getAttribute('class').indexOf('free') >-1){

        e.target.innerHTML = playerIcon;  
        e.target.setAttribute('class', 'cells busy');           
        // console.log(winnerTest(e.target.getAttribute('id')));
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
        console.log('xPlayer = ', xPlayer);
        console.log('yPlayer = ', yPlayer);
    }else{                    
    }
}


const elFactory = (type, attributes, content)=> {
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

buildGameGround();
