import * as fs from 'fs';
const test = fs.readFileSync('./test2.txt', 'utf-8');
const input = fs.readFileSync('./input.txt', 'utf-8');

interface Word<T> {
    [Key: string]: T;
}

interface Match {
    number: string;
    position: number;
}

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
}

//Test Case
let testLines = parseInput(test);
let testResult = calculateSum(words, testLines);

//Live input
let lines = parseInput(input);
let result = calculateSum(words, lines);

function parseInput(str: string) {
    const lines = str.split(/\r?\n/);
    return lines;
}

function regexMatches(str: string, regex: RegExp): Match[] {
    let matches = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
        let number = match[0];
        let position = match.index;
        if (match && (position || position === 0)) {
            //If non numeric value, use the words dictionary to find the proper value
            if (isNaN(Number(number))) {
                number = words[match[0] as keyof typeof words];
            }
            matches.push({ number, position });
        }
    }
    return matches;
}

//Build regex for finding string values e.g. 'one', 'two', 'three'
function buildStringRegex(words: Word<string>) {
    let keys = Object.keys(words).join('|');
    return RegExp(`(${keys})`, 'g');
}

function calculateSum(words: Word<string>, lines: string[]) {
    let numberRegex = RegExp('[0-9]', 'g');
    let stringRegex = buildStringRegex(words);

    let total = 0;
    for (const line of lines) {
        let strMatches = regexMatches(line, stringRegex);
        let numberMatches = regexMatches(line, numberRegex);
        let matches: Array<Match>;
        //Merge matches of numeric values and string values
        matches = [...strMatches, ...numberMatches];

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
        if (!lastDigit) lastDigit = firstDigit;
        total += parseInt(`${firstDigit}${lastDigit}`);
    }
    return total;
}

console.log(testResult === 281 ? 'Test Case Passed' : 'Test Case Failed');
console.log({ result });
