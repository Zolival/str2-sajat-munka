// 'use strict';

let shortedDataContainer = undefined;

const getHeroes = async (url = './json/got.json') => {
    try {
        const response = await fetch(url);
        const dataArr = await response.json();
        const livingHeros = livingFilter(dataArr)
        const shortedData = sortedByHeroesName(livingHeros)
        elementFactorys(shortedData);
        addEvents();
        shortedDataContainer = shortedData;
        return shortedData
    } catch (err) {
        console.error(`Error! Massage: ${err} ; sourse: ${url}`)
    }
}
const getInputValue = () => {
    const inputField = document.querySelector('.search__input');
    searchHeroes(shortedDataContainer, inputField.value);
}

const searchHeroes = (shortedDataContainer, name) => {
    const image = document.querySelector('.hero__Img');
    const heroesName = document.querySelector('.hero_name');
    const hauseArms = document.querySelector('.house_coat_of_arms__img');
    const description = document.querySelector('.short_description');
    const lowerCaseName = name.toLowerCase();

    if (shortedDataContainer) {
        shortedDataContainer.forEach((item) => {
            if (item.name.toLowerCase() == lowerCaseName) {
                image.setAttribute('src', `./${item.picture}`);
                console.log(item.name)
                heroesName.textContent = item.name;
                description.textContent = item.bio;
                console.log(`./assets/houses/${item.house}.png`);
                console.log(typeof item.house);
                if (item.house != undefined) {
                    hauseArms.setAttribute('src', `./assets/houses/${item.house}.png`);
                }
            }
        })
    } else {
        description.textContent = `Heroes don't have data! Try again ... `
        console.error(`dont have data! `);
    }
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
        const img = elFactory('img', {
            src: `.\/${item.portrait}`,
            class: 'images'
        });
        const p = elFactory('p', {
            class: 'heroes_names'
        }, item.name);
        const div = elFactory('div', {
            class: 'divs'
        }, img, p);
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


const addClickEvents = (e) => {
    const heroesName = e.target.parentNode.children[1].textContent;
    searchHeroes(shortedDataContainer, heroesName);
}

const addEvents = () => {
    document.querySelectorAll('.divs')
        .forEach((item) => item.addEventListener(`click`, addClickEvents));
};


getHeroes();