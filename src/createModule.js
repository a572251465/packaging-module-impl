const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");
const { genRandomId } = require("./utils");

/**
 * @author lihh
 * @description 创建模块 根据代码地址读取源码，抽离import路径。同时转换es5
 * @param filePath 模块地址
 * @returns {{code, filePath, deps: *[], id: string}}
 */
function createModule(filePath) {
  // 读取模块内容
  const content = fs.readFileSync(filePath, "utf-8");
  // 对源码进行ast转换
  const ast = parser.parse(content, { sourceType: "module" });
  // 查询关联的模块
  const deps = [];

  // 遍历ast，将依赖收集到deps数组中
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      deps.push(node.source.value);
    },
  });

  const id = genRandomId();

  // 将代码转换为es5代码
  const { code } = babel.transformFromAstSync(ast, null, {
    presets: ["@babel/preset-env"],
  });

  return {
    id,
    filePath,
    deps,
    code,
  };
}

module.exports = {
  createModule,
};
