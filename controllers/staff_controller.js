const express = require("express");
const staffIndexJSON = require('../docs/staff-index.json')
const staffColorJSON = require('../docs/staff-color.json')

const router = express.Router();


// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    res.render("index");
});


router.get("/staff-portal/", function(req, res) {
  res.render("staff-index", staffIndexJSON);
});

//testing data
const staff =[
  {id:"1",first_name:"Chet",last_name:"M",role:"Intern",department:"Information Technology"},
  {id:"2",first_name:"Christine",last_name:"C",role:"Developer",department:"Information Technology"},
  {id:"3",first_name:"Shayanne",last_name:"S",role:"Developer",department:"Information Technology"},
  {id:"4",first_name:"Pat",last_name:"A",role:"Developer",department:"Information Technology"},
  {id:"5",first_name:"Moni",last_name:"B",role:"Intern",department:"Information Technology"},
  {id:"6",first_name:"Chet",last_name:"M",role:"Intern",department:"Information Technology"},
  {id:"7",first_name:"Christine",last_name:"C",role:"Developer",department:"Information Technology"},
  {id:"8",first_name:"Shayanne",last_name:"S",role:"Developer",department:"Information Technology"},
  {id:"9",first_name:"Pat",last_name:"A",role:"Developer",department:"Information Technology"},
  {id:"10",first_name:"Moni",last_name:"B",role:"Intern",department:"Information Technology"},
  {id:"11",first_name:"Chet",last_name:"M",role:"Intern",department:"Information Technology"},
  {id:"12",first_name:"Christine",last_name:"C",role:"Developer",department:"Information Technology"},
  {id:"13",first_name:"Shayanne",last_name:"S",role:"Developer",department:"Information Technology"},
  {id:"14",first_name:"Pat",last_name:"A",role:"Developer",department:"Information Technology"},
  {id:"15",first_name:"Moni",last_name:"B",role:"Intern",department:"Information Technology"}
]

router.get('/staff-portal/api/staff', function(req,res){
  res.send(staff)
})

router.get('/staff-portal/api/color', function(req,res){
  res.send(staffColorJSON)
})

router.get("/staff-portal/login", function(req, res) {
  res.render("staff-login");
});

// Export routes for server.js to use.
module.exports = router;
