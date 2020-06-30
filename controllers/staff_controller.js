const express = require("express");
const staff = require('../docs/staff.json')

var router = express.Router();


// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    res.render("index");
});


router.get("/staff-portal/", function(req, res) {

  res.render("staff-index", staff);
});

router.get("/staff-portal/login", function(req, res) {
  res.render("staff-login");
});

// Export routes for server.js to use.
module.exports = router;
