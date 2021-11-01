'use strict';

const horizontalCells = 5;
const verticalCells = 5;
let resultNumber = 3; //or 5
let xPlayer = [];
let yPlayer = [];

const winnerTest = (id)=>{
    let indexOf = id.indexOf('-');
    let rowIndex = parseFloat(id.slice(0, indexOf));
    let colIndex = parseFloat(id.slice(indexOf+1 , ));
    console.log('rowIndex = ', rowIndex);
    console.log('colIndex = ', colIndex);
    // let idnumber = [rowIndex,  colIndex]
    let idNumber = `${colIndex}${colIndex}`
    console.log('idnumberArray = ', typeof parseFloat(idNumber));

    

    let rowControlNegative = [`${colIndex}-${rowIndex -1}` ,`${colIndex}-${rowIndex -2}`];
    let rowControlPositive = [`${colIndex}-${rowIndex +1}` , `${colIndex}-${rowIndex +2}`];
    console.log('rowControlNegative = ', rowControlNegative);
    console.log('rowControlPositive = ', rowControlPositive);
    let colControlNegative = [`${colIndex -1}-${rowIndex}`, `${colIndex -2}-${rowIndex}`];
    let colControlPositive = [`${colIndex +1}-${rowIndex}`, `${colIndex +2}-${rowIndex}`];

    
    let obliqueControlNegative1 = [`${colIndex -1}-${rowIndex -1}`, `${colIndex -2}-${rowIndex -2}`];
    let obliqueControlNegative2 = [`${colIndex -1}-${rowIndex +1}` , `${colIndex -2}-${rowIndex +2}`];
    
    let obliqueControlPositive1 = [`${colIndex +1}-${rowIndex +1}`, `${colIndex +2}-${rowIndex +2}`];
    let obliqueControlPositive2 = [`${colIndex +1}-${rowIndex -1}`, `${colIndex +2}-${rowIndex -2}`];

    /*
    let h = colIndex;
    for( h ; h < colIndex + resultNumber ; h++ ){
        console.log('forColIndex = ' , h)
    }
    let v = rowIndex;
    for(v ; v < rowIndex + resultNumber ; v++ ){
        console.log('forRowIndex = ' , v)        
    }
*/
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
}

const buildGameGround = ()=>{

    const playGround = document.querySelector('#playGround');
    let playerIcon = 'X';
     
    for(let v = 0; v < verticalCells; v += 1){
        const tr = elFactory('tr', {id: `tr_${v}`, class: 'rows'}, );
        
        for(let h = 0; h < horizontalCells; h += 1){
            const td = elFactory('td', {id:`${v}-${h}`, class:'cells free'}, ' ');
            
                td.addEventListener('click', (e)=>{
                    console.log('id = ', e.target.getAttribute('id'));
                    if(e.target.getAttribute('class').indexOf('free') >-1){

                        e.target.innerHTML = playerIcon;  
                        e.target.setAttribute('class', 'cells busy');           
                        winnerTest(e.target.getAttribute('id'));
                        if(playerIcon == 'X'){
                            e.target.style.background = 'green';
                            xPlayer.push(e.target.getAttribute('id'));
                            playerIcon = '0';
                        }else{
                            e.target.style.background = 'red';
                            yPlayer.push(e.target.getAttribute('id'));
                            playerIcon = 'X';
                        }
                        console.log('xPlayer = ', xPlayer);
                        console.log('yPlayer = ', yPlayer);
                    }else{                    
                    }
                });
            
            tr.appendChild(td);
        }
        playGround.appendChild(tr);
        
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
