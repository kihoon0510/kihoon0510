// const{ odd, even} = require('./var');
// /**
//  * 인수가 홀수인지 짝수인지 반환하는 함수
//  * 
//  * @param {Number} num 
//  * @returns  '홀수' or '짝수'
//  */
// function checkOddOrEven(num){
//     if(num %2 ){
//         return odd;
//     }
//     return even;
// }

// module.exports = checkOddOrEven;

import {odd, even} from './var.mjs';

/**
 * 인수가 홀수인지 짝수인지 반환하는 함수
 * 
 * @param {Number} num 
 * @returns  '홀수' or '짝수'
 */
export default function checkOddOrEven(num){
    if(num %2 ){
        return odd;
    }
    return even;
}