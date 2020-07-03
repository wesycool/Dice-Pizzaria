require('dotenv').config()
const express = require("express");
const staffIndexJSON = require('../db/staff-index.json')
const fetch = require('node-fetch')
const db = require( '../config/connection.js' )

const router = express.Router();



//testing data
const data = {
  staff:[
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
  ],
  product:[
    {id:"1",description:'Pizza',price:'5.99',image:''},
    {id:"2",description:'Burger',price:'8.99',image:''},
    {id:"3",description:'Pasta',price:'12.99',image:''},
    {id:"4",description:'Steak',price:'19.99',image:''}
  ]}

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
    res.render("index");
});

router.get("/staff-portal/login", (req, res) => {
  res.render("staff-login");
});

router.get("/staff-portal/", (req, res) => {
  res.render("staff-index", staffIndexJSON);
});

router.get("/staff-portal/dashboard", (req, res) => {
  res.render("staff-dashboard", {staff});
});

router.get('/staff-portal/api/:tab', (req,res) => {
  res.send(data[req.params.tab])
})


// Get weather data - To fetch weather api data while hidding API key
router.get('/staff-portal/api/:api/:units/:lat/:lon', async (req,res) => {
  const {api, units, lat, lon} = req.params
  const url = `https://api.openweathermap.org/data/2.5/${api}?units=${units}&lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API}`
  const getWeather= await fetch(url).then(data => data.json())
  res.send(getWeather)
})



// Export routes for server.js to use.
module.exports = router;
