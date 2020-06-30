var express = require("express");

var router = express.Router();

const tabName = [
  {id:'home',name:'Home',icon:'fa-home',partial:'staff/home',home:true},
  {id:'calendar',name:'Time Sheet',icon:'fa-calendar-alt',partial:'staff/calendar'},
  {id:'staff',name:'Staff',icon:'fa-users',partial:'staff/staff'},
  {id:'setting',name:'Setting',icon:'fa-cog',partial:'staff/setting'},
  {id:'logout',name:'Log Out',icon:'fa-sign-out-alt',logout:true}
]

const modal = [{
    modal_id:'weatherModal',
    title_id:'modalHeader',title_content:'Weather Forecast',
    body_id:'forecast',body_content:'',
  },
  {
    modal_id:'logoutModal',
    title_id:'logoutHeader',title_content:'Log Out',
    body_id:'logoutContent',body_content:'You are about to log out.',
    btn_id:'confirmLogout',btn_content:'Log Out'
  },
  {
    modal_id:'deleteModal',
    title_id:'deleteHeader',title_content:'Delete Account',
    body_id:'deleteBody',body_content:'You are about to delete your account.',
    btn_id:'deleteAccount',btn_content:'Delete'
  }
]
// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    res.render("index");
});


router.get("/staff-portal/", function(req, res) {
  res.render("staff-index", {tabName,modal});
});

router.get("/staff-portal/login", function(req, res) {
  res.render("staff-login");
});



// Export routes for server.js to use.
module.exports = router;
