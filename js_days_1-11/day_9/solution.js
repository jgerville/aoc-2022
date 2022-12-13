const { readFileSync } = require("fs");

function solution(path) {
  let p1 = 0;
  let p2 = 0;

  const set1 = new Set();
  const set2 = new Set();

  const lines = readFileSync(path).toString().split("\n");
  const head = { x: 0, y: 0 };
  const tail1 = { x: 0, y: 0 };
  const tail2 = { x: 0, y: 0 };
  const tail3 = { x: 0, y: 0 };
  const tail4 = { x: 0, y: 0 };
  const tail5 = { x: 0, y: 0 };
  const tail6 = { x: 0, y: 0 };
  const tail7 = { x: 0, y: 0 };
  const tail8 = { x: 0, y: 0 };
  const tail9 = { x: 0, y: 0 };

  lines.forEach((line) => {
    const [direction, num] = line.split(" ");

    for (let i = 0; i < Number(num); i++) {
      switch (direction) {
        case "U":
          head.y += 1;
          break;
        case "D":
          head.y -= 1;
          break;
        case "L":
          head.x -= 1;
          break;
        case "R":
          head.x += 1;
          break;
        default:
          throw new Error(`unexpected direction: ${direction}`);
      }
      moveTail(head, tail1, set1);
      moveTail(tail1, tail2);
      moveTail(tail2, tail3);
      moveTail(tail3, tail4);
      moveTail(tail4, tail5);
      moveTail(tail5, tail6);
      moveTail(tail6, tail7);
      moveTail(tail7, tail8);
      moveTail(tail8, tail9, set2);
    }
  });

  function moveTail(head, tail, set) {
    if (Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1) {
      // non-diagonal moves
      if (head.x === tail.x && head.y > tail.y) {
        // up
        tail.y += 1;
      } else if (head.x === tail.x && head.y < tail.y) {
        // down
        tail.y -= 1;
      } else if (head.y === tail.y && head.x > tail.x) {
        // right
        tail.x += 1;
      } else if (head.y === tail.y && head.x < tail.x) {
        // left
        tail.x -= 1;

        // diagonal moves
      } else if (head.x > tail.x && head.y > tail.y) {
        // up right
        tail.x += 1;
        tail.y += 1;
      } else if (head.x > tail.x && head.y < tail.y) {
        // down right
        tail.x += 1;
        tail.y -= 1;
      } else if (head.x < tail.x && head.y > tail.y) {
        // up left
        tail.x -= 1;
        tail.y += 1;
      } else if (head.x < tail.x && head.y < tail.y) {
        // down left
        tail.x -= 1;
        tail.y -= 1;
      }
    }
    if (set) {
      set.add(`${tail.x},${tail.y}`);
    }
  }

  p1 = set1.size;
  p2 = set2.size;
  console.log("part 1", p1);
  console.log("part 2", p2);
}

solution("input.txt");
