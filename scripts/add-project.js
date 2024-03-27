const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);

if (args.length < 1) {
  console.log('Usage: node scripts/add-project.js "<title>"');
  process.exit(1);
}

// https://www.geeksforgeeks.org/how-to-convert-a-string-into-kebab-case-using-javascript/
const kebabCase = (str) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2") // replace "camelCase" to "camel-case"
    .replace(/[\s_\/]+/g, "-") // Replace spaces, underscore, and slash with - (dash)
    .toLowerCase();

const title = args[0];
const titleSlug = kebabCase(title);
const todaysDate = new Date().toISOString().split("T")[0];

// Create content
const content = `---
title: ${title}
date: ${todaysDate}
image: /static/change-this.jpg
---

`; // looks weird but its not a mistake

// Create post
const projectsDir = path.join(process.cwd(), "src/project");
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir);
}
const projectFile = path.resolve(projectsDir, `${titleSlug}.md`);
fs.writeFileSync(projectFile, content);

console.log(`Created project "${title}" in ${projectFile}`);
