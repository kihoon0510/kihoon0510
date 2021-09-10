// const {odd,even} = require('./var');
// const checkNum = require('./func');

import {odd as hi, even } from './var.mjs';
import checkNum from './func.mjs';


/**
 * 입력받은 문자열의 길이가 짝수인지 홀수인지 판단하는 함수.
 * @param {String} str 길이가 홀수인지 짝수인지 판별을 원하는 문자열
 * @return '홀수' or '짝수'
 */
function checkStringOddOrEven(str){
    if(str.length % 2){
        return hi;
    }
    return even;
}

console.log(checkNum(10));
console.log(checkStringOddOrEven('hello'));