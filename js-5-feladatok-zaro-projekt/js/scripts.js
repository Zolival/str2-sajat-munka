"use strict";

let lang = 'en';

const headerLanguage = {
    en: ['id', 'name', 'email', 'address', "function"],
    hu: ['azonosítója', 'neve', 'email címe', 'címe', "funkció"]
}

const btnLanguage = {
    en: ["language selector", 'edit', 'delete', 'save', 'cacel'],
    hu: ["nyelv választó", 'szerkesztés', 'törlés', 'mentés', 'visszavonás']
}

const fetchOptions = {
    get: {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
    },
    set: {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify(data),
    }
}

const getServer = async (url, fetchOptions) => {
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

const languageSelectorCreator = () => {
    const label = elFactory("label", {class: "language_label language_selector", for: "language_selectorId"}, `${btnLanguage[lang][0]}: `);
    const select = elFactory("select", {class: "form-control language_selector", id: "language_selectorId"});

    Object.keys(btnLanguage)
    .forEach( 
        (item) => select.appendChild( elFactory("option", { value: `${item}`}, `${item}`) )
        )

    
    const div = elFactory("div", {class: "form-group col-4 d-flex mt-3  language_container"}, label, select);
    document.querySelectorAll('.language-selector').forEach((item) => item.appendChild(div));
}


const tableGenerator = (dataArr, lang) => {
    languageSelectorCreator();
    const table = document.querySelector("#users-table");
    
    const thead = elFactory("thead");
    table.appendChild(thead);

    headerCreator(lang);

    const tbody = elFactory("tbody");
    table.appendChild(tbody);    
    listCreator(dataArr);
}

const headerCreator = () => {
    const thead = document.querySelector("thead");
    const row = document.createElement("tr");
    
    headerLanguage[lang].forEach((item) => row.innerHTML += `<th>${item}</th>`)
    
    thead.appendChild(row);
}

const listCreator = (dataArr, ) => {
    const tbody = document.querySelector("tbody");

   dataArr.reverse().forEach((item) => {
        const row = elFactory("tr", {readonly: "true"});
        let rowId = null;
        for (let key in item) {
           
            if(key == "id"){
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
    const editBtn = elFactory( "button", {class: `btn btn-info`, onclick: "rowEditingBtn(this)"}, `${btnLanguage[lang][1]}`);
    const deletBtn = elFactory( "button", {class: "btn btn-danger", onclick: "deleteBtn(this)"}, `${btnLanguage[lang][2]}`);
    const btnGroup = elFactory("div", {class: "btn-group"}, editBtn, deletBtn);
    return btnGroup
}


const rowEditingBtn = (event) => {
    const tr = event.parentElement.parentElement;
    const exceptionId = tr.getAttribute('id');
    anyRowCloser(exceptionId, 'false');

    if(tr.getAttribute('readonly') === 'true'){
        const cells = tr.children
        
        for(let i = 1; i < 4; i++){
            const value = cells[i].getAttribute('value');
            const name = cells[i].getAttribute('name');
            cells[i].textContent = ''
            cells[i].appendChild( elFactory('input', {class: "form-control", name: `${name}`, value: `${value}`}, `${value}`));
        }
        const cellAttributes = cells[4].getAttribute('value');
        rowEditingBtnCreator(cells)
    }else{
        console.log('hibaüzenet helye: "Először be kell fejezned az aktuális szerkesztést" ')
    }
}

const rowEditingBtnCreator = (cells, ) => {
    cells[4].children[0].removeAttribute('onclick')
    cells[4].children[0].setAttribute('onclick', "saveBtn(this)")
    cells[4].children[0].textContent = `${btnLanguage[lang][3]}`
    
    cells[4].children[1].removeAttribute('onclick')
    cells[4].children[1].setAttribute('onclick', "cancelBtn(this)")
    cells[4].children[1].textContent = `${btnLanguage[lang][4]}`
}

const anyRowCloser = (exceptionId, condition = 'false') => {
    const trArr = document.querySelectorAll('tr');
    trArr.forEach(item => {
            if(item.getAttribute('id') !== exceptionId){
                item.setAttribute('readonly', condition)
            }
    })
}

const deleteBtn = (event) => {
    const tr = event.parentElement.parentElement;
    const exceptionId = tr.getAttribute('id');

   
        const cells = tr.children;
        let valuesArr = [cells[0].getAttribute('value')];

        for (let i = 1; i < 4; i++) {
            const textValue = cells[i].getAttribute('value'); 
            valuesArr.push(textValue);
        }
        console.log('array send delete to server:', valuesArr);

    event.closest("tr").remove();
}

const saveBtn = (event) => {
    const tr = event.parentElement.parentElement;
    const exceptionId = tr.getAttribute('id');

    if (tr.getAttribute('readonly') === 'true') {
        const cells = tr.children;
        let valuesArr = [cells[0].getAttribute('value')];

        for (let i = 1; i < 4; i++) {
            const textValue = cells[i].children[0].value;
            valuesArr.push(textValue);
            cells[i].children[0].remove();
            cells[i].textContent = textValue;
            cells[i].removeAttribute('value');
            cells[i].setAttribute('value', textValue);
        }
        editDeleteBtnCreator(cells);
        console.log('array send to server:', valuesArr);
    }
    anyRowCloser(exceptionId, 'true');
}

const editDeleteBtnCreator = (cells, ) => {
    cells[4].children[0].removeAttribute('onclick');
    cells[4].children[0].setAttribute('onclick', "rowEditingBtn(this)");
    cells[4].children[0].textContent = `${btnLanguage[lang][1]}`;
    
    cells[4].children[1].removeAttribute('onclick')
    cells[4].children[1].setAttribute('onclick', "deleteBtn(this)")
    cells[4].children[1].textContent = `${btnLanguage[lang][2]}`
}

const cancelBtn = (event) => {
    const tr = event.parentElement.parentElement;
    const exceptionId = tr.getAttribute('id');

    if(tr.getAttribute('readonly') === 'true'){
        const cells = tr.children
        
        for(let i = 1; i < 4; i++){
             const originalData = cells[i].getAttribute('value');
            console.log(cells[i].getAttribute('value'));
            const textValue = cells[i].getAttribute('value') ;
            cells[i].children[0].remove();
            cells[i].textContent = textValue;
            cells[i].removeAttribute('value');
            cells[i].setAttribute('value', textValue);
        }
        editDeleteBtnCreator(cells)
        anyRowCloser(exceptionId, 'true');
}
}


getServer("http://localhost:3000/users", fetchOptions.get);
console.log("lefutott a kod!"); 


// let eventL = document.querySelector("#language_selector")
// .addEventListener('blur', buttons());
console.log( document.querySelector("#language_selectorId") );
const buttons = () => console.log("siker!");