module.exports = function getUser(id) {
  const db = require('../models/index');
  return db.Users.findOne({
    where: {
      id: id
    }
  });
};
