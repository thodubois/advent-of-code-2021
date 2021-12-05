import { readFileSync } from "fs";

const input = await readFileSync(process.argv[2])
  .toString()
  .split("\n")
  .map((line) => {
    const {
      groups: { x1, x2, y1, y2 },
    } = /(?<x1>\d*),(?<y1>\d*) -> (?<x2>\d*),(?<y2>\d*)/.exec(line);
    return {
      x1: Number(x1),
      y1: Number(y1),
      x2: Number(x2),
      y2: Number(y2),
    };
  });

function getCrossedLines(data, withDiagonal = false) {
  const grid = {};
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    const { x1, y1, x2, y2 } = data[i];

    const xdirection = x2 === x1 ? 0 : x2 > x1 ? 1 : -1;
    const ydirection = y2 === y1 ? 0 : y2 > y1 ? 1 : -1;
    if (!withDiagonal && xdirection !== 0 && ydirection !== 0) {
      continue;
    }
    const diff = Math.abs(x2 - x1 || y2 - y1);
    for (let i = 0; i <= diff; i++) {
      const key = `${x1 + i * xdirection},${y1 + i * ydirection}`;
      grid[key] = (grid[key] || 0) + 1;

      if (grid[key] === 2) {
        count++;
      }
    }
  }
  return count;
}

const part1 = getCrossedLines(input);
const part2 = getCrossedLines(input, true);

console.log({
  part1,
  part2,
});
