const { readFileSync } = require("fs");

const TYPES = { DIR: "DIR", FILE: "FILE" };

function solution(path) {
  let p1 = 0;
  let p2 = 0;

  const lines = readFileSync(path).toString().split("\n");
  const tree = makeTree(lines);

  const dirsUnder100k = tree.getNodes(0, 100000);
  dirsUnder100k.forEach((d) => (p1 += d.size));

  const availableSpace = 70_000_000 - tree.root.size;
  const spaceNeeded = 30_000_000 - availableSpace;
  const dirsWeCouldDelete = tree
    .getNodes(spaceNeeded)
    .sort((a, b) => a.size - b.size);

  p2 = dirsWeCouldDelete[0].size;

  console.log("part 1", p1);
  console.log("part 2", p2);
}

function makeTree(lines) {
  const tree = new Tree();
  let currentNode = null;
  for (const line of lines) {
    const words = line.split(" ");
    switch (words[0]) {
      case "$": // is command
        switch (words[1]) {
          case "ls":
            // do nothing?
            break;
          case "cd":
            switch (words[2]) {
              case "/":
                currentNode = tree.root;
                break;
              case "..":
                currentNode = currentNode.parent;
                break;
              default:
                currentNode = currentNode.childDirs.find(
                  (d) => d.name === words[2]
                );
                if (!currentNode) {
                  console.log(currentNode, words);
                  throw new Error(
                    "Couldn't find child node",
                    currentNode,
                    words[2]
                  );
                }
                break;
            }
            break;
          default:
            throw new Error("Unexpected command", words[1]);
        }
        break;
      case "dir":
        currentNode.addChild(
          new Node({ type: TYPES.DIR, name: words[1], parent: currentNode })
        );
        break;
      default:
        currentNode.addChild(
          new Node({
            type: TYPES.FILE,
            name: words[1],
            size: Number(words[0]),
            parent: currentNode,
          })
        );
        break;
    }
  }
  return tree;
}

class Tree {
  constructor() {
    this.root = new Node({ type: TYPES.DIR, name: "/", parent: null });
  }

  getNodes(minSize = 0, maxSize = Infinity) {
    const result = [];

    const stack = [...this.root.childDirs];
    while (stack.length > 0) {
      const node = stack.pop();
      if (node.size >= minSize && node.size <= maxSize) {
        result.push(node);
      }
      stack.push(...node.childDirs);
    }
    return result;
  }
}

class Node {
  constructor({ type, name, parent, size }) {
    this.type = type;
    this.name = name;
    this.parent = parent;
    this.size = size || 0;
    this.childDirs = [];
    this.childFiles = [];
  }

  addChild(child) {
    if (this.type === TYPES.FILE) {
      throw new Error("File node can't have children", this.value);
    }

    switch (child.type) {
      case TYPES.DIR:
        this.childDirs.push(child);
        break;
      case TYPES.FILE:
        this.childFiles.push(child);
        let node = this;
        // loop through and calculate sizes while adding children!
        while (node) {
          node.size += child.size;
          node = node.parent;
        }
        break;
      default:
        throw new Error("Tried to add child but had unknown type", child.type);
    }
  }
}

solution("input.txt");
