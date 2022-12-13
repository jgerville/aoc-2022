const { readFileSync } = require("fs");

function solution(path) {
  let p1 = 0;
  let p2 = 0;

  const [diagram, directions] = readFileSync(path).toString().split("\n\n");
  const rows = diagram.split("\n");
  const labels = rows
    .pop()
    .split("")
    .filter((x) => Number(x));

  const numOfPiles = Number(labels[labels.length - 1]);
  const piles = Array.from(new Array(numOfPiles), () => []);
  for (const row of rows) {
    // not doing any splitting/regex here because values could be empty
    for (let i = 1; i < row.length; i += 4) {
      const crate = row[i];
      if (crate !== " ") {
        const pileIndex = (i - 1) / 4;
        piles[pileIndex].push(crate);
      }
    }
  }
  const piles2 = JSON.parse(JSON.stringify(piles))

  const directionLines = directions.split("\n");
  for (const line of directionLines) {
    const [numCrates, from, to] = line
      .split(" ")
      .filter((c) => Number(c))
      .map(Number);

    // FOR PART ONE
    for (let i = 0; i < numCrates; i++) {
      const crate = piles[from - 1].shift();
      piles[to - 1].unshift(crate);
    }

    // FOR PART TWO
    const crates = piles2[from - 1].slice(0, numCrates);
    piles2[from - 1] = piles2[from - 1].slice(numCrates);
    piles2[to - 1] = crates.concat(piles2[to - 1])
  }

  p1 = piles.map(p => p[0]).join("")
  p2 = piles2.map(p => p[0]).join("")

  console.log("part 1", p1);
  console.log("part 2", p2);
}

solution("input.txt");
