'use strict';

const horizontalCells = 25;
const verticalCells = 25;
let resultNumber = 3; //or 5
let xPlayer = [];
let yPlayer = [];

const winnerTest = (id)=>{
    let indexOf = id.indexOf('-');
    let rowIndex = parseFloat(id.slice(0, indexOf));
    let colIndex = parseFloat(id.slice(indexOf+1 , ));
    console.log('rowIndex = ', rowIndex);
    console.log('colIndex = ', colIndex);
    let idnumber = [rowIndex,  colIndex]
    console.log('idnumberArray = ',  idnumber)
    
    let h = colIndex;
    for( h ; h < colIndex + resultNumber ; h++ ){
        console.log('forColIndex = ' , h)
    }
    let v = rowIndex;
    for(v ; v < rowIndex + resultNumber ; v++ ){
        console.log('forRowIndex = ' , v)        
    }
/* 
    kiszámolható, hogy az aktuális cellába kattintve nyert-e az illető a többi indexhez képest?
    
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
