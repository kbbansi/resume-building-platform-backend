var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200);
  res.json(
    {
      app: "Resume Builder Platform",
      organization:"Work In Ghana Limited",
      version: "1.0.0",
      author: "Kwabena Amo Ampofo",
      alive_since: new Date()
    }
  );

  console.log(Date());
});

module.exports = router;
