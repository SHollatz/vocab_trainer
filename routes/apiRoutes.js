var db = require("../models");

module.exports = function(app) {
  // Get all examples
<<<<<<< Updated upstream
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
=======
  app.get("/api/words", function(req, res) {
    db.Word.findAll({}).then(function(dbWords) {
      res.json(dbWords);
>>>>>>> Stashed changes
    });
  });

  // Create a new example
<<<<<<< Updated upstream
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
=======
  app.post("/api/words", function(req, res) {
    db.Word.create(req.body).then(function(dbWords) {
      res.json(dbWords);
>>>>>>> Stashed changes
    });
  });

  // Delete an example by id
<<<<<<< Updated upstream
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
=======
  app.delete("/api/words/:id", function(req, res) {
    db.Word.destroy({ where: { id: req.params.id } }).then(function(dbWords) {
      res.json(dbWords);
>>>>>>> Stashed changes
    });
  });
};
