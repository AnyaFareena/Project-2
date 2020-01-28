module.exports = function deleteCharacter(id) {
  const db = require('../models/index');
  return db.Characters.destroy({
    where: {
      id: id
    }
  });
};
