module.exports = function getCharacters(user_id) {
  const db = require('../models/index');
  return db.Characters.findAll({
    where: {
      user_id: user_id
    }
  });
};
