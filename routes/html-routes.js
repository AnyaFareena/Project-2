const router = require('express').Router();
const exphbs = require("express-handlebars");

router.get('/', (req, res) => {
  res.render("index");
});

router.get('/:token', (req, res) => {
  res.render("game", { token: req.params.token });
});

// Place this route below all others to send he index.html file
// to any request that is not explicitly defined above
/*
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
*/

module.exports = router;
