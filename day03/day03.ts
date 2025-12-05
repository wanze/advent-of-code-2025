console.log(await part1());
console.log(await part2());

type BatteryBank = Array<number>;

async function part1() {
  const banks = parseInput(await puzzleInput());
  let totalJoltage = 0;
  for (const batteries of banks) {
    let firstMax = 0;
    let secondMax = 0;
    for (let i = 0; i < batteries.length; i++) {
      const power = batteries[i] as number;
      if (i < batteries.length - 1 && power > firstMax) {
        firstMax = power;
        secondMax = 0;
      } else if (power > secondMax) {
        secondMax = power;
      }
    }
    const joltage = parseInt(`${firstMax}${secondMax}`);
    totalJoltage += joltage;
  }
  return totalJoltage;
}

async function part2() {
  const banks = parseInput(await puzzleInput());
  let totalJoltage = 0;
  for (const batteries of banks) {
    const maxima = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < batteries.length; i++) {
      const power = batteries[i] as number;
      const numBatteriesLeft = batteries.length - i - 1;
      for (let j = 0; j < maxima.length; j++) {
        const currentMax = maxima[j] as number;
        const numMaximaLeft = maxima.length - j - 1;
        if (power > currentMax && numBatteriesLeft >= numMaximaLeft) {
          maxima[j] = power;
          for (let k = j + 1; k < maxima.length; k++) {
            maxima[k] = 0;
          }
          break;
        }
      }
    }
    const joltage = parseInt(maxima.join(""));
    totalJoltage += joltage;
  }
  return totalJoltage;
}

function parseInput(input: string): BatteryBank[] {
  return input
    .trim()
    .split("\n")
    .map((batteries) => {
      return batteries
        .trim()
        .split("")
        .map((b) => parseInt(b, 10));
    });
}

async function puzzleInput() {
  return await Bun.file("day03/input.txt").text();
}

function exampleInput() {
  return `987654321111111
  811111111111119
  234234234234278
  818181911112111`;
}
