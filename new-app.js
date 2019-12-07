const inquirer = require('inquirer')
const ncp = require('ncp')
const replace = require('replace-in-file');

var questions = [{
    type: 'input',
    name: 'name',
    message: "App name",
},
{
    type: 'input',
    name: 'collection',
    message: "Main collection name e.g 'cases', do not repeat app name",
},
{
    type: 'input',
    name: 'item',
    message: "Main item name e.g 'case'",
}

]

inquirer.prompt(questions).then(async answers => {
    console.log(`Creating App: ${answers['name']}! DB-Collection: ${answers['collection']}`)
    await ncp('./src/apps/_template', `./src/apps/${answers['name']}`)
    await replace({
        files: `./src/apps/${answers['name']}/index.ts`,
        from: 'templateApp',
        to: answers['name'],
    })
    await replace({
        files: `./src/apps/${answers['name']}/index.ts`,
        from: 'templateCollection',
        to: answers['collection'],
    })
    await replace({
        files: `./src/apps/${answers['name']}/schemas.ts`,
        from: 'templateItem',
        to: answers['item'],
    })
})