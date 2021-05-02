const colors = require('colors');
const numBegin = +process.argv[2]; // получаем первое число
const numEnd = +process.argv[3]; // получаем второе число
const primeNumArr = []; // массив для простых чисел
let color = 'green'; // флаг цвета

if(isNaN(numBegin) || isNaN(numEnd)) {
    console.log('Введите параметрами положительные целые числа!');
    return;
}

for(let a = numBegin; a <= numEnd; a++) {
    let flag = true;
    for(let i = 2; i < a; i++) {
        if(a % i == 0) {
            flag = false;
            break;
        }
    }
    if(flag) {
        primeNumArr.push(String(a));
    }
}

if(!primeNumArr.length) {
    console.log(`В диапазоне от ${numBegin} до ${numEnd} нет простых чисел!`.red);
    return;
}

for(elem of primeNumArr) {
    switch(color) {
        case 'green':
            console.log(elem.green);
            color = 'yellow';
            break;
        case 'yellow':
            console.log(elem.yellow);
            color = 'red';
            break;
        case 'red':
            console.log(elem.red);
            color = 'green';
            break;
    }
}