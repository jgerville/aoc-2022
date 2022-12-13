const { readFileSync } = require("fs");

function solution(path) {
  let p1 = 0;
  let p2 = 0;

  const lines = readFileSync(path).toString().split("\n");
  let horizontalLength = lines[0].length;

  const visibleTrees = new Set();
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    let highestSoFar = -1;

    // left to right
    for (let x = 0; x < horizontalLength; x++) {
      const tree = Number(line[x]);
      if (tree > highestSoFar) {
        visibleTrees.add(`${x}-${y}`);
        highestSoFar = tree;
      }
    }

    highestSoFar = -1;
    // right to left
    for (let x = horizontalLength - 1; x >= 0; x--) {
      const tree = Number(line[x]);
      if (tree > highestSoFar) {
        visibleTrees.add(`${x}-${y}`);
        highestSoFar = tree;
      }
    }
  }

  for (let x = 0; x < horizontalLength; x++) {
    let highestSoFar = -1;

    // top to bottom
    for (let y = 0; y < lines.length; y++) {
      const tree = Number(lines[y][x]);
      if (tree > highestSoFar) {
        visibleTrees.add(`${x}-${y}`);
        highestSoFar = tree;
      }
    }

    highestSoFar = -1;
    // bottom to top
    for (let y = lines.length - 1; y >= 0; y--) {
      const tree = Number(lines[y][x]);
      if (tree > highestSoFar) {
        visibleTrees.add(`${x}-${y}`);
        highestSoFar = tree;
      }
    }
  }

  p1 = visibleTrees.size

  for (let x = 0; x < horizontalLength; x++) {
    for (let y = 0; y < lines.length; y++) {
      const scenicScore = getScenicScore(lines, x, y);
      p2 = Math.max(p2, scenicScore);
    }
  }

  console.log("part 1", p1);
  console.log("part 2", p2);
}

function getScenicScore(lines, x0, y0) {
  let verticalLength = lines.length;
  let horizontalLength = lines[0].length;
  const originHeight = Number(lines[y0][x0]);

  let rightScore = 0;
  for (let x = x0 + 1; x < horizontalLength; x++) {
    const tree = Number(lines[y0][x]);
    rightScore += 1;
    if (tree >= originHeight) {
      break;
    }
  }

  let leftScore = 0;
  for (let x = x0 - 1; x >= 0; x--) {
    const tree = Number(lines[y0][x]);
    leftScore += 1;
    if (tree >= originHeight) {
      break;
    }
  }

  let upScore = 0;
  for (let y = y0 - 1; y >= 0; y--) {
    const tree = Number(lines[y][x0]);
    upScore += 1;
    if (tree >= originHeight) {
      break;
    }
  }

  let downScore = 0;
  for (let y = y0 + 1; y < verticalLength; y++) {
    const tree = Number(lines[y][x0]);
    downScore += 1;
    if (tree >= originHeight) {
      break;
    }
  }

  return leftScore * rightScore * upScore * downScore;
}

solution("input.txt");
