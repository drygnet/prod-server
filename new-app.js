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

inquirer.prompt(questions).then(answers => {
  console.log(`Creating App: ${answers['name']}! DB-Collection: ${answers['collection']}`)
  ncp('./src/apps/_template', `./src/apps/${answers['name']}`, async (res) => {
    await replace({
      files: `./src/apps/${answers['name']}/index.ts`,
      from: /templateApp/g,
      to: answers['name'],
    })
    await replace({
      files: `./src/apps/${answers['name']}/index.ts`,
      from: /templateCollection/g,
      to: answers['collection'],
    })
    await replace({
      files: `./src/apps/${answers['name']}/index.ts`,
      from: /templateItem/g,
      to: answers['item'],
    })
    await replace({
      files: `./src/apps/${answers['name']}/schemas.ts`,
      from: /templateItem/g,
      to: answers['item'],
    })
    console.log('App created, edit the schema and add the app to ./apps/index.ts')
  })

})