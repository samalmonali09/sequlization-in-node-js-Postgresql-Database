var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
app.get('/users', function(req, res) {
  users.findAll().then(users => res.json(users));
});