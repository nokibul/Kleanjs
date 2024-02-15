const yargs = require('./index.yargs');
const find = require('find');
const fs = require('fs');
const path = require('path');
const { generateControllers } = require('./controller.generator');

const directoryToSearch = process.cwd();


function createFolder(location, folderName) {
    const folderPath = path.join(location, folderName);
    fs.mkdir(folderPath, { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating folder:', err);
        } else {

            console.log('Folder created successfully:', folderPath);
        }
    });
}

function createFile(filePath, fileContent) {
    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error('Error creating file:', err);
        } else {
            console.log('File created successfully:', filePath);
        }
    });
}

let files = [
    {
        name: ''
    }
]

yargs.command('module <name>', 'create a mvc module', (yargs) => {
    yargs.positional('name', {
        describe: 'Name of the module',
        type: 'string'
    })
    }, (argv) => {
        find.dir('server', directoryToSearch, (directories) => {
            if (directories.length > 0) {
                console.log('Directory found:', directories[0]);
                if (directories[0]) {
                    createFolder(directories[0], argv.name);
                    let fileExtensions = ['controller.js','model.js', 'validation.js','service.js'];
                    fileExtensions.forEach((extension) => {
                        const fileName = argv.name + '.' + extension;
                        console.log(fileName)
                        let content = '';
                        //get content
                        if(extension == 'controller.js'){
                            content = generateControllers(argv.name);
                        }

                        createFile(`${directories[0]}/${argv.name}` + `/${fileName}`, content);
                    });
                    console.log(`Module ${argv.name} created, hurrah!`);
                }
            } else {
                console.log('Directory not found');
            }
        });
    })

module.exports = yargs;