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
const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;
let games = parseInput(input);
let total = getDraw(games, MAX_RED, MAX_GREEN, MAX_BLUE);
console.log({ total });
function parseInput(str) {
    const games = str.split(/\r?\n/);
    return games;
}
function getDraw(games, MAX_RED, MAX_GREEN, MAX_BLUE) {
    let struct;
    struct = {};
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
                if (!struct[gameId][color])
                    struct[gameId][color] = 0;
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
