"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const test = fs.readFileSync('./test.txt', 'utf-8');
const input = fs.readFileSync('./input.txt', 'utf-8');
let lines = parseInput(input);
let result = calculateSum(lines);
function parseInput(str) {
    const lines = str.split(/\r?\n/);
    return lines;
}
function calculateSum(lines) {
    let total = 0;
    for (const line of lines) {
        //Get array of only numbers
        const digitArray = line.split(/\D/);
        //Remove all empty strings
        const numbers = digitArray.filter(function (e) { return e; });
        //Use extra [0] to get first character of a multi character string
        const firstDigit = numbers[0][0];
        //Get final character of the last element
        const lastDigit = numbers[numbers.length - 1][numbers[numbers.length - 1].length - 1];
        const number = `${firstDigit}${lastDigit}`;
        total += parseInt(number);
    }
    return total;
}
//console.log(result === 142 ? 'Passed' : 'Failed');
console.log({ result });
