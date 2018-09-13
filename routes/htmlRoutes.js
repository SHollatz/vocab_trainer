var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
<<<<<<< Updated upstream
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
=======
  app.get("/words/:translation1?", function(req, res) {
    db.Word.findOne({ where: { translation1: req.params.translation1 } }).then(
      function(dbWords) {
        res.render("words", {
          word: dbWords
        });
      }
    );
  });

  app.get("/games", function(req, res) {
    db.Word.findAll({}).then(function(dbWords) {
      //console.log("inside htmlRoutes, dbWords: ", dbWords);
      res.render("games", {
        word: dbWords
      });
    });
  });

  app.get("/about", function(req, res) {
    db.Word.findAll({}).then(function(dbWords) {
      res.render("about", {
        word: dbWords
>>>>>>> Stashed changes
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
