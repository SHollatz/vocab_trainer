var db = require("../models");

module.exports = function(app) {
  // Get all examples

  app.get("/api/words", function(req, res) {
    db.Word.findAll({}).then(function(dbWords) {
      res.json(dbWords);
    });
  });

  // Create a new example

  app.post("/api/words", function(req, res) {
    db.Word.create(req.body).then(function(dbWords) {
      res.json(dbWords);
    });
  });

  // Delete an example by id
  app.delete("/api/words/:id", function(req, res) {
    db.Word.destroy({ where: { id: req.params.id } }).then(function(dbWords) {
      res.json(dbWords);
    });
  });
};
