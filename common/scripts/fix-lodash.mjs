import fs from "fs"
import path from "path"
import { directory } from "./directory.mjs"

// Recursive function to process files in the directory
function processFiles(dirPath) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      // Process the file
      replaceLodashImports(filePath);
    } else if (stats.isDirectory()) {
      // Recursively process subdirectories
      processFiles(filePath);
    }
  });
}

// Function to replace lodash imports in a file
function replaceLodashImports(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${filePath}`, err);
      return;
    }

    // Replace lodash imports using regular expression
    const updatedData = data.replace(/(import\s+\w+\s+from\s+["'])(lodash\/[\w/]+)(["'];)/g, (match, p1, p2, p3) => {
      return `${p1}${p2}.js${p3}`;
    });

    if (updatedData !== data) {
      // Write the updated content back to the file
      fs.writeFile(filePath, updatedData, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file: ${filePath}`, err);
        } else {
          console.log(`File updated: ${filePath}`);
        }
      });
    }
  });
}

// Start processing files in the specified directory
processFiles(directory);
