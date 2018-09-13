//var express = require("express");

var db = require("../models");

//console.log(db);
module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Word.findAll({}).then(function(dbWords) {
      res.render("home", {
        msg: "Welcome!",
        word: dbWords
      });
    });
  });

  app.get("/words", function(req, res) {
    db.Word.findOne({ where: { word: req.params.word } }).then(function(dbWords) {
      res.render("words", {
        word: dbWords
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/words/:word?", function(req, res) {
    db.Word.findOne({ where: { word: req.params.word } }).then(function(dbWords) {
      res.render("words", {
        word: dbWords
      });
    });
  });

  // Load example page and pass in an example by id
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
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
