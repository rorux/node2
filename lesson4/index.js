const yargs = require("yargs");
const path = require("path");
const fs = require("fs");
const readline = require("readline");
const inquirer = require("inquirer");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
};

async function readLine(str) {
    return new Promise(resolve => {
        rl.question(str, answer => { resolve(answer); });
    });
}

const goToDir = pathName => {
    const list = fs.readdirSync(pathName);
    inquirer
    .prompt([{
            name: "fileDirName",
            type: "list",
            message: "Выберите файл или директорию:",
            choices: list,
        }])
    .then((answer) => {
        const fileDirPath = path.join(pathName, answer.fileDirName);

        if(isFile(fileDirPath)) {
            console.log(`Выбран файл ${fileDirPath}`);

            (async function readSelectedFile() {
                //let fn = await readLine("Введите строку для поиска внутри файла: ");
                let fn = 'kd';
                
                const readStream = fs.createReadStream(fileDirPath, 'utf8');
                
                readStream.on('data', (chunk) => {
                    let pattern = new RegExp('(.*?' + fn + '.*?[\n|\r])|(.*?' + fn + '.*?$)', 'g');
                    let findStr = chunk.match(pattern);
                    if(findStr) {
                        console.log(findStr);
                    }
                });

                readStream.on('end', () => {
                    console.log(`Файл ${fileDirPath} прочитан`);
                });
                readStream.on('error', () => console.log(err));
            })();
        }
        else {
            console.log(`Выбрана директория ${fileDirPath}`);
            return goToDir(fileDirPath); // рекурсия, если заходим в подкаталог
        }
    });
};

rl.question('Введите путь к директории (например, "D:\\GeekBrains\\") ', function(inputedPath) { 
    goToDir(inputedPath);
});

rl.on("close", function() {
    process.exit(0);
});