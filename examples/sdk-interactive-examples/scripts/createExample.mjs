import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import readline from 'readline';

import { EXAMPLE_CODESANDBOX_PATH_TEMPLATE } from './constants.mjs';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const EXAMPLE_PACKAGE_NAME_PREFIX = '@gooddata/sdk-interactive-';
const TEMPLATE_DIR = path.join(__dirname, '../', 'examples-template');
const EXAMPLES_DIR = path.join(__dirname, '../', 'examples');

const RUSH_JSON_PATH = path.join(__dirname, '../../..', 'rush.json');
const PATH_TO_PRETTIER = path.join(__dirname, '../../..', 'common', 'temp', 'node_modules', '.bin', 'prettier');

let exampleName, exampleTitle, exampleDescription;

function isValidDirectoryName(directoryName) {
    // Must not contain white spaces or spaces
    const noWhiteSpaces = !/\s/.test(directoryName);

    // Must start with "example-"
    const startsWithExample = directoryName.startsWith("example-");

    // Must be a valid directory name
    // For simplicity, we assume a valid directory name doesn't contain the following characters: \ / : * ? " < > |
    const isValidChars = !/[\\/:*?"<>|]/.test(directoryName);

    return noWhiteSpaces && startsWithExample && isValidChars;
}
rl.question('Enter example directory name (should have prefix "example-"): ', (name) => {
    if (fs.existsSync(path.join(EXAMPLES_DIR, name))) {
        console.error('Error: This example directory already exists.');
        process.exit(1);
    }

    if(!isValidDirectoryName(name)){
        console.error('Error: Must not contain white spaces or spaces.');
        console.error('Error: Must start with "example-"');
        console.error('Error: Must be a valid directory name does not contain the following characters: \ / : * ? " < > |');
        process.exit(1);
    }

    exampleName = name;

    rl.question('Enter example title: ', (title) => {
        exampleTitle = title;

        rl.question('Enter example description: ', (description) => {
            exampleDescription = description;

            const NEW_EXAMPLE_DIR = path.join(EXAMPLES_DIR, exampleName);

            // Create new example directory and copy template
            execSync(`rsync -av --progress ${TEMPLATE_DIR}/ ${NEW_EXAMPLE_DIR}/`);

            // Update package.json
            const packageJsonPath = path.join(NEW_EXAMPLE_DIR, 'package.json');
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
            packageJson.name = EXAMPLE_PACKAGE_NAME_PREFIX+exampleName;
            packageJson.description = exampleDescription;
            packageJson.title = exampleTitle;
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
            

            // Update ./.codesandbox/template.json
            const templateJsonPath = path.join(NEW_EXAMPLE_DIR, '.codesandbox', 'template.json');
            const templateJson = JSON.parse(fs.readFileSync(templateJsonPath, 'utf-8'));
            templateJson.title = exampleTitle;
            templateJson.description = exampleDescription;

            fs.writeFileSync(templateJsonPath, JSON.stringify(templateJson, null, 2));
           
            //Update ./README.md

            const EXAMPLE_README_PATH = path.join(NEW_EXAMPLE_DIR, 'README.md');
            let readme = fs.readFileSync(EXAMPLE_README_PATH, 'utf-8');
            readme = readme.replace('{EXAMPLE-TITLE}', exampleTitle);
            readme = readme.replace('{EXAMPLE-DESCRIPTION}', exampleDescription);
        
            const exampleSandBoxPath = EXAMPLE_CODESANDBOX_PATH_TEMPLATE.replace('{EXAMPLE-DIR}', exampleName);

            readme = readme.replace('{CODESANDBOX-PATH}', exampleSandBoxPath);
        
            fs.writeFileSync(EXAMPLE_README_PATH, readme);

            // This is ugly
            // Update rush.json this file is not valid json, so we need to do some string manipulation
            const new_lib_entry = `{
                "packageName":  "${EXAMPLE_PACKAGE_NAME_PREFIX}${exampleName}",
                "projectFolder": "examples/sdk-interactive-examples/examples/${exampleName}",
                "reviewCategory": "examples",
                "versionPolicyName": "sdk",
                "shouldPublish": false
            },`;

            const rushJsonContent = fs.readFileSync(RUSH_JSON_PATH, 'utf-8');
            const updatedContent = rushJsonContent.replace('"projects": [', `"projects": [${new_lib_entry}`);

            fs.writeFileSync(RUSH_JSON_PATH, updatedContent);

            // Format the JSON file using prettier
            execSync(PATH_TO_PRETTIER + " --write " + RUSH_JSON_PATH);

            console.log('Example created successfully.');
            rl.close();

            console.log('run rush update.');

            // Run "rush update"
            execSync('rush update', { stdio: 'inherit' });
        });
    });
});