const { readFileSync } = require("fs");

function letterToValue(str, caps) {
  if (caps) {
    return str.charCodeAt(0) - 38;
  } else {
    return str.charCodeAt(0) - 96;
  }
}

function solution(path) {
  const lines = readFileSync(path).toString().split("\n");
  let sum = 0;
  let counts1 = {};
  let counts2 = {};

  lines.forEach((line, lineIndex) => {
    if (lineIndex % 3 === 0) {
      counts1 = {};
      for (let i = 0; i < line.length; i++) {
        const current = line[i];
        counts1[current] = true;
      }
    } else if (lineIndex % 3 === 1) {
      counts2 = {};
      for (let i = 0; i < line.length; i++) {
        const current = line[i];
        if (counts1[current]) {
          counts2[current] = true;
        }
      }
    } else if (lineIndex % 3 === 2) {
      for (let i = 0; i < line.length; i++) {
        const current = line[i];
        if (counts2[current]) {
          console.log(lineIndex, current)
          sum += letterToValue(current, current === current.toUpperCase());
          break;
        }
      }
    }
    lineIndex += 1;
  });

  console.log(sum)
  return sum;
}

solution("input.txt");
