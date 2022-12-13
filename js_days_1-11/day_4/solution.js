const { readFileSync } = require("fs");

function solution(path) {
  let numFullyContainedIntervals = 0;
  let numOverlapping = 0;

  const lines = readFileSync(path).toString().split("\n")
  lines.forEach(line => {
    const [left, right] = line.split(",");
    const [leftStart, leftEnd] = left.split("-").map(Number);
    const [rightStart, rightEnd] = right.split("-").map(Number);

    if (
      (leftStart <= rightStart && leftEnd >= rightEnd) ||
      (rightStart <= leftStart && rightEnd >= leftEnd)
    ) {
      numFullyContainedIntervals += 1;
    }

    if (!(rightEnd < leftStart || rightStart > leftEnd)) {
      numOverlapping += 1;
    }
  });

  console.log("part 1", numFullyContainedIntervals);
  console.log("part 2", numOverlapping);
}

solution("input.txt");
