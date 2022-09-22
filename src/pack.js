function pack(graph) {
  const moduleArgArr = graph.map((module) => {
    return `${module.id}: {
      factory: (exports, require) => {
        ${module.code}
      },
      map: ${JSON.stringify(module.map)}
    }`;
  });

  return `
    (function(modules) {
      const require = id => {
        const {factory, map} = modules[id]
        const localRequire = requireDeclarationName => require(map[requireDeclarationName])
        const module = {exports: {}}
        factory(module.exports, localRequire)
        return module.exports
      }
      require(0)
    })({${moduleArgArr.join()})
  `;
}

module.exports = { pack };
