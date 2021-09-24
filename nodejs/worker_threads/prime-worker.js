const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');

const min = 2;
let prime = [];

function findPrimes(start, range){
    let isPrime = true;
    let end = start + range;
    
}