// 'use strict';

const getHeroes = async (url = './json/got.json') => {
    try {
        const response = await fetch(url);
        const dataArr = await response.json();
        const livingHeros = livingFilter(dataArr)
        const shortedData = sortedByHeroesName(livingHeros)
        elementFactorys(shortedData);
        addEvents();
        // searchEvents(shortedData);
        return livingHeros
    } catch (err) {
        console.error(`Error! Massage: ${err} ; sourse: ${url}`)
    }

}
const searchHeroes = (arr, name) => {
    const image = document.querySelector('.heroes__Img');
    const heroesName = document.querySelector('.heroes-name');
    const hauseArms = document.querySelector('.house_coat_of_arms__img');
    const description = document.querySelector('.short_description');
    arr.forEach((item) => {
        if (item.hasOwnProperty(name) == name) {
            image.setAttribute('src', `./${item.portrait}`);
            heroesName.textContent = item.name;
            hauseArms.setAttribute('src', `./${item.portrait}`);
            description.textContent = item.bio;
        }
    })
}

const sortedByHeroesName = (arr = [{}]) => {
    arr.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();

        if (aName > bName) {
            return 1;
        } else if (aName < bName) {
            return -1;
        } else {
            return 0;
        }
    });
    return arr
}

const livingFilter = (arr = [{}]) => (
    arr.filter(item => item.hasOwnProperty('name') && item.hasOwnProperty('picture') && !item.hasOwnProperty('dead'))
)

const elementFactorys = (arr = [{}]) => {
    const main = document.querySelector('.main-container');

    arr.forEach(item => {
        const img = elFactory('img', { src: `.\/${item.portrait}`, class: 'images' });
        const p = elFactory('p', { class: 'heroes_names' }, item.name);
        const div = elFactory('div', { class: 'divs' }, img, p);
        main.appendChild(div);
    });
}

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

// kialakítás alatt:
const addClickEvents = (e) => {

    console.log('event activate', e.target);
    console.log(e.target.getAttribute('src'));
    console.log('event activate', e.target.getAttribute('heroes_names'));
}

const addEvents = () => {
    document.querySelectorAll('.heroes_names')
        .forEach((item) => item.addEventListener(`click`, addClickEvents));
};


/*
const searchEvents = () => {
    
}
const clickEvent = () => (item, div)
*/
console.log('heroes() = ', getHeroes());
console.log('code end');