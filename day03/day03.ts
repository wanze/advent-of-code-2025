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
  return 0;
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
