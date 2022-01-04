"use strict";

const headerLanguage = {
    en: ['id', 'name', 'email', 'address', "function"],
    hu: ['azonosítója', 'neve', 'email címe', 'címe', "funkció"]
}

const btnLanguage = {
    en: ["language selector", 'edit', 'delete', 'save', 'cacel'],
    hu: ["nyelv választó", 'szerkesztés', 'törlés', 'mentés', 'visszavonás']
}

const getServer = async (url) => {
    const fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
      };
    try {
        const response = await fetch(url, fetchOptions);
        const dataArr = await response.json();
        tableGenerator(dataArr);
        return dataArr
    } catch (err) {
        console.error(`Error! Massage: ${err} ; sourse: ${url}`);
        return `Error! Massage: ${err} ; sourse: ${url}`
    }
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

const languageSelectorCreator = (lang = "en") => {
    const label = elFactory("label", {class: "language_label language_selector", for: "language-selector"}, `${btnLanguage[lang][0]}: `);
    const select = elFactory("select", {class: "form-control language_selector", id: "language-selector"});

    Object.keys(btnLanguage)
    .forEach( (item) => {
        return select.appendChild( elFactory("option", {class: "form-floating language_selector", id: "language-selector", value: `${item}`}, `${item}`) );
    });
    
    const div = elFactory("div", {class: "form-group col-4 d-flex mt-3  language_container"}, label, select);
    document.querySelector('.language-selector').appendChild(div);
}
 
const tableGenerator = (dataArr, lang = "en") => {
    languageSelectorCreator()
    const table = document.querySelector("#users-table");
    
    const thead = elFactory("thead");
    table.appendChild(thead);

    headerCreator(dataArr, lang);

    const tbody = elFactory("tbody");
    table.appendChild(tbody);    
    listCreator(dataArr, lang);
}

const headerCreator = (dataArr, lang = "en") => {
    const thead = document.querySelector("thead");
    const row = document.createElement("tr");
    
    headerLanguage[lang].forEach((item) => row.innerHTML += `<th>${item}</th>`)
    
    thead.appendChild(row);
}

const listCreator = (dataArr, lang = "en") => {
    const tbody = document.querySelector("tbody");

   dataArr.reverse().forEach((item) => {
        const row = elFactory("tr", {readonly: "true"});
        let rowId = null;
        for (let key in item) {
            // console.log(key);
            // row.innerHTML += `<td>${item[key]}</td>`
            if(key == "id"){
                // console.log("row", item[key])
                rowId = item[key]
                row.setAttribute("id", rowId)
            }
            let cell = elFactory("td", {value: `${item[key]}`, name: `${key}`});
            let cellText = document.createTextNode(item[key]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        
        let cell2 = elFactory("td");
        let buttonGrup = btnGroupCreator(rowId, lang);
        row.appendChild(buttonGrup);
        tbody.appendChild(row)
    })
}

const btnGroupCreator = (rowId, lang = "hu") => {
    const editBtn = elFactory( "button", {class: `btn btn-info`, onclick: "rowEditing(this)"}, `${btnLanguage[lang][1]}`);
    const deletBtn = elFactory( "button", {class: "btn btn-danger", onclick: "deleteRow(this)"}, `${btnLanguage[lang][2]}`);
    const btnGroup = elFactory("div", {class: "btn-group"}, editBtn, deletBtn);
    return btnGroup
}

// document.querySelector("#users-table").addEventListener('click', buttons);

// const buttons = () => console.log("siker!");


const deleteRow = (event) => {
    event.closest("tr").remove();
}

const rowEditing = (event) => {
    const tr = event.parentElement.parentElement;
    const exceptionId = tr.getAttribute('id');
    anyRowCloser(exceptionId, 'false');

    if(tr.getAttribute('readonly') === 'true'){
        const cells = tr.children
        
        for(let i = 1; i<4; i++){
            const value = cells[i].getAttribute('value');
            cells[i].textContent = ''
            cells[i].appendChild( elFactory('input', {class: "form-control", value: `${value}`}, `${value}`));
        }
        const cellAttributes = cells[4].getAttribute('value');
        // button settings:
        cells[4].children[0].removeAttribute('onclick')
        cells[4].children[0].setAttribute('onclick', "saveNewData(this)")
        cells[4].children[0].textContent = 'save'
        // console.log( cells[4].children[0] );

        cells[4].children[1].removeAttribute('onclick')
        cells[4].children[1].setAttribute('onclick', "cancelBtn(this)")
        cells[4].children[1].textContent = 'cancel'
        // console.log( cells[4].children[1] );
    }else{
        console.log('hibaüzenet helye: "Először be kell fejezned az aktuális szerkesztést" ')
    }
}

const anyRowCloser = (exceptionId, condition = 'false') => {
    const trArr = document.querySelectorAll('tr');
    trArr.forEach(item => {
            if(item.getAttribute('id') !== exceptionId){
                item.setAttribute('readonly', condition)
            }
    })
}

const saveNewData = (event) => {
    const tr = event.parentElement.parentElement;
    const exceptionId = tr.getAttribute('id');

    if(tr.getAttribute('readonly') === 'true'){
        const cells = tr.children
        
        for(let i = 1; i<4; i++){
            cells[i].removeAttribute('value')
            // console.log(cells[i].getAttribute('value') );
            console.log(cells[i].textContent ) // .textContent .innerText .nodeValue .value .innerHTML
            // cells[i].appendChild( elFactory('input', {class: "form-control", value: `${value}`}));
        }
    }
    // anyRowCloser(exceptionId, 'true');
}
const cancelBtn = (event) => {

}

getServer("http://localhost:3000/users");
console.log("lefutott a kod!"); 