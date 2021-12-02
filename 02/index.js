import { readFileSync } from "fs";

const input = await readFileSync(process.argv[2])
  .toString()
  .split("\n")
  .map((line) => {
    const [direction, value] = line.split(" ");
    return [direction, Number(value)];
  });

const getPosition = (data, start) => {
  for (const [direction, value] of data) {
    if (direction === "forward") {
      start[0] += value;
    }
    if (direction === "up") {
      start[1] -= value;
    }
    if (direction === "down") {
      start[1] += value;
    }
  }
  return start[0] * start[1];
};

const getPositionAndAim = (data, position) => {
  for (const [direction, value] of data) {
    if (direction === "forward") {
      const depth = value * position[2];
      position[0] += value;
      position[1] += depth;
    }
    if (direction === "up") {
      position[2] -= value;
    }
    if (direction === "down") {
      position[2] += value;
    }
  }
  return position[0] * position[1];
};

const part1 = getPosition(input, [0, 0]);
const part2 = getPositionAndAim(input, [0, 0, 0]);

console.log({ part1, part2 });
