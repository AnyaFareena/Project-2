const controllers = require('../controllers/index');
const router = require('express').Router();
const db = require("../models");

router.get('/questions/:category/:difficulty', (req, res) => {
    new Promise(function(resolve, reject) {
        resolve(controllers.getQuestions(req.params.category, req.params.difficulty));
    }).then(function(result) {
        res.json(result);
    });
});

router.get('/token/:token', function(req, res) {
    new Promise(function(resolve, reject) {
        resolve(controllers.getUserByToken(req.params.token));
    }).then(function(result) {
        res.json(result);
      });
  });

  router.get('/locations', function(req, res) {
    new Promise(function(resolve, reject) {
        resolve(controllers.getLocations());
    }).then(function(result) {
      res.json(result);
    });
});

router.get('/users/:id', function(req, res){
    new Promise(function(resolve, reject) {
        resolve(controllers.getUser(req.params.id));
    }).then(function(result) {
      res.json(result);
    });
});

router.get('/characters/:user_id', function(req, res){
    new Promise(function(resolve, reject) {
        resolve(controllers.getCharacters(req.params.user_id));
    }).then(function(result) {
      res.json(result);
    });
});

router.post('/users', (req, res) => {
    new Promise(function(resolve, reject) {
        console.log(req.body);
        resolve(controllers.createUser(req.body.name));
    }).then(function(result) {
        res.json(result);
    });
});
 router.get('/about', function (req, res) { res.send('About this wiki'); })

router.post('/characters', (req, res) => {
    new Promise(function(resolve, reject) {
        console.log(req.body);
        resolve(controllers.createCharacter(req.body.name, req.body.user_id));
    }).then(function(result) {
        res.json(result);
    });
});

router.put('/updateCharacter/:id', (req, res) => {
    let host = req.headers.host;
    let origin = req.headers.origin;
    let regex = new RegExp(host, "gi");
    let check = regex.test(origin);
    console.log(host, origin, check);
    if (check) {
        new Promise(function(resolve, reject) {
            console.log(req.headers);
            console.log(req.body);
            resolve(controllers.updateCharacter(req.params.id, req.body.points));
        }).then(function(result) {
            res.json(result);
        });
    } else {
        res.status(401).json(null);
    }
});

router.delete('/deleteCharacter/:id', function(req, res){
    let host = req.headers.host;
    let origin = req.headers.origin;
    let regex = new RegExp(host, "gi");
    let check = regex.test(origin);
    console.log(host, origin, check);
    if (check) {
        new Promise(function(resolve, reject) {
            resolve(controllers.deleteCharacter(req.params.id));
        }).then(function(result) {
            res.json(result);
        });
    } else {
        res.status(401).json(null);
    }
});


module.exports = router;
