console.log(await part1());
console.log(await part2());

type Rotation = {
  direction: "L" | "R";
  amount: number;
};

async function part1() {
  const rotations = parseInput(await puzzleInput());
  const min = 0;
  const max = 99;
  const size = max + 1;
  let visitedZero = 0;
  let pos = 50;
  for (const rotation of rotations) {
    if (rotation.direction === "R") {
      pos = pos + rotation.amount;
      if (pos > max) {
        pos = (pos - max - 1) % size;
      }
    } else if (rotation.direction === "L") {
      pos = pos - rotation.amount;
      if (pos < min) {
        pos = (max + pos + 1) % size;
      }
    } else {
      throw new Error("Unknown direction");
    }
    if (pos === 0) {
      visitedZero++;
    }
  }
  return visitedZero;
}

async function part2() {
  const rotations = parseInput(await puzzleInput());
  const max = 99;
  const size = max + 1;
  let visitedZero = 0;
  let pos = 50;
  for (const rotation of rotations) {
    const k = rotation.amount;
    let firstT = 0;
    if (rotation.direction === "R") {
      // steps t = 1..k, positions: (pos + t) % size
      firstT = (size - pos) % size;
      pos = (pos + k) % size;
    } else if (rotation.direction === "L") {
      // steps t = 1..k, positions: (pos - t) mod size
      firstT = pos % size;
      pos = (((pos - k) % size) + size) % size;
    } else {
      throw new Error("Unknown direction");
    }
    if (firstT === 0) {
      // first zero after one full circle
      if (k >= size) {
        visitedZero += 1 + Math.floor((k - size) / size);
      }
    } else {
      if (firstT <= k) {
        visitedZero += 1 + Math.floor((k - firstT) / size);
      }
    }
  }
  return visitedZero;
}

function parseInput(input: string): Rotation[] {
  return input
    .trim()
    .split("\n")
    .map((line) => {
      const instruction = line.trim();
      const direction = instruction[0] as "L" | "R";
      const amount = parseInt(instruction.slice(1), 10);
      return { direction, amount };
    });
}

async function puzzleInput() {
  return await Bun.file("day01/input.txt").text();
}

function exampleInput() {
  return `L68
  L30
  R48
  L5
  R60
  L55
  L1
  L99
  R14
  L82`;
}
