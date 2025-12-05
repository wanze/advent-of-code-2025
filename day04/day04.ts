const directions: Array<[number, number]> = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

console.log(await part1());
console.log(await part2());

async function part1() {
  const map = parseInput(await puzzleInput());
  const { numAccessable } = removePapers(map, directions);
  return numAccessable;
}

async function part2() {
  let map = parseInput(await puzzleInput());
  let totalRemoved = 0;
  while (true) {
    const { numAccessable, map: updatedMap } = removePapers(map, directions);
    if (numAccessable === 0) {
      break;
    }
    totalRemoved += numAccessable;
    map = updatedMap;
  }
  return totalRemoved;
}

function removePapers(
  map: Array<string[]>,
  directions: Array<[number, number]>,
): { numAccessable: number; map: Array<string[]> } {
  const newMap = map.map((row) => [...row]);
  let numAccessable = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (isAccessable(x, y)) {
        numAccessable++;
        newMap[y][x] = ".";
      }
    }
  }

  return {
    numAccessable,
    map: newMap,
  };

  function isAccessable(x: number, y: number) {
    if (map[y][x] !== "@") {
      return false;
    }
    let numAdjacent = 0;
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < map[0].length && ny >= 0 && ny < map.length) {
        if (map[ny][nx] === "@") {
          numAdjacent++;
          if (numAdjacent > 3) {
            return false;
          }
        }
      }
    }
    return true;
  }
}

function parseInput(input: string): Array<string[]> {
  return input
    .trim()
    .split("\n")
    .map((line) => {
      return line.trim().split("");
    });
}

async function puzzleInput() {
  return await Bun.file("day04/input.txt").text();
}

function exampleInput() {
  return `..@@.@@@@.
  @@@.@.@.@@
  @@@@@.@.@@
  @.@@@@..@.
  @@.@@@@.@@
  .@@@@@@@.@
  .@.@.@.@@@
  @.@@@.@@@@
  .@@@@@@@@.
  @.@.@@@.@.`;
}
