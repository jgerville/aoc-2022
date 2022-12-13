const { readFileSync } = require("fs");

function solution(path) {
  let p1 = 0;
  let p2 = 0;

  const buffer = readFileSync(path).toString().trim();

  const charMap = {};
  let left = 0;
  let isP1Solved = false;
  for (let right = 0; right < buffer.length; right++) {
    const rightChar = buffer[right];

    if (rightChar in charMap) {
      left = Math.max(left, charMap[rightChar] + 1);
    }
    charMap[rightChar] = right;

    if (!isP1Solved && right - left + 1 === 4) {
      p1 = right + 1;
      isP1Solved = true;
    }

    if (right - left + 1 === 14) {
      p2 = right + 1;
      break;
    }
  }


  console.log("part 1", p1);
  console.log("part 2", p2);
}

solution("input.txt");
