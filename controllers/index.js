const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);

let controllers = {};

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    controllers[file.split(".")[0]] = require("./" + file);
  });

module.exports = controllers;
