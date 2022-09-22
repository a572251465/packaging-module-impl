const { pack } = require("./pack");
const { createDependencyGraph } = require("./createDependencyGraph");
const path = require("path");

const content = pack(
  createDependencyGraph(path.resolve(__dirname, "..", "./__test__/src.js"))
);

console.log(content);
