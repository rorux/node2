const fs = require('fs');

const readStream = fs.createReadStream('./access.log', 'utf8');
const ipFirstLog = fs.createWriteStream('./89.123.1.41_requests.log',  { flags: 'a', encoding: 'utf8' });
const ipSecondLog = fs.createWriteStream('./34.48.240.111_requests.log',  { flags: 'a', encoding: 'utf8' });

readStream.on('data', (chunk) => {
    let ipFirst = chunk.match(/(89\.123\.1\.41.+?)[\n|\r]/);
    let ipSecond = chunk.match(/(34\.48\.240\.111.+?)[\n|\r]/);

    if(ipFirst) {
        ipFirstLog.write(ipFirst[1]);
        ipFirstLog.write('\n');
    }

    if(ipSecond) {
        ipSecondLog.write(ipSecond[1]);
        ipSecondLog.write('\n');
    }
});

readStream.on('end', () => {
    console.log('Файл access.log прочитан');
    ipFirstLog.end(() => console.log('Логирование первого IP завершено'));
    ipSecondLog.end(() => console.log('Логирование второго IP завершено'));
});
readStream.on('error', () => console.log(err));