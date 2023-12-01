import * as fs from 'fs';
const test = fs.readFileSync('./test.txt', 'utf-8');
const input = fs.readFileSync('./input.txt', 'utf-8');

let lines = parseInput(input);
let result = calculateSum(lines);

function parseInput(str:string) {
    const lines = str.split(/\r?\n/);
    return lines;
}

function calculateSum(lines:string[]) {
    let total = 0;
    for (const line of lines) {
        //Get array of only numbers
        const digitArray = line.split(/\D/);
        //Remove all empty strings
        const numbers = digitArray.filter(function(e){return e});
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
