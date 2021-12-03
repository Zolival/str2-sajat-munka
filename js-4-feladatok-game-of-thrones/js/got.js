// 'use strict';

const heroes = async (url = './json/got.json') => {
    try {
        const response = await fetch(url);
        const dataArr = await response.json();
        const shortedData = sortedByHeroesName(dataArr)
        return shortedData
    } catch (err) {
        error.log(`Error! Massage: ${err} ; sourse: ${url}`)
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

console.log('heroes() = ', heroes());
console.log('code end');