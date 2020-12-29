const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const User = require("../models/User");




// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

router.get("/stats", (req, res) => {
  User.countDocuments()
    .then(userCount => {

      res.render("stats", {
        userCount
      })
    })
    .catch(err => console.log(err))
});

//User Quiz
router.get("/user/:username", (req, res) => {

  User.findOne({ username: req.params.username }).then((person) => {
    if (person) {
      res.render("quiz", {
        user: req.user,
        person: person.name,
      });
    } else {
      res.render("404");
    }
  })
    .catch(err => console.log(err))
});
router.post("/user/:username", (req, res) => {
  console.log(req.params);
  User.findOne({ username: req.params.username }).then((person) => {
    if (person) {
      message = req.body
      console.log(req.body);
      person.messages.push(message)
      person.save().then(
        res.json({
          message: "Answers sent successfully now it's your turn"
        })
      )
        .catch(err => console.log(err))
    } else {
      console.log("not found");
      res.json({
        message: "not found"
      })
    }
  })
});

router.get("/login", forwardAuthenticated, (req, res) => res.redirect("/users/login"));



// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    user: req.user,
  })
);


//404
// router.get("/*", (req, res) => res.render("404"));

module.exports = router;
