module.exports = function createCharacter(name, user_id) {
  const db = require('../models/index');
  return db.Characters.create({
    name: name,
    user_id: user_id
  });
};
