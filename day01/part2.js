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
const test = fs.readFileSync('./test2.txt', 'utf-8');
const input = fs.readFileSync('./input.txt', 'utf-8');
const words = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
};
//Test Case
let testLines = parseInput(test);
let testResult = calculateSum(words, testLines);
//Live input
let lines = parseInput(input);
let result = calculateSum(words, lines);
function parseInput(str) {
    const lines = str.split(/\r?\n/);
    return lines;
}
function regexMatches(str, regex) {
    let matches = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
        let number = match[0];
        let position = match.index;
        if (match && (position || position === 0)) {
            //If non numeric value, use the words dictionary to find the proper value
            if (isNaN(Number(number))) {
                number = words[match[0]];
            }
            matches.push({ number, position });
        }
    }
    return matches;
}
//Build regex for finding string values e.g. 'one', 'two', 'three'
function buildStringRegex(words) {
    let keys = Object.keys(words).join('|');
    return RegExp(`(([0-9])|(${keys}))`, 'g');
}
function calculateSum(words, lines) {
    let regex = buildStringRegex(words);
    let total = 0;
    for (const line of lines) {
        let matches = regexMatches(line, regex);
        let firstIndex = Infinity;
        let lastIndex = 0;
        let firstDigit = '';
        let lastDigit = '';
        for (const match of matches) {
            if (match.position < firstIndex) {
                firstIndex = match.position;
                firstDigit = match.number;
            }
            if (match.position > lastIndex) {
                lastIndex = match.position;
                lastDigit = match.number;
            }
        }
        //Account for only one number in string
        if (!lastDigit)
            lastDigit = firstDigit;
        total += parseInt(`${firstDigit}${lastDigit}`);
    }
    return total;
}
console.log(testResult === 281 ? 'Test Case Passed' : 'Test Case Failed');
console.log({ result });
