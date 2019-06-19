var db = require("../models");

module.exports = function(app) {
  app.get("/api/words", function(req, res) {
    db.Word.findAll({}).then(function(dbWords) {
      res.json(dbWords);
    });
  });

  app.post("/api/words", function(req, res) {
    db.Word.create(req.body).then(function(dbWords) {
      res.json(dbWords);
    });
  });
};
