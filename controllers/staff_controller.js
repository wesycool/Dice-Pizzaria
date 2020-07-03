require('dotenv').config()
const express = require("express");
const staffIndexJSON = require('../db/staff-index.json')
const staffColorJSON = require('../db/staff-color.json');
const fetch = require('node-fetch')


const router = express.Router();

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

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    res.render("index");
});

router.get("/staff-portal/login", function(req, res) {
  res.render("staff-login");
});

router.get("/staff-portal/", function(req, res) {
  res.render("staff-index", staffIndexJSON);
});

router.get("/staff-portal/dashboard", function(req, res) {
  res.render("staff-dashboard", {staff});
});

router.get('/staff-portal/api/staff', function(req,res){
  res.send(staff)
})

router.get('/staff-portal/api/color', function(req,res){
  res.send(staffColorJSON)
})


router.get('/staff-portal/api/:api/:units/:lat/:lon', async (req,res) => {
  const {api, units, lat, lon} = req.params
  const url = `https://api.openweathermap.org/data/2.5/${api}?units=${units}&lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API}`
  const getWeather= await fetch(url).then(data => data.json())
  res.send(getWeather)
})


// Export routes for server.js to use.
module.exports = router;
