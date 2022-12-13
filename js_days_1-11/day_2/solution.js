const { readFileSync } = require("fs");

function solution(path) {
  const lines = readFileSync(path).toString().split("\n");
  let score = 0;

  lines.forEach((line) => {
    const [left, right] = line.split(" ");
    switch (right) {
      case "X":
        if (left === "A") {
          score += 3;
        } else if (left === "B") {
          score += 1;
        } else {
          score += 2;
        }
        break;
      case "Y":
        score += 3;
        if (left === "A") {
          score += 1;
        } else if (left === "B") {
          score += 2;
        } else {
          score += 3;
        }
        break;
      case "Z":
        score += 6;
        if (left === "A") {
          score += 2;
        } else if (left === "B") {
          score += 3;
        } else {
          score += 1;
        }
        break;
    }
  });

  console.log(score);
}

solution("input.txt");
