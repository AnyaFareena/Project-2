
const Sequelize = require('sequelize');
const sequelize = new Sequelize('dbname', 'dbuser', 'dbpassword', {
    host: 'mydb.host.com',
    dialect: 'mysql',
    operatorsAliases: false,
    dialectOptions: {
        dateStrings: true,
        typeCast: function (field, next) { 
            if (field.type === 'DATETIME') {
                return field.string()
            }
            return next()
        },
    },
    timezone: "Canada/Toronto"
});

const User = require('../models/users')(sequelize, Sequelize); 

module.exports = {
    getOneUser: function() {
        return new Promise((resolve, reject) => {
            User.findOne().then(user => {

                console.log('user name is '+JSON.stringify(user));
                resolve(user);
            }).catch(err => {
                console.log('error occurred', err);
                reject(err);
            });
        });
    }
};
