console.log(await part1());
console.log(await part2());

type Range = { from: string; to: string };
type Input = {
  ranges: Range[];
  available: string[];
};

async function part1() {
  const { available, ranges } = parseInput(await puzzleInput());
  let numFresh = 0;
  for (const value of available) {
    for (const range of ranges) {
      if (isInRange(value, range.from, range.to)) {
        numFresh++;
        break;
      }
    }
  }
  return numFresh;
}

async function part2() {
  const { ranges } = parseInput(await puzzleInput());
  const merged = mergeRanges(ranges);
  let total = "0";
  for (const r of merged) {
    const len = rangeLength(r.from, r.to);
    total = addIntStr(total, len);
  }
  return total;
}

function normalizeIntStr(x: string): string {
  x = x.trim().replace(/^0+/, "");
  return x === "" ? "0" : x;
}

function cmpIntStr(a: string, b: string): number {
  a = normalizeIntStr(a);
  b = normalizeIntStr(b);

  if (a.length < b.length) return -1;
  if (a.length > b.length) return 1;
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function addIntStr(a: string, b: string): string {
  a = normalizeIntStr(a);
  b = normalizeIntStr(b);

  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  const out: number[] = [];

  while (i >= 0 || j >= 0 || carry > 0) {
    const da = i >= 0 ? a.charCodeAt(i) - 48 : 0;
    const db = j >= 0 ? b.charCodeAt(j) - 48 : 0;
    let sum = da + db + carry;
    if (sum >= 10) {
      sum -= 10;
      carry = 1;
    } else {
      carry = 0;
    }
    out.push(sum);
    i--;
    j--;
  }

  while (out.length > 1 && out[out.length - 1] === 0) out.pop();
  return out.reverse().join("");
}

function addOneIntStr(a: string): string {
  return addIntStr(a, "1");
}

function subIntStr(a: string, b: string): string {
  a = normalizeIntStr(a);
  b = normalizeIntStr(b);

  const cmp = cmpIntStr(a, b);
  if (cmp < 0) {
    throw new Error(`subIntStr: a < b not supported (a=${a}, b=${b})`);
  }
  if (cmp === 0) return "0";

  let i = a.length - 1;
  let j = b.length - 1;
  let borrow = 0;
  const out: number[] = [];

  while (i >= 0 || j >= 0) {
    const da = i >= 0 ? a.charCodeAt(i) - 48 : 0;
    const db = j >= 0 ? b.charCodeAt(j) - 48 : 0;
    let diff = da - db - borrow;
    if (diff < 0) {
      diff += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }
    out.push(diff);
    i--;
    j--;
  }

  while (out.length > 1 && out[out.length - 1] === 0) out.pop();
  return out.reverse().join("");
}

function isInRange(value: string, from: string, to: string) {
  return cmpIntStr(from, value) <= 0 && cmpIntStr(value, to) <= 0;
}

function rangeLength(from: string, to: string): string {
  const diff = subIntStr(to, from);
  return addOneIntStr(diff);
}

function mergeRanges(ranges: Range[]): Range[] {
  if (ranges.length === 0) return [];

  const sorted = [...ranges].sort((a, b) => cmpIntStr(a.from, b.from));
  const merged: Range[] = [];
  let current = { ...sorted[0] };
  for (let i = 1; i < sorted.length; i++) {
    const r = sorted[i];
    const nextAfterCurrentTo = addOneIntStr(current.to);
    if (cmpIntStr(r.from, nextAfterCurrentTo) > 0) {
      merged.push(current);
      current = { ...r };
    } else {
      if (cmpIntStr(r.to, current.to) > 0) {
        current.to = r.to;
      }
    }
  }
  merged.push(current);
  return merged;
}

// ----- parsing & IO -----

function parseInput(input: string): Input {
  const [rangePart, availablePart] = input.trim().split("\n\n");
  const ranges = rangePart
    .trim()
    .split("\n")
    .map((line) => {
      const [from, to] = line
        .trim()
        .split("-")
        .map((s) => s.trim());
      return { from, to };
    });
  const available = availablePart
    .trim()
    .split("\n")
    .map((line) => line.trim());
  return { ranges, available };
}

async function puzzleInput() {
  return await Bun.file("day05/input.txt").text();
}

function exampleInput() {
  return `3-5
  10-14
  16-20
  12-18

  1
  5
  8
  11
  17
  32`;
}
