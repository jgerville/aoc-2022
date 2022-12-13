const { readFileSync } = require("fs");

function solution(path) {
  let p1 = 0;
  let p2 = 1;

  const lines = readFileSync(path).toString().split("\n");

  const futureAdditions = {};
  let register = 1;

  let lineIdx = 0;
  let cycle = 1;
  let workCyclesLeft = 0;
  let numberToAdd = 0;

  let CRTpos = 0; // 0 to 39 inclusive
  let CRTrow = 0; // 0 to 5 inclusive
  let crt0 = [];
  let crt1 = [];
  let crt2 = [];
  let crt3 = [];
  let crt4 = [];
  let crt5 = [];
  while (lineIdx <= lines.length || workCyclesLeft > 0) {
    if (
      cycle === 20 ||
      cycle === 60 ||
      cycle === 100 ||
      cycle === 140 ||
      cycle === 180 ||
      cycle === 220
    ) {
      p1 += cycle * register;
    }

    let crt;
    switch (CRTrow) {
      case 0:
        crt = crt0;
        break;
      case 1:
        crt = crt1;
        break;
      case 2:
        crt = crt2;
        break;
      case 3:
        crt = crt3;
        break;
      case 4:
        crt = crt4;
        break;
      case 5:
        crt = crt5;
        break;
    }
    if (register <= CRTpos + 1 && register >= CRTpos - 1) {
      crt.push("#");
    } else {
      crt.push(".");
    }
    CRTpos += 1;
    if (CRTpos === 40) {
      CRTrow += 1;
      CRTpos = 0;
    }
    if (cycle === 240) {
      console.log(crt0.join(""));
      console.log(crt1.join(""));
      console.log(crt2.join(""));
      console.log(crt3.join(""));
      console.log(crt4.join(""));
      console.log(crt5.join(""));
    }

    if (workCyclesLeft > 0) {
      workCyclesLeft -= 1;
      cycle += 1;
      register += numberToAdd;
      numberToAdd = 0;
      continue;
    }

    const [command, n] = lines[lineIdx].split(" ");
    lineIdx += 1;

    switch (command) {
      case "noop":
        break;
      case "addx":
        numberToAdd = Number(n);
        workCyclesLeft = 1;
        break;
      default:
        throw new Error(`unexpected command, ${command}`);
    }

    cycle += 1;
  }

  console.log("part 1", p1);
  console.log("part 2", p2);
}

solution("input.txt");
