const grid = document.getElementById('container');
const btn = document.querySelector('button');
const length = document.getElementById('counter');
const sHead = document.getElementById('snake-head');
let sBody = [sHead];
let prvPos = [];
let intervalID;
let up = false;
let right = false;
let down = false;
let left = false;
let food = null;
let lvl = 300;

window.onload = () => {
    const columns = [...Array(16).keys()]
    const rows = [...Array(16).keys()]
    rows.forEach((rNum) => {
        const num = rNum + 1;
        columns.forEach((cNum) => {
            cNum += 97;
            const letter = String.fromCharCode(cNum);
            const box = document.createElement('div');
            box.className = 'grid-boxes';
            box.id = letter + num;
            grid.appendChild(box);
        })
    })
}

const init = () => {
    spawnFood()
    const spawn = document.getElementById('d6');
    length.classList.remove('hideO');
    spawn.appendChild(sHead);
    sHead.classList.remove('hide');  
    sHead.classList.add('pink')  
    right = true;
    timeInc();
}

const timeInc = () => {
    clearInterval(intervalID);
    if(lvl >= 130){
        lvl -= 10;
        intervalID = setInterval(move, lvl);
    } else {
        intervalID = setInterval(move, lvl);
    }
}

const spawnFood = () => {
    const foodItem = document.createElement('div');
    food = foodItem;
    const randomColour = () => {
        let num = Math.floor((Math.random() * 6) + 1);
        if(num === 1){foodItem.classList.add('red')}
        else if(num === 2){foodItem.classList.add('blue')}
        else if(num === 3){foodItem.classList.add('green')}
        else if(num === 4){foodItem.classList.add('purple')}
        else if(num === 5){foodItem.classList.add('orange')}
        else {foodItem.classList.add('aqua')}
    }
    foodItem.classList.add('snake');
    randomColour()
    let idNum = Math.floor((Math.random() * 16) + 1)
    let idLetter = String.fromCharCode(Math.floor((Math.random() * 16) + 97))
    let id = idLetter + idNum;
    if(sBody.find(el => el.parentElement === id)){
        spawnFood();
    } else {
        document.getElementById(id).appendChild(foodItem);
    }
}

const move = () => {
    let sHeadCurrId = sHead.parentElement.id;
    let idNum = Number(sHeadCurrId.substring(1));
    let idLetter = sHeadCurrId.substring(0, 1);

    if (right === true){
        let newId = String.fromCharCode(idLetter.charCodeAt(0) + 1) + idNum;
        let newCurr = document.getElementById(newId);
        if(newId.charCodeAt(0) >= 113 || sBody.find(el => el.parentElement === newCurr)){
            clearInterval(intervalID);
            grid.style.border = 'red solid 3px';
            return;
        }
        newCurr.appendChild(sHead);
        if (sHead.parentElement === food.parentElement){
            food.parentElement.removeChild(food);
            sBody.push(food);
            timeInc();
            length.innerText = `Length: ${sBody.length}`;
            if(sBody.indexOf(food) === 1){
                setTimeout(() => {
                    prvPos[sBody.indexOf(food) - 1] = sBody[sBody.indexOf(food) - 1].parentElement.id;
                    spawnFood();
                }, 200)
            } else {
                prvPos[sBody.indexOf(food) - 1] = sBody[sBody.indexOf(food) - 1].parentElement.id;
                spawnFood();
            }
        } 
        sBody.forEach((el) => {
            if(sBody.indexOf(el) !== 0){
                document.getElementById(prvPos[sBody.indexOf(el) - 1])?.appendChild(el);
                prvPos[sBody.indexOf(el) - 1] = sBody[sBody.indexOf(el) - 1].parentElement.id;
            }
        })
    } else if (down === true){     
        let newId = idLetter + (idNum + 1);
        let newCurr = document.getElementById(newId);
        if(newId.substring(1) >= 17 || sBody.find(el => el.parentElement === newCurr)){
            clearInterval(intervalID);
            grid.style.border = 'red solid 3px';
            return;
        }
        newCurr.appendChild(sHead);
        if (sHead.parentElement === food.parentElement){
            food.parentElement.removeChild(food);
            sBody.push(food);
            timeInc();
            length.innerText = `Length: ${sBody.length}`;
            if(sBody.indexOf(food) === 1){
                setTimeout(() => {
                    prvPos[sBody.indexOf(food) - 1] = sBody[sBody.indexOf(food) - 1].parentElement.id;
                    spawnFood();
                }, 200)
            } else {
                prvPos[sBody.indexOf(food) - 1] = sBody[sBody.indexOf(food) - 1].parentElement.id;
                spawnFood();
            }
        } 
        sBody.forEach((el) => {
            if(sBody.indexOf(el) !== 0){
                document.getElementById(prvPos[sBody.indexOf(el) - 1])?.appendChild(el);
                prvPos[sBody.indexOf(el) - 1] = sBody[sBody.indexOf(el) - 1].parentElement.id;
            }
        })
    } else if (left === true){
        let newId = String.fromCharCode(idLetter.charCodeAt(0) - 1) + idNum;
        let newCurr = document.getElementById(newId);
        if(newId.charCodeAt(0) <= 96 || sBody.find(el => el.parentElement === newCurr)){
            clearInterval(intervalID);
            grid.style.border = 'red solid 3px';
            return;
        }
        newCurr.appendChild(sHead);
        if (sHead.parentElement === food.parentElement){
            food.parentElement.removeChild(food);
            sBody.push(food);
            timeInc();
            length.innerText = `Length: ${sBody.length}`;
            if(sBody.indexOf(food) === 1){
                setTimeout(() => {
                    prvPos[sBody.indexOf(food) - 1] = sBody[sBody.indexOf(food) - 1].parentElement.id;
                    spawnFood();
                }, 200)
            } else {
                prvPos[sBody.indexOf(food) - 1] = sBody[sBody.indexOf(food) - 1].parentElement.id;
                spawnFood();
            }
        } 
        sBody.forEach((el) => {
            if(sBody.indexOf(el) !== 0){
                document.getElementById(prvPos[sBody.indexOf(el) - 1])?.appendChild(el);
                prvPos[sBody.indexOf(el) - 1] = sBody[sBody.indexOf(el) - 1].parentElement.id;
            }
        })
    } else if (up === true){     
        let newId = idLetter + (idNum - 1);
        let newCurr = document.getElementById(newId);
        if(newId.substring(1) <= 0 || sBody.find(el => el.parentElement === newCurr)){
            clearInterval(intervalID);
            grid.style.border = 'red solid 3px';
            return;
        }
        newCurr.appendChild(sHead);
        if (sHead.parentElement === food.parentElement){
            food.parentElement.removeChild(food);
            sBody.push(food);
            timeInc();
            length.innerText = `Length: ${sBody.length}`;
            if(sBody.indexOf(food) === 1){
                setTimeout(() => {
                    prvPos[sBody.indexOf(food) - 1] = sBody[sBody.indexOf(food) - 1].parentElement.id;
                    spawnFood();
                }, 200)
            } else {
                prvPos[sBody.indexOf(food) - 1] = sBody[sBody.indexOf(food) - 1].parentElement.id;
                spawnFood();
            }
        } 
        sBody.forEach((el) => {
            if(sBody.indexOf(el) !== 0){
                document.getElementById(prvPos[sBody.indexOf(el) - 1])?.appendChild(el);
                prvPos[sBody.indexOf(el) - 1] = sBody[sBody.indexOf(el) - 1].parentElement.id;
            }
        })
    }
}

btn.addEventListener('click', () => {
    if(!sHead.classList.contains('hide')){
        sBody.forEach((el) => {
            el.remove()
        })
        sHead.classList.add('hide');
        length.innerText = `Length: 1`;
        food?.remove()
        sBody = [sHead];
        prvPos = [];
        up = false;
        right = false;
        down = false;
        left = false;
        food = null;
        lvl = 300;
        grid.style.border = 'rgb(203, 203, 203) solid 3px';
    } 
    init()
});
document.body.addEventListener('keydown', (e) => {
    if(left === true){
        return;
    } else if(e.key === 'ArrowRight'){
        down = false;
        up = false;
        right = true;
    }
})
document.body.addEventListener('keydown', (e) => {
    if(up === true){
        return;
    } else if(e.key === 'ArrowDown'){
        left = false;
        right = false;
        down = true;
    }
})
document.body.addEventListener('keydown', (e) => {
    if(right === true){
        return;
    } else if(e.key === 'ArrowLeft'){
        up = false;
        down = false;
        left = true;
    }
})
document.body.addEventListener('keydown', (e) => {
    if(down === true){
        return;
    } else if(e.key === 'ArrowUp'){
        right = false;
        left = false;
        up = true;
    }
})