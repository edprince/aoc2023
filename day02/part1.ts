import * as fs from 'fs';
const test = fs.readFileSync('./test.txt', 'utf-8');
const input = fs.readFileSync('./input.txt', 'utf-8');

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

let games = parseInput(input);
let total = getDraw(games, MAX_RED, MAX_GREEN, MAX_BLUE);
console.log({ total });

//console.log(total === 8 ? 'Test passed' : 'Test failed');

interface Hand {
    [key: string]: number
}

interface Game {
    [key: number]: {
        [key: string]: number
    }
}

function parseInput(str: string) {
    const games = str.split(/\r?\n/);
    return games;
}

function getDraw(games: string[], MAX_RED:number, MAX_GREEN:number, MAX_BLUE:number) {
    let struct: Game;
    struct = {}
    let total = 0;
    for (const game of games) {
        let draw = game.split(":");
        let gameId = parseInt(draw[0].split(' ')[1]);
        let rounds = draw[1].split(";");
        struct[gameId] = {};
        for (const round of rounds) {
            let hand = round.split(",");
            for (const dice of hand) {
                let [quantity, color] = dice.trim().split(" ");
                if (!struct[gameId][color]) struct[gameId][color] = 0;
                let storedQuantity = struct[gameId][color];
                if (storedQuantity < parseInt(quantity)) {
                    struct[gameId][color] = parseInt(quantity);
                }
            }
        }
        if (
            (struct[gameId]['blue'] <= MAX_BLUE) &&
            (struct[gameId]['red'] <= MAX_RED) &&
            (struct[gameId]['green'] <= MAX_GREEN)) {
                total += gameId;
        }
    }
    return total;
}

