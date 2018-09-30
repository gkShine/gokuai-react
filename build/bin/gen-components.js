var fs = require('fs');
var render = require('json-templater/string');
var path = require('path');
var endOfLine = require('os').EOL;

var OUTPUT_PATH = path.join(__dirname, '../../components.json');
var COMPONENT_TEMPLATE = '  "{{name}}": "./packages/{{name}}/index.js"';
var MAIN_TEMPLATE = `{
{{list}}
}`;

var ComponentNames = fs.readdirSync('./packages');
var listTemplate = [];

ComponentNames.forEach(name => {
  if (name === 'default-theme') {
    return;
  }
  listTemplate.push(render(COMPONENT_TEMPLATE, {
    name: name
  }));
});

var template = render(MAIN_TEMPLATE, {
  list: listTemplate.join(',' + endOfLine)
});


fs.writeFileSync(OUTPUT_PATH, template);
console.log('[gen components] DONE:', OUTPUT_PATH);