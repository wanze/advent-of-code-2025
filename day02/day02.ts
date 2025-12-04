console.log(await part1());
console.log(await part2());

type Range = {
  first: number;
  last: number;
};

async function part1() {
  const ranges = parseInput(await puzzleInput());
  let sum = 0;
  for (const range of ranges) {
    for (let i = range.first; i <= range.last; i++) {
      const digits = i.toString();
      if (digits.length % 2 !== 0 || digits[0] === "0") {
        continue;
      }
      let isValid = true;
      const half = digits.length / 2;
      for (let j = 0; j < half; j++) {
        if (digits[j] !== digits[j + half]) {
          isValid = false;
          break;
        }
      }
      if (isValid) {
        sum += i;
      }
    }
  }
  return sum;
}

async function part2() {
  const ranges = parseInput(await puzzleInput());
  let sum = 0;
  for (const range of ranges) {
    for (let i = range.first; i <= range.last; i++) {
      const digits = i.toString();
      if (digits[0] === "0") {
        continue;
      }
      let current = digits[0] as string;
      for (let j = 1; j < digits.length; j++) {
        if (digits.match(`^(${current})+$`)) {
          sum += i;
          break;
        }
        current = current + digits[j];
      }
    }
  }
  return sum;
}

function parseInput(input: string): Range[] {
  return input
    .trim()
    .split(",")
    .map((range) => {
      const [first, last] = range.split("-") as [string, string];
      return { first: parseInt(first), last: parseInt(last) };
    });
}

async function puzzleInput() {
  return await Bun.file("day02/input.txt").text();
}

function exampleInput() {
  return `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;
}
