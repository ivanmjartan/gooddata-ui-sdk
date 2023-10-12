import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { EXAMPLE_CODESANDBOX_PATH_TEMPLATE } from './constants.mjs';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const TEMPLATE_DIR = path.join(__dirname, '../', 'examples-template');
const EXAMPLES_DIR = path.join(__dirname, '../', 'examples');

// Exclude node_modules, .rush, and src/example directories
const EXCLUDE = "--exclude node_modules --exclude .rush --exclude src/example";

// Copy the contents of examples-template to all examples
fs.readdirSync(EXAMPLES_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .forEach(dirent => {
        console.log('Updating example:',dirent.name);

        const EXAMPLE_PATH = path.join(EXAMPLES_DIR, dirent.name);
        const EXAMPLE_PACKAGE_JSON_PATH = path.join(EXAMPLE_PATH, 'package.json');

        // Read the original package.json to get the name, title, and description values
        const originalPackageJson = JSON.parse(fs.readFileSync(EXAMPLE_PACKAGE_JSON_PATH, 'utf-8'));
        
        const originalName = originalPackageJson.name;        
        const originalTitle = originalPackageJson.title;
        const originalDescription = originalPackageJson.description;

        // Copy the contents from TEMPLATE_DIR to EXAMPLE_PATH, excluding node_modules, .rush, and src/example directories
        execSync(`rsync -av --delete --progress ${TEMPLATE_DIR}/ ${EXAMPLE_PATH}/ ${EXCLUDE}/`);

        // Update the package.json name, title, and description values
        const updatedPackageJson = JSON.parse(fs.readFileSync(EXAMPLE_PACKAGE_JSON_PATH, 'utf-8'));
        updatedPackageJson.name = originalName;
        updatedPackageJson.title = originalTitle;
        updatedPackageJson.description = originalDescription;

        fs.writeFileSync(EXAMPLE_PACKAGE_JSON_PATH, JSON.stringify(updatedPackageJson, null, 2));

        // Update ./.codesandbox/template.json
        const templateJsonPath = path.join(EXAMPLE_PATH, '.codesandbox', 'template.json');
        const templateJson = JSON.parse(fs.readFileSync(templateJsonPath, 'utf-8'));
        templateJson.title = originalTitle;
        templateJson.description = originalDescription;

        fs.writeFileSync(templateJsonPath, JSON.stringify(templateJson, null, 2));

        //Update ./README.md

        const EXAMPLE_README_PATH = path.join(EXAMPLE_PATH, 'README.md');
        let readme = fs.readFileSync(EXAMPLE_README_PATH, 'utf-8');
        readme = readme.replace('{EXAMPLE-TITLE}', originalTitle);
        readme = readme.replace('{EXAMPLE-DESCRIPTION}', originalDescription);
        
        const exampleSandBoxPath = EXAMPLE_CODESANDBOX_PATH_TEMPLATE.replace('{EXAMPLE-DIR}', dirent.name);

        readme = readme.replace('{CODESANDBOX-PATH}', exampleSandBoxPath);
        
        fs.writeFileSync(EXAMPLE_README_PATH, readme);
    });

console.log('Update completed.');

console.log('run rush update.');

// Run "rush update"
execSync('rush update', { stdio: 'inherit' });