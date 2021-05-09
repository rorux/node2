const path = require("path");
const fs = require("fs");
const http = require('http');

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();

const pathName = 'D:\\GeekBrains\\';

http.createServer((request, response) => {
    const method = request.method.toLowerCase();

    if(method === 'post') {
        let data = '';
        request.on('data', chunk => {
            data += chunk;
        });
        request.on('end', () => {
            const pathName = data.replace(/\%5C/g, '\\').replace(/\%3A/g, ':').replace(/dir=/g, '');

            if(isFile(pathName)) {
                console.log(`Выбран файл ${pathName}`);
                const readStream = fs.createReadStream(pathName, 'utf8');  
                let data = ''
                readStream.on('data', (chunk) => {
                    data += chunk;
                });
        
                readStream.on('end', () => {
                    console.log(`Файл ${pathName} прочитан`);
                    response.setHeader('Content-Type', 'text/html');
                    response.setHeader('Content-Type', 'charset utf-8');
                    response.write(`<h1>Reading of file ${pathName}</h1>`);
                    response.end(`<p>${data}</p>`);
                });
                readStream.on('error', () => console.log(err));
            }
            else {
                const list = fs.readdirSync(pathName);
                response.setHeader('Content-Type', 'text/html');
                response.setHeader('Content-Type', 'charset utf-8');
                response.write(`<h1>Catalogs and files in ${pathName}</h1>`);
                response.write(`<form method="POST">`);
                response.write(`<select name="dir">`);
                list.forEach(dir => response.write(`<option value="${pathName}${dir}\\">${dir}</option></li>`));
                response.write(`</select>`);
                response.write(`<p><input type="submit" value="SEND"></p>`);
                response.end(`</form>`);
            }
        });
    }
    else {
        const list = fs.readdirSync(pathName);
        response.setHeader('Content-Type', 'text/html');
        response.setHeader('Content-Type', 'charset utf-8');
        response.write(`<h1>Catalogs and files in ${pathName}</h1>`);
        response.write(`<form method="POST">`);
        response.write(`<select name="dir">`);
        list.forEach(dir => response.write(`<option value="${pathName}${dir}\\">${dir}</option></li>`));
        response.write(`</select>`);
        response.write(`<p><input type="submit" value="SEND"></p>`);
        response.end(`</form>`);
    }

    }).listen(3000, 'localhost');
