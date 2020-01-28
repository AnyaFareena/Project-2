module.exports = function updateCharacter(id, points) {
  const db = require('../models/index');
  return db.Characters.update({ points: points }, {
    where: {
      id: id
    }
  });
};
