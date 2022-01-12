"use strict";

let lang = 'en';

const headerLanguage = {
    en: ['id', 'name', 'email', 'address', "function"],
    hu: ['azonosítója', 'neve', 'email címe', 'címe', "funkció"]
}

const btnLanguage = {
    en: ["language selector", 'edit', 'delete', 'save', 'cacel', "new user"],
    hu: ["nyelv választó", 'szerkesztés', 'törlés', 'mentés', 'visszavonás', 'új felhasználó']
}

const dialogMassageObj = {
    en: {
        notValid: 'this data is not valid',
        dataSend: 'we have sent the data to the server',
        editing: 'You must complete the current edit first',
        noModification: 'no data modification'
    },

    hu: {
        notValid: 'ez az adat nem érvényes',
        dataSend: 'elküldtük a szerverre az adatokat',
        editing: 'Először be kell fejezned az aktuális szerkesztést',
        noModification: 'nincs adatmódosítás'
    }
}

let dialogMassage = '';

const validations = ['true',
    /^[a-zA-Z]+ [a-zA-Z]+$/,
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    /^[a-zA-Z0-9\s,.'-]{3,}$/
]

const newUserArr = [{ id: 'Number', name: 'Firstname Lastname', email: 'email@exemple.com', address: 'zipcode Síty Street' }];

const fetchOptions = {
    get: {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
    },
    set: {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: { "Content-Type": "application/json", },
        body: ''
    }, 
    del: {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
      }
}

let saveDataArr = '';

const getServer = async (url, fetchOptions) => {
    try {
        const response = await fetch(url, fetchOptions);
        const dataArr = await response.json();
        saveDataArr = dataArr;
        tableGenerator(dataArr.reverse());


    } catch (err) {
        console.error(`Error! Massage: ${err} ; sourse: ${url}`);
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
    const label = elFactory("label", { class: "language_label language_selector", for: "language_selectorId", id: 'language_select_label_Id' }, `${btnLanguage[lang][0]}: `);
    const select = elFactory("select", { class: "form-select language_selector", id: "language_selectorId" });

    Object.keys(btnLanguage)
        .forEach(
            (item) => select.appendChild(elFactory("option", { value: `${item}` }, `${item}`))
        )


    const div = elFactory("div", { class: "form-group col-4 d-flex mt-3  language_container" }, label, select);
    document.querySelectorAll('.language-selector').forEach((item) => item.appendChild(div));

    select.addEventListener('change', inputFild);
    addUserBtn()
}

const addUserBtn = () => {
    const addBtn = elFactory('button', { class: "btn btn-outline-success addUserBtn btn-sm mt-4", onclick: 'addNewUser()' }, btnLanguage[lang][5]);
    document.querySelector('.language-selector').appendChild(addBtn);
}

const addNewUser = () => {
    document.querySelectorAll('.tables').forEach(item => item.remove());
    const nemwTrId = maxId() + 1;
    newUserArr[0].id = nemwTrId;
    tableGenerator(newUserArr);
    rowEditingBtn(null, nemwTrId);
    listCreator(saveDataArr);
}

const maxId = () => {
    let maxIdNum = null;
    saveDataArr.forEach(item => item.id > maxIdNum ? maxIdNum = item.id : '');
    return maxIdNum
}

const inputFild = () => {
    lang = document.querySelector('#language_selectorId').value;
    document.querySelector('#language_select_label_Id').textContent = `${btnLanguage[lang][0]}: `;
    document.querySelector('.addUserBtn').textContent = `${btnLanguage[lang][5]}`;
    document.querySelectorAll('.tables').forEach(item => item.remove());
    tableGenerator(saveDataArr);
}

const tableGenerator = (dataArr) => {
    headerCreator();

    const table = document.querySelector("#users-table");
    const tbody = elFactory("tbody", { class: 'tables' });
    table.appendChild(tbody)
    listCreator(dataArr);
}

const headerCreator = () => {
    const table = document.querySelector("#users-table");

    const thead = elFactory("thead", { class: 'tables' });
    table.appendChild(thead);
    const row = elFactory("tr", { id: 'x0' });

    headerLanguage[lang].forEach((item) => row.innerHTML += `<th>${item}</th>`)

    thead.appendChild(row);
}

const listCreator = (dataArr) => {
    const tbody = document.querySelector("tbody");
    
    dataArr.forEach((item) => {
        let row;
        let rowId;
        for (let key in item) {

            if (key == "id") {
                rowId = item[key]
                row = elFactory("tr", { readonly: "true", id: `${rowId}` });
            }

            let cell = elFactory("td", { value: `${item[key]}`, name: `${key}` });
            let cellText = document.createTextNode(item[key]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        let buttonGrup = btnGroupCreator(rowId);
        row.appendChild(buttonGrup);
        tbody.appendChild(row);
    })
}

const btnGroupCreator = (rowId) => {
    const editBtn = elFactory("button", { class: `btn btn-outline-info`, onclick: "rowEditingBtn(this)" }, `${btnLanguage[lang][1]}`);
    const deletBtn = elFactory("button", { class: "btn btn-outline-danger", onclick: "deleteBtn(this)" }, `${btnLanguage[lang][2]}`);
    const btnGroup = elFactory("div", { class: "btn-group" }, editBtn, deletBtn);
    return btnGroup
}


const rowEditingBtn = (event, id) => {
    let tr;
    let exceptionId;
    if (event) {
        tr = event.parentElement.parentElement;
        exceptionId = tr.getAttribute('id');
    } else if (id) {
        tr = document.querySelector(`[id='${id}']`)  //getElementById(id);
        exceptionId = id;
    }
    anyRowCloser(exceptionId, 'false');

    if (tr.getAttribute('readonly') === 'true') {
        const cells = tr.children

        for (let i = 1; i < 4; i++) {
            const value = cells[i].getAttribute('value');
            const name = cells[i].getAttribute('name');
            cells[i].textContent = ''
            cells[i].appendChild(elFactory('input', { class: "form-control", name: `${name}`, value: `${value}` }, `${value}`));
        }
        const cellAttributes = cells[4].getAttribute('value');
        rowEditingBtnCreator(cells)
    } else {
        console.log('hibaüzenet helye: "Először be kell fejezned az aktuális szerkesztést" ')
        dialogMassage += `${dialogMassageObj[lang].editing}
`
        dialog()
    }
}

const rowEditingBtnCreator = (cells) => {
    cells[4].children[0].removeAttribute('onclick')
    cells[4].children[0].setAttribute('onclick', "saveBtn(this)")
    cells[4].children[0].setAttribute('class', "btn btn-success")
    cells[4].children[0].textContent = `${btnLanguage[lang][3]}`

    cells[4].children[1].removeAttribute('onclick')
    cells[4].children[1].setAttribute('onclick', "cancelBtn(this)")
    cells[4].children[1].setAttribute('class', "btn btn-warning")
    cells[4].children[1].textContent = `${btnLanguage[lang][4]}`
}

const anyRowCloser = (exceptionId, condition = 'false') => {
    document.querySelectorAll('tr')
        .forEach(item => {
            if (item.getAttribute('id') != `${exceptionId}`) {
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
    
    dataSender(valuesArr, 'del')
}

const saveBtn = (event) => {
    const tr = event.parentElement.parentElement;
    const exceptionId = tr.getAttribute('id');

    if (tr.getAttribute('readonly') === 'true') {
        const cells = tr.children;
        let newValuesArr = [cells[0].getAttribute('value')];
        let oldValuesArr = [cells[0].getAttribute('value')];

        for (let i = 1; i < 4; i++) {
            const textValue = cells[i].children[0].value;
            const oldValue = cells[i].getAttribute('value');
            oldValuesArr.push(oldValue)
            newValuesArr.push(textValue);
            cells[i].children[0].remove();
            cells[i].textContent = textValue;
            cells[i].removeAttribute('value');
            cells[i].setAttribute('value', textValue);
        }
        editDeleteBtnCreator(cells);
        dataValidator(oldValuesArr, newValuesArr);

    }
    anyRowCloser(exceptionId, 'true');
}

const dataValidator = (oldValuesArr, newValuesArr) => {

    if (JSON.stringify(oldValuesArr) !== JSON.stringify(newValuesArr)) {

        for (let i = 1; i < newValuesArr.length; i++) {
            if (!validations[i].test(newValuesArr[i])) {
                dialogMassage += `${dialogMassageObj[lang].notValid}
                `
                dialog();
                break
            }
        }
        dialogMassage += `${dialogMassageObj[lang].dataSend}
        `
        dialog()
        dataSender(newValuesArr, 'set')

    } else {
        console.log(dialogMassageObj[lang].noModification)
        dialogMassage += `${dialogMassageObj[lang].noModification}
`
        dialog();
    }

}

const dataSender = (newValuesArr, fetchOption = 'set') => {
    console.log(newValuesArr)
    // headerLanguage.en = ['id', 'name', 'email', 'address', "function"],
    let senedingObj = {};
    for (let i = 0; i < headerLanguage.en.length - 1; i++) {
        senedingObj[headerLanguage.en[i]] = newValuesArr[i];
    }
    console.log(senedingObj);
    fetchOptions.set.body = JSON.stringify(senedingObj);
    console.log(fetchOptions.set.body)
    // küldés
    fetch(getServer(`http://localhost:3000/users/${senedingObj.id}`, fetchOptions[fetchOption])
        .then(
            (res) => dialog(res),  //res.json(),
            // (err) => console.error(err)
        ))
    //     .then((data) => getUsers(data));
    // activeRow = null;
}

const editDeleteBtnCreator = (cells) => {
    cells[4].children[0].removeAttribute('onclick');
    cells[4].children[0].setAttribute('onclick', "rowEditingBtn(this)");
    cells[4].children[0].setAttribute('class', "btn btn-outline-info")
    cells[4].children[0].textContent = `${btnLanguage[lang][1]}`;

    cells[4].children[1].removeAttribute('onclick')
    cells[4].children[1].setAttribute('onclick', "deleteBtn(this)")
    cells[4].children[1].setAttribute('class', "btn btn-outline-danger")
    cells[4].children[1].textContent = `${btnLanguage[lang][2]}`
}

const cancelBtn = (event) => {
    const tr = event.parentElement.parentElement;
    const exceptionId = tr.getAttribute('id');

    if (tr.getAttribute('readonly') === 'true') {
        const cells = tr.children

        for (let i = 1; i < 4; i++) {
            const originalData = cells[i].getAttribute('value');
            console.log(cells[i].getAttribute('value'));
            const textValue = cells[i].getAttribute('value');
            cells[i].children[0].remove();
            cells[i].textContent = textValue;
            cells[i].removeAttribute('value');
            cells[i].setAttribute('value', textValue);
        }
        anyRowCloser(exceptionId, 'true');
        editDeleteBtnCreator(cells)
    }
}


const dialog = () => {
    const x = document.querySelector('#myDialog')
    x.textContent = dialogMassage;
    x.show();
    setTimeout(() => {
        x.close()
        dialogMassage = ''
    }, 5000);
}

languageSelectorCreator();
getServer("http://localhost:3000/users", fetchOptions.get);

console.log("lefutott a kod!");

