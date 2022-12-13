import { readFileSync } from "fs";

type Point = { coords: number[]; height: number };

function solution(path) {
  let p1 = 0;
  let p2 = 0;

  const input = readFileSync(path).toString();
  const map = new HeightMap(input);
  p1 = map.getNumStepsToEnd();
  p2 = map.getNumStepsToA();

  console.log("part 1", p1);
  console.log("part 2", p2);
}

class HeightMap {
  map: string[];
  length: number; // x
  height: number; // y

  constructor(input: string) {
    this.map = input.split("\n");
    this.length = this.map[0].length; // assuming rectangular input.
    this.height = this.map.length;
  }

  private getStart(): Point {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.length; x++) {
        const coords: [number, number] = [x, y];
        if (this.isStart(coords)) {
          return { coords, height: this.getHeight(coords) };
        }
      }
    }
    throw new Error("Couldn't find start.");
  }

  private getEnd(): Point {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.length; x++) {
        const coords: [number, number] = [x, y];
        if (this.isEnd(coords)) {
          return { coords, height: this.getHeight(coords) };
        }
      }
    }
    throw new Error("Couldn't find end.");
  }

  private getHeight([x, y]: Point["coords"]): number {
    const char = this.map[y][x];
    // lower case: 0..25
    if (char === char.toLowerCase()) {
      return char.charCodeAt(0) - 97;
    }
    if (char === "S") {
      return 0;
    }
    if (char === "E") {
      return 25;
    }
    throw new Error(`Unexpected char: ${char}`);
  }

  private isStart([x, y]: Point["coords"]): boolean {
    return this.map[y][x] === "S";
  }

  private isEnd([x, y]: Point["coords"]): boolean {
    return this.map[y][x] === "E";
  }

  private isA([x, y]: Point["coords"]): boolean {
    return this.map[y][x] === "a";
  }

  private getNeighbors({ coords: [x, y] }: Point): Point[] {
    const neighbors: Point[] = [];
    if (x > 0) {
      // left
      const coords = [x - 1, y];
      neighbors.push({ coords, height: this.getHeight(coords) });
    }
    if (x < this.length - 1) {
      // right
      const coords = [x + 1, y];
      neighbors.push({ coords, height: this.getHeight(coords) });
    }
    if (y > 0) {
      // up
      const coords = [x, y - 1];
      neighbors.push({ coords, height: this.getHeight(coords) });
    }
    if (y < this.height - 1) {
      // down
      const coords = [x, y + 1];
      neighbors.push({ coords, height: this.getHeight(coords) });
    }
    return neighbors;
  }

  private getHigherNeighbors(point: Point): Point[] {
    const neighbors = this.getNeighbors(point);
    return neighbors.filter(
      (n) => n.height <= this.getHeight(point.coords) + 1
    );
  }

  private getLowerNeighbors(point: Point): Point[] {
    const neighbors = this.getNeighbors(point);
    return neighbors.filter(
      (n) => n.height >= this.getHeight(point.coords) - 1
    );
  }

  getNumStepsToEnd(): number {
    let numSteps = 0;
    const visited = new Set<string>();

    // using BFS to check each level for the end
    const queue = [this.getStart()];
    while (queue.length > 0) {
      let levelLength = queue.length;
      for (let i = 0; i < levelLength; i++) {
        const current = queue.shift();
        if (!current) {
          throw new Error(`Expected current point but got ${current}`);
        }
        if (this.isEnd(current.coords)) {
          return numSteps;
        }

        for (const neighbor of this.getHigherNeighbors(current)) {
          if (!visited.has(`${neighbor.coords[0]}-${neighbor.coords[1]}`)) {
            queue.push(neighbor);
            visited.add(`${neighbor.coords[0]}-${neighbor.coords[1]}`);
          }
        }
      }
      numSteps += 1;
    }

    throw new Error(`Didn't find end. numSteps: ${numSteps}`);
  }

  getNumStepsToA(): number {
    let numSteps = 0;
    const visited = new Set<string>();

    // using BFS to check each level for an "a".
    const queue = [this.getEnd()];
    while (queue.length > 0) {
      let levelLength = queue.length;
      console.log(
        `starting to check level ${numSteps}. tiles to check: ${levelLength}`
      );
      for (let i = 0; i < levelLength; i++) {
        const current = queue.shift();
        if (!current) {
          throw new Error(`Expected current point but got ${current}`);
        }
        if (this.isA(current.coords)) {
          return numSteps;
        }

        for (const neighbor of this.getLowerNeighbors(current)) {
          if (!visited.has(`${neighbor.coords[0]}-${neighbor.coords[1]}`)) {
            queue.push(neighbor);
            visited.add(`${neighbor.coords[0]}-${neighbor.coords[1]}`);
          }
        }
      }
      numSteps += 1;
    }

    throw new Error(`Didn't find end. numSteps: ${numSteps}`);
  }
}

solution("input.txt");
