module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/games", function(req, res) {
    res.render("games");
  });

  app.get("/about", function(req, res) {
    res.render("about");
  });

  app.get("*", function(req, res) {
    res.render("404");
  });
};
