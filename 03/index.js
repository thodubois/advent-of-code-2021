import { readFileSync } from "fs";

const input = await readFileSync(process.argv[2]).toString().split("\n");

const getGammaEpsilonRate = (input) => {
  const count = Array(input[0].length).fill(0);
  for (const line in input) {
    for (let i = 0; i < input[line].length; i++) {
      input[line][i] === "1" ? count[i]++ : count[i]--;
    }
  }

  const [gamma, epsilon] = count.reduce(
    (acc, curr) => {
      const indice = curr > 0;
      return [
        `${acc[0]}${indice ? "1" : "0"}`,
        `${acc[1]}${indice ? "0" : "1"}`,
      ];
    },
    ["", ""]
  );
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

const getO2andCO2 = (input) => {
  const data = [input, input];
  for (let i = 0; i < input[0].length; i++) {
    if (data[0].length > 1) {
      let indiceO2 =
        data[0].reduce(
          (acc, curr) => (curr[i] === "1" ? acc + 1 : acc - 1),
          0
        ) >= 0
          ? "1"
          : "0";

      data[0] = data[0].filter((el) => indiceO2 === el[i]);
    }

    if (data[1].length > 1) {
      let indiceCO2 =
        data[1].reduce(
          (acc, curr) => (curr[i] === "1" ? acc + 1 : acc - 1),
          0
        ) >= 0
          ? "0"
          : "1";

      data[1] = data[1].filter((el) => indiceCO2 === el[i]);
    }
  }
  return parseInt(data[0][0], 2) * parseInt(data[1][0], 2);
};

const part1 = getGammaEpsilonRate(input);
const part2 = getO2andCO2(input);

console.log({ part1, part2 });
