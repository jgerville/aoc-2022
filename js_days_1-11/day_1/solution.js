const MaxHeap = require("heap-min-max").MaxHeap;
const { readFileSync } = require("fs");

function solution(path) {
  const lines = readFileSync(path).toString().split("\n");
  const maxHeap = new MaxHeap();
  let localSum = 0;

  lines.forEach((line) => {
    if (line === "") {
      maxHeap.push(localSum);
      localSum = 0;
    } else {
      localSum += Number(line);
    }
  });

  let topThree = 0;
  for (let i = 0; i < 3; i++) {
    topThree += maxHeap.pop()[0];
  }

  console.log(topThree);
}

solution("input.txt");
