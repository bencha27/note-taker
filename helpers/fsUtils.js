const fs = require('fs');
const util = require('util');

// Function to read data from a given file
const readFromFile = util.promisify(fs.readFile);

// Function to write data to a given file
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 2), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`));

// Function to read data from a given file and append content
const readAndAppend = (file, content) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };
