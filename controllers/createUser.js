
module.exports = function createUser(name) {
  const sha1 = require('sha1');
  const db = require('../models/index');
  const random = String(Date.now()) + String(parseInt(Math.random() * 10000));
  const token = sha1(name + random);
  console.log(token);
  return db.Users.create({
    name: name,
    token: token,
  });

};

