

import Vizzu from "https://vizzuhq.github.io/vizzu-beta-release/0.2.0/vizzu.js";

window.addEventListener("load", function (e) {
    initSpshSettings();
});

const attachIds = ['descriptor.channels.x.attach', 'descriptor.channels.y.attach', 'descriptor.channels.color.attach', 'descriptor.channels.lightness.attach', 'descriptor.channels.size.attach', 'descriptor.channels.label.attach']
const detachIds = ['descriptor.channels.x.detach', 'descriptor.channels.y.detach', 'descriptor.channels.color.detach', 'descriptor.channels.lightness.detach', 'descriptor.channels.size.detach', 'descriptor.channels.label.detach']

let rowsInDataNameObj;
let colsInDataNameObje;
let attachArr = [];
let detachArr = [];

function allEventListeners(selector) {
    let elements = document.querySelectorAll(selector);
    let temp = "";
    for (let i = 0; i < elements.length; i++) {

        elements[i].addEventListener('focus', (ev) => {
            ev.target.style.background = 'pink';
            console.log(["focus.getAttribute() =", ev.target.getAttribute("id")]);

            temp = ev.target.value;

            ev.target.value = '';
        });

        elements[i].addEventListener('blur', (ev) => {
                console.log(["blur =", ev.target.value]);
                ev.target.style.background = '';

                if (ev.target.getAttribute("list") != null) {

                    if (ev.target.value == '') {
                        ev.target.value = temp;
                    }
                    if (ev.target.value == " ") {
                        ev.target.value = "";
                    }
                    temp = '';
                }
            })
        }
    }

    function nameValuesInserter (ev){
        let textValues = '';
        
        let eVal = ev.target.value
        if (ev.target.getAttribute("list") == "name") {
            for (let i = 0; i < rowsInDataNameObj[eVal].length; i++) {
                textValues += rowsInDataNameObj[eVal][i] + ' ';
            }
            console.log(["name klick = ", vizzData.series[0].values]);
            ev.target.parentElement.parentElement.parentElement.parentElement.lastElementChild.lastElementChild.querySelector(".input").value = textValues;
            textValues = '';
            
            attachDetach(ev)
        }
    }
    
    function attachDetach(ev) {
        let listName = ev.target.getAttribute('list');
        let eVal = ev.target.value
        if (listName == 'descriptor.channels.x.attach' || 'descriptor.channels.y.attach' || 'descriptor.channels.color.attach' || 'descriptor.channels.lightness.attach' || 'descriptor.channels.size.attach' || 'descriptor.channels.label.attach') {
            console.log(['LIST attach = ', ev.target.getAttribute('list'), ev.target.value])
            let evTargetValue = true;
            attachArr.forEach((name) => {
                if (name == eVal) {
                  console.log(['evTargetValue = ', 'false'])
                  evTargetValue = false;
                }
            });
            if (evTargetValue == true) {
                console.log(['evTargetValue = ', 'true'])
                attachArr.push(eVal);
                datalistInserter(attachIds, attachArr);
            }
            console.log("attachArr = ", attachArr);
        } else

        if (listName == 'descriptor.channels.x.detach' || 'descriptor.channels.y.detach' || 'descriptor.channels.color.detach' || 'descriptor.channels.lightness.detach' || 'descriptor.channels.size.detach' || 'descriptor.channels.label.detach') {
            console.log(['LIST detach = ', ev.target.getAttribute('list'), ev.target.value])
        }
    }
        function listInputId() {
            let input = document.querySelectorAll("input[data-path$=detach]");
            console.log(['input = ', input]);
            input.forEach((val) => {
                console.log(["input dettach getAttribute('list') = ", val.getAttribute('list')])
            })
        }

        function datalistInserter(idsArr, valuesArr) {
            let options = '';
            idsArr.forEach((id) => {
                if (id) {
                    clearChildren(id);
                    let datalist = document.getElementById('id');
                    valuesArr.forEach(item => {
                        if (item) {
                            options += '<option value="' + item + '" >';
                        }
                        document.getElementById(id).innerHTML = options;
                    });
                }
            })
        }

        function clearChildren(parent_id) {
            const parent = document.getElementById(parent_id);
            let childArray = parent.children;
            let cL = childArray.length;
            while (cL > 0) {
                cL--;
                parent.removeChild(childArray[cL]);
            }
        }

        function isObject(value) {
            return value && typeof value === "object" && value.constructor === Object;
        }

        function isArray(value) {
            return value && typeof value === 'object' && value.constructor === Array;
        }

        function nestedLoop(obj, parent) {
            const path = [];
            let pathCurrent = "";
            let elems = [parent];

            function recurse(obj) {
                for (const key in obj) {
                    if (isObject(obj[key])) {
                        path.push(key);
                        elems.push(elems[elems.length - 1].appendChild(elFactory('li', {}, elFactory('span', {
                            class: "caret"
                        }, key))));
                        elems.push(elems[elems.length - 1].appendChild(elFactory('ul', {
                            class: "nested"
                        }, )));
                        recurse(obj[key], key);
                    } else {
                        path.push(key);
                        pathCurrent = path.join(".");
                        elems.push(elems[elems.length - 1].appendChild(elFactory('li', {})));
                        elems[elems.length - 1].appendChild(elFactory('span', {
                            class: "label"
                        }, key))

                        if (isArray(obj[key])) {
                            elems.push(elems[elems.length - 1].appendChild(elFactory('datalist', {
                                id: pathCurrent
                            })));
                            for (const e of obj[key]) {
                                elems[elems.length - 1].appendChild(elFactory('option', {
                                    value: e
                                }));
                            }
                            elems.pop();
                            elems[elems.length - 1].appendChild(elFactory('span', {}, elFactory('input', {
                                /*value:obj[key][0],*/
                                class: "input",
                                list: pathCurrent,
                                'data-path': pathCurrent
                            })));
                        } else {
                            elems[elems.length - 1].appendChild(elFactory('span', {}, elFactory('input', {
                                class: "input",
                                value: obj[key],
                                'data-path': pathCurrent
                            })));
                        }

                        //console.log(path.join("."), obj[key]);
                        path.pop();
                        elems.pop();
                    }
                }
                path.pop();
                elems.pop();
                elems.pop();
            }
            recurse(obj);
        }

        function elFactory(type, attributes, ...children) {
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

        function initSpshSettings() {
            buildSprshtAddress();
            let btn2 = document.querySelector('#mySpsht').appendChild(elFactory('input', {
                type: "button",
                value: 'Loaded'
            }));
            btn2.onclick = function () {
                getSprshtAddress('#mySpsht', 'div.series')
            };
        }


        function buildSprshtAddress() {
            const vDataPnl = document.querySelector('#mySpsht');
            let series = vDataPnl.appendChild(elFactory('div', {
                class: "series"
            }));
            let elem = series.appendChild(elFactory('ul', {}));
            nestedLoop(sphtAddress, elem);
            allEventListeners('.input');
        }

        function getSprshtAddress(divId, dataDivClass) {
            const vDataPnl = document.querySelector(divId);
            let dataDivs = vDataPnl.querySelectorAll(dataDivClass);

            dataDivs.forEach(function (d) {
                let obj = {};
                let dataInputs = d.querySelectorAll('input');

                dataInputs.forEach(function (i) {
                    if (i.dataset.path == "values") {
                        obj[i.dataset.path] = i.value.split(' ');
                    } else {
                        obj[i.dataset.path] = i.value;
                    }
                })
                if (obj.type == 'values') {
                    let arr = obj.values.map(e => Number(e));
                    obj.values = arr;
                }
                console.log(['getSprshtAddress = ', obj])

                let spShObj = {
                    spreadsheetUrl: "https://docs.google.com/spreadsheets/d/1uA3zk4SsUcRrHZgNuR7MVJWePb91eAtvF7FdjxGngnA/edit?usp=sharing",
                    sheetName: "Data",
                    headerNameOrientation: 'rows',
                    headerRowColNumber: 1,
                    dataRangeStartEnd: "B1:H4",
                }
                console.log(["spShObj.shName", spShObj.sheetName]);
                getGoogleServer(spShObj.spreadsheetUrl, spShObj.sheetName);

            });

        }



        function getGoogleServer(spShUrl, shName) {
            google.script.run.withSuccessHandler(getDataObjects).getDataFromSheet(spShUrl, shName);
            console.log("getGoogleServer() started");
        }


        function getDataObjects(d) {
            rowsInDataNameObj = d[0];
            colsInDataNameObje = d[1];
            let obj = d[2];
            let names = Object.keys(rowsInDataNameObj)
            vizzData.series[0].name = names;

            initVizzSettings();
        }






        function initVizzSettings() {
            console.log(['rowsInDataNameObj = ', rowsInDataNameObj]);

            let btn2 = document.querySelector('#mySpsht').lastElementChild;
            btn2.onclick = function () {
                console.log("funkcio valtoztatas")
            }
            btn2.setAttribute("value", "New sprsht load");

            let btn = document.querySelector('#handle').appendChild(elFactory('input', {
                type: "button",
                value: 'Start'
            }));
            btn.onclick = function () {
                getVizzData()
            };
            buildVizzData();
            buildVizzSettings();
            let btnAddData = document.querySelector('#vDataPnlMain').appendChild(elFactory('input', {
                type: "button",
                value: 'AddData'
            }));
            btnAddData.onclick = function () {
                buildVizzData()
            };
            let btnAddSettings = document.querySelector('#vSettingsPnlMain').appendChild(elFactory('input', {
                type: "button",
                value: 'AddSettings'
            }));
            btnAddSettings.onclick = function () {
                buildVizzSettings()
            };
        }

        function buildVizzData() {
            const vDataPnl = document.querySelector('#vDataPnl');
            let series = vDataPnl.appendChild(elFactory('div', {
                class: "series"
            }));
            let elem = series.appendChild(elFactory('ul', {}));
            nestedLoop(vizzData.series[0], elem);
            allEventListeners('.input');
        }

        function buildVizzSettings() {
            const vSettingsPnl = document.querySelector('#vSettingsPnl');
            let animStep = vSettingsPnl.appendChild(elFactory('div', {
                class: "animStep"
            }));
            let elem = animStep.appendChild(elFactory('ul', {}, 'settings'));
            nestedLoop(vizzObj, elem);

            let divs = vSettingsPnl.querySelectorAll('div.animStep');
            let toggler = divs[divs.length - 1].getElementsByClassName('caret');
            //let toggler = vSettingsPnl.lastElementChild.getElementsByClassName('caret');
            // let toggler = document.getElementsByClassName("caret");

            for (let i = 0; i < toggler.length; i++) {
                toggler[i].addEventListener("click", function () {
                    this.parentElement.querySelector(".nested").classList.toggle("active");
                    this.classList.toggle("caret-down");
                });
            }
            allEventListeners('.input');
        }



        function getVizzData() {
            let anims = [];
            let data = {
                series: []
            };

            const vDataPnl = document.querySelector('#vDataPnl');
            let dataDivs = vDataPnl.querySelectorAll('div.series');
            const vSettingsPnl = document.querySelector('#vSettingsPnl');
            let settingsDivs = vSettingsPnl.querySelectorAll('div.animStep');

            dataDivs.forEach(function (d) {
                let obj = {};
                let dataInputs = d.querySelectorAll('input');

                dataInputs.forEach(function (i) {
                    if (i.dataset.path == "values") {
                        obj[i.dataset.path] = i.value.split(' ');
                    } else {
                        obj[i.dataset.path] = i.value;
                    }
                })
                if (obj.type == 'values') {
                    let arr = obj.values.map(e => Number(e));
                    obj.values = arr;
                }
                data.series.push(obj);
            });

            settingsDivs.forEach(function (d, i) {
                let obj = {};
                let settingsInputs = d.querySelectorAll('input');

                settingsInputs.forEach(function (i) {
                    let pathArr = i.dataset.path.split('.');

                    if (i.value && (i.value != getNestedObject(vizzObj, pathArr))) {
                        setNestedObject(obj, pathArr, i.value);
                        //obj[i.dataset.path] = i.value;   
                    }
                })
                if (i == 0) obj["data"] = data;
                anims.push(obj);
            });

            console.log(data);
            console.log(anims);

            prepVizzu(anims);
        }

        function getNestedObject(nestedObj, pathArr) {
            return pathArr.reduce((obj, key) =>
                (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
        }

        function setNestedObject(nestedObj, pathArr, value) {
            let key = pathArr.pop();
            let pointer = pathArr.reduce((a, c) => {
                if (a[c] === undefined) a[c] = {};
                return a[c];
            }, nestedObj);
            pointer[key] = value;
            return nestedObj;
        }

        function prepVizzu(a) {
            let anims = a;
            let vizzuDiv = document.querySelector('#myVizzu');
            let canvas = vizzuDiv.querySelector('canvas');
            if (canvas) canvas.remove();

            function onVizzuInitialized() {
                const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

                async function startVizzu() {
                    for (let i = 0; i < anims.length; i++) {
                        await chart.animate(anims[i]);
                        await wait(1 * 2000); /*  TODO - GET THIS PARAMETER FROM PREBUILT DATASET  */
                    }
                }

                startVizzu().catch((err) => {
                    console.log(err);
                });
            }

            let chart = new Vizzu("myVizzu", onVizzuInitialized);
        }