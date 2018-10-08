var Components = require('../../components.json');
var fs = require('fs');
var render = require('json-templater/string');
var uppercamelcase = require('uppercamelcase');
var path = require('path');
var endOfLine = require('os').EOL;

var OUTPUT_PATH = path.join(__dirname, '../../src/index.js');
var IMPORT_TEMPLATE = 'import {{name}} from \'../packages/{{package}}/index.js\';';
var MAIN_TEMPLATE = `/* Automatically generated by './build/bin/build-entry.js' */
{{include}}
`;

var ComponentNames = Object.keys(Components);
var includeComponentTemplate = [];
var installTemplate = [];
var listTemplate = [];

ComponentNames.forEach(name => {
  var componentName = uppercamelcase(name);

  includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
    name: 'Gk' + componentName,
    package: name
  }));

  listTemplate.push(`  Gk${componentName}`)
});

var template = render(MAIN_TEMPLATE + `
module.exports = {
  version: '{{version}}',
{{list}}
};
module.exports.default = module.exports;
`, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join(',' + endOfLine),
  version: process.env.VERSION || require('../../package.json').version,
  list: listTemplate.join(',' + endOfLine)
});

fs.writeFileSync(OUTPUT_PATH, template);
console.log('[build entry] DONE:', OUTPUT_PATH);

template = render(MAIN_TEMPLATE + `
export default {
  version: '{{version}}',
{{list}}
};
`, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join(',' + endOfLine),
  version: process.env.VERSION || require('../../package.json').version,
  list: listTemplate.join(',' + endOfLine)
});

OUTPUT_PATH = path.join(__dirname, '../../src/index-es6.js');
fs.writeFileSync(OUTPUT_PATH, template);
console.log('[build es6 entry] DONE:', OUTPUT_PATH);