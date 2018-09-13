const babel = require('babel-core');
const types = require('babel-types');

const isType = ['isArguments', 'isFunction', 'isString', 'isDate', 'isRegExp', 'isError', 'isSymbol', 'isMap', 'isWeakMap', 'isSet', 'isWeakSet', 'isNumber', 'isArray']

const math = ['distance', 'gcd', 'max', 'mean', 'min', 'sum']

const convertMeanValue = ['meanToCode', 'codeToMean']

module.exports = function (babel) {
  return {
    visitor: {
      ImportDeclaration(path, ref = { opts: {} }) {
        let node = path.node
        let { specifiers } = node
        if (ref.opts.library === node.source.value
          && !types.isImportDefaultSpecifier(specifiers[0])
          && !types.isImportNamespaceSpecifier(specifiers[0])) {
          let newImports = specifiers.map(specifier => {
            if (isType.includes(`${specifier.local.name}`)) {
              return types.importDeclaration([types.importSpecifier(specifier.local, specifier.local)], types.stringLiteral(`${node.source.value}/lib/isType`)) // import { isFunction } from 'diana/lib/isType'
            }
            if (math.includes(`${specifier.local.name}`)) {
              return types.importDeclaration([types.importSpecifier(specifier.local, specifier.local)], types.stringLiteral(`${node.source.value}/lib/math`)) // import { isFunction } from 'diana/lib/isType'
            }
            if (convertMeanValue.includes(`${specifier.local.name}`)) {
              return types.importDeclaration([types.importSpecifier(specifier.local, specifier.local)], types.stringLiteral(`${node.source.value}/lib/convertMeanValue`)) // import { isFunction } from 'diana/lib/isType'
            }
            return types.importDeclaration([types.importDefaultSpecifier(specifier.local)], types.stringLiteral(`${node.source.value}/lib/${specifier.local.name}`))
          })
          path.replaceWithMultiple(newImports)
        }
      }
    }
  }
}