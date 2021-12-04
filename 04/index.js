import { readFileSync } from "fs";

const input = await readFileSync(process.argv[2]).toString().split("\n\n");
const drowns = input[0].split(",");
const TABLE_SIZE = input[1].split("\n").length;

const boards = input.slice(1).map((board) =>
  board
    .split(/\s/)
    .filter(Boolean)
    .reduce((finalBoard, cell, index) => {
      return {
        ...finalBoard,
        [cell]: {
          x: index % TABLE_SIZE,
          y: Math.floor(index / TABLE_SIZE),
          isHit: false,
        },
      };
    }, {})
);

function sumWinningBoard(board) {
  return Object.entries(board).reduce((sum, [key, { isHit }]) => {
    return isHit ? sum : sum + Number(key);
  }, 0);
}

function isBoardWinning(board) {
  const rowCount = Array(TABLE_SIZE).fill(0);
  const columnCount = Array(TABLE_SIZE).fill(0);

  let isWinning = false;
  for (let cell in board) {
    if (board[cell].isHit) {
      rowCount[board[cell].x]++;
      columnCount[board[cell].y]++;
      if (
        rowCount[board[cell].x] === TABLE_SIZE ||
        columnCount[board[cell].y] === TABLE_SIZE
      ) {
        isWinning = true;
        break;
      }
    }
  }
  return isWinning;
}

function getFirstWinner(drowns, boards) {
  let result = 0;
  for (const drown in drowns) {
    for (const boardKey in boards) {
      if (boards[boardKey][drowns[drown]]) {
        boards[boardKey][drowns[drown]].isHit = true;
      }
      if (Number(drown) + 1 >= TABLE_SIZE) {
        if (isBoardWinning(boards[boardKey])) {
          result = sumWinningBoard(boards[boardKey]) * Number(drowns[drown]);
          break;
        }
      }
    }
    if (result) break;
  }
  return result;
}

function getLastWinner(drowns, boards) {
  let result = 0;
  const availableBoards = Array(boards.length).fill(true);
  for (const drown in drowns) {
    for (const boardKey in boards) {
      if (!availableBoards[boardKey]) {
        continue;
      }

      if (boards[boardKey][drowns[drown]]) {
        boards[boardKey][drowns[drown]].isHit = true;
      }
      if (Number(drown) + 1 >= TABLE_SIZE) {
        if (isBoardWinning(boards[boardKey])) {
          availableBoards[boardKey] = false;
          if (availableBoards.filter(Boolean).length === 0) {
            result = sumWinningBoard(boards[boardKey]) * Number(drowns[drown]);
            break;
          }
        }
      }
    }
    if (result) break;
  }
  return result;
}

const part1 = getFirstWinner(drowns, boards);
const part2 = getLastWinner(drowns, boards);

console.log({
  part1,
  part2,
});
