const { readFileSync } = require("fs");

function solution(path) {
  let p1 = 0;
  let p2 = 0;

  const monkeys = readFileSync(path).toString().split("\n\n");
  const processedMonkeys1 = monkeys.map(processMonkey);
  const processedMonkeys2 = monkeys.map(processMonkey);

  // for part 2.
  let modFactor = 1; // this is the product of each of the divisor #s.
  // nobody look at what is below please
  monkeys.forEach(
    (m) =>
      (modFactor *= Number(
        m
          .split("\n")
          .map((l) => l.trim())[3]
          .split("by ")[1]
      ))
  );
  console.log(modFactor);

  for (let i = 0; i < 10_000; i++) {
    for (let j = 0; j < processedMonkeys1.length; j++) {
      // For part 1, we only have 20 rounds.
      if (i < 20) {
        const monkeyP1 = processedMonkeys1[j];
        while (monkeyP1.items.length > 0) {
          const item = monkeyP1.items.shift();

          const inspectedItem = monkeyP1.operation(item);
          monkeyP1.numInspected += 1;
          const relievedItem = Math.floor(inspectedItem / 3);
          const targetMonkey = monkeyP1.test(relievedItem);
          processedMonkeys1[targetMonkey].items.push(relievedItem);
        }
      }

      const monkeyP2 = processedMonkeys2[j];
      while (monkeyP2.items.length > 0) {
        // console.log(monkeyP2.items);
        const item = monkeyP2.items.shift();

        const inspectedItem = monkeyP2.operation(item);
        monkeyP2.numInspected += 1;

        const relievedItem = inspectedItem % modFactor;
        const targetMonkey = monkeyP2.test(relievedItem);
        processedMonkeys2[targetMonkey].items.push(relievedItem);
      }
    }
  }

  const numInspectionsByMonkeyP1 = [];
  for (const monkey of processedMonkeys1) {
    numInspectionsByMonkeyP1.push(monkey.numInspected);
  }
  numInspectionsByMonkeyP1.sort((a, b) => b - a);
  p1 = numInspectionsByMonkeyP1[0] * numInspectionsByMonkeyP1[1];

  const numInspectionsByMonkeyP2 = [];
  for (const monkey of processedMonkeys2) {
    numInspectionsByMonkeyP2.push(monkey.numInspected);
  }
  numInspectionsByMonkeyP2.sort((a, b) => b - a);
  console.log(numInspectionsByMonkeyP2);
  p2 = numInspectionsByMonkeyP2[0] * numInspectionsByMonkeyP2[1];

  console.log("part 1", p1);
  console.log("part 2", p2);
}

function processMonkey(monkey) {
  const lines = monkey.split("\n").map((l) => l.trim());

  const items = lines[1].split(": ")[1].split(",").map(Number);
  const operation = (worryLevel) => {
    const [op, num] = lines[2]
      .split("= old ")[1]
      .split(" ")
      .map((ele) => Number(ele) || ele);
    let rightNum = Number(num) || worryLevel;
    switch (op) {
      case "*":
        return worryLevel * rightNum;
      case "+":
        return worryLevel + rightNum;
      default:
        throw new Error(`Unexpected op: ${op}`);
    }
  };
  const test = (worryLevel) => {
    const divisibleBy = Number(lines[3].split("by ")[1]);
    if (worryLevel % divisibleBy === 0) {
      return Number(lines[4].split("monkey ")[1]);
    } else {
      return Number(lines[5].split("monkey ")[1]);
    }
  };

  return { items, operation, test, numInspected: 0 };
}

solution("input.txt");
