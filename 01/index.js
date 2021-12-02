import { readFileSync } from "fs";

const input = await readFileSync(process.argv[2])
  .toString()
  .split("\n")
  .map(Number);

function getSum(data) {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const value = data[i] + (data?.[i + 1] || 0) + (data?.[i + 2] || 0);
    result.push(value);
  }
  return result;
}

function getIncrease(data) {
  let previous = data[0];
  let count = 0;
  for (let i = 1; i < data.length; i++) {
    const current = data[i];
    if (current > previous) {
      count++;
    }
    previous = current;
  }
  return count;
}

const part1 = getIncrease(input);
const part2 = getIncrease(getSum(input));

console.log({ part1, part2 });
