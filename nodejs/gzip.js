const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./big.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./readme4.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);