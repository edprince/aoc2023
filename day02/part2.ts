import * as fs from 'fs';
const test = fs.readFileSync('./test.txt', 'utf-8');
const input = fs.readFileSync('./input.txt', 'utf-8');

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

let games = parseInput(input);
let total = getDraw(games, MAX_RED, MAX_GREEN, MAX_BLUE);
console.log({ total });

//console.log(total === 2286 ? 'Test passed' : 'Test failed');

/**
 * A Game is made up of games (I know that's confusing naming but fuck it)
 * Each of those games consists of rounds drawing multiple sets of dice
 * Each of those rounds consists of hands (number of dice per colour) 
*/
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
        let power = struct[gameId]['blue'] * struct[gameId]['red'] * struct[gameId]['green'];
        total += power;
    }
    return total;
}

