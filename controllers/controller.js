require('dotenv').config()
const express = require("express");
const staffIndexJSON = require('../db/staff-index.json')
const fetch = require('node-fetch')
const models = require("../models/models");

const router = express.Router();


// Create all our routes and set up logic within those routes where required.

// Get Client Main Page
router.get("/", (req, res) => {
    res.render("index");
});

// Get Staff Portal Login Page
router.get("/staff-portal/login", (req, res) => {
  res.render("staff-login");
});

// Get Staff Portal Page
router.get("/staff-portal/", (req, res) => {
  res.render("staff-index", staffIndexJSON);
});

// Get Staff Dashboard Page
router.get("/staff-portal/dashboard", (req, res) => {
  res.render("staff-dashboard");
});

// Get Data of a Table
router.get('/staff-portal/api/table/:tab', async (req,res) => {
  const getData = await models.selectAll(req.params.tab)
  res.send(getData)
})

// Get Data by Params
router.get('/staff-portal/api/table/:tab/:field/:params', async (req,res) => {
  const {tab,field,params} = req.params
  const getData = await models.getByParams(tab,field,params)
  res.send(getData)
})

// Get Data of Joint Table
router.get('/staff-portal/api/join/alltrans', async (req,res) => {
  const list = await models.getJoinAll()
  res.send(list)
})

// Update Setting Params
router.put('/staff-portal/api/setting/:col/:set_params/:where_params', (req,res) => {
  models.updateByParams('staff',req.params.col,req.params.set_params,'email',req.params.where_params)
})

// Post Staff TimeSheet
router.post('/staff-portal/api/timesheet/:staff_id/:workdays', (req,res) =>{
  models.insertByParams('timesheet',req.params)
})

//Delete Staff TimeSheet
router.delete('/staff-portal/api/timesheet/:staff_id/:workdays', (req,res) =>{
  models.deleteByParams('timesheet',req.params)
})

// Post Product Items
router.post('/staff-portal/api/products/:description/:size/:set_price/:archive', (req,res) => {
  models.insertByParams('products',req.params)
})

// Update Product Items
router.put('/staff-portal/api/products/:col/:set_params/:where_params', (req,res) => {
  models.updateByParams('products',req.params.col,req.params.set_params,'id',req.params.where_params)
})

// Get weather data - To fetch weather api data while hidding API key
router.get('/staff-portal/api/:api/:units/:lat/:lon', async (req,res) => {
  const {api, units, lat, lon} = req.params
  const url = `https://api.openweathermap.org/data/2.5/${api}?units=${units}&lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API}`
  const getWeather= await fetch(url).then(data => data.json())
  res.send(getWeather)
})




//Pats test
router.get('/staff-portal/api/post/:id/:status', async (req, res) => {
  const {id, status} = req.params
  const test = "Transaction status updated !"
  await models.updateStatus(id, status)
  res.send(test)
})

// Post Test
router.post('/posttest', function(req, res){
  console.log(req.body);      // your JSON
  res.send("Received");    // echo the result back
});


// Export routes for server.js to use.
module.exports = router;


