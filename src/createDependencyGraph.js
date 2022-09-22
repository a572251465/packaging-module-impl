const { createModule } = require("./createModule");
const path = require("path");
const resolve = require("resolve").sync;

function createDependencyGraph(entry = "") {
  const entryInfo = createModule(entry);
  // 表示依赖树
  const graphArr = [];
  graphArr.push(entryInfo);

  for (const module of graphArr) {
    module.map = {};
    // module.deps 表示存放子依赖的地址
    module.deps.forEach((depPath) => {
      // 父路径
      const baseDir = path.dirname(module.filePath);
      const moduleDepPath = path.resolve(baseDir, depPath);
      const moduleInfo = createModule(moduleDepPath);
      graphArr.push(moduleInfo);
      module.map[depPath] = moduleInfo.id;
    });
  }

  return graphArr;
}

module.exports = {
  createDependencyGraph,
};
