module.exports = function getLocations() {
  const db = require('../models/index');
  return db.Locations.findAll();
};
