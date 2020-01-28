module.exports = function getUserByToken(token) {
  const db = require('../models/index');
  return db.Users.findOne({
    where: {
      token: token
    }
  });
};
