import { readFileSync } from "fs";

const input = await readFileSync(process.argv[2])
  .toString()
  .split(",")
  .map(Number);

function getFishCountBrut(data, days) {
  let fishes = [...data];
  for (let i = 0; i < days; i++) {
    const newFishes = [];
    for (let j = 0; j < fishes.length; j++) {
      if (fishes[j] === 0) {
        fishes[j] = 6;
        newFishes.push(8);
        continue;
      }
      fishes[j]--;
    }
    fishes = [...fishes, ...newFishes];
  }
  return fishes.length;
}

function getFishCount(data, days) {
  let count = data.length;
  let fishes = Array(9).fill(0);
  for (const fish in data) {
    fishes[data[fish]]++;
  }
  for (let i = 0; i < days; i++) {
    const newBorn = fishes[0];

    for (let j = 0; j < fishes.length; j++) {
      switch (j) {
        case 6:
          fishes[j] = fishes[j + 1] + newBorn;
          break;
        case 8:
          fishes[j] = newBorn;
          count += newBorn;
          break;
        default:
          fishes[j] = fishes[j + 1];
          break;
      }
    }
  }
  return count;
}

const part1 = getFishCountBrut(input, 80);
const part2 = getFishCount(input, 256);

console.log({
  part1,
  part2,
});
