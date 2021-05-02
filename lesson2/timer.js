const EventEmitter = require('events');

const secIn = +process.argv[2]; // получаем количество секунд
const minIn = +process.argv[3]; // получаем количество минут
const ourIn = +process.argv[4]; // получаем количество часов

const timer = {
    secTosec: secIn,
    minTosec: minIn * 60,
    ourTosec: ourIn * 3600
}

const newTimer = () => {
    (timer.secTosec > 1) ? --timer.secTosec : timer.secTosec = 'Таймер СЕК (секунды) истек';
    (timer.minTosec > 1) ? --timer.minTosec : timer.minTosec = 'Таймер МИН (минуты) истек';
    (timer.ourTosec > 1) ? --timer.ourTosec : timer.ourTosec = 'Таймер ЧАС (часы) истек';
}

const delay = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
};

const generateTimer = () => {  
    return delay().then(() => newTimer());
}

const renderTimer = () => {  
    console.log(`${timer.secTosec} - ${timer.minTosec} - ${timer.ourTosec}`)
}

class MyEmitter extends EventEmitter {};

const emitterObject = new MyEmitter();

emitterObject.on('oneSecPassed', renderTimer);

const run = async () => {
    await generateTimer();
    emitterObject.emit('oneSecPassed');
  
    run();
};

renderTimer();

run();