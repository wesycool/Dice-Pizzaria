require('dotenv').config()

const express = require('express')
const staffIndexJSON = require('../db/staff-index.json')
const fetch = require('node-fetch')
const models = require('../models/models')

const router = express.Router()


// Create all our routes and set up logic within those routes where required.

router.get('/', (req, res) => {
    res.render('index');
});

// Get Staff Portal Login Page
router.get('/staff-portal/login', (req, res) => {
    res.render('staff-login');
});

// Get Staff Portal Page
router.get('/staff-portal/', (req, res) => {
    res.render('staff-index', staffIndexJSON);
});

// Get Staff Dashboard Page
router.get('/staff-portal/dashboard', (req, res) => {
    res.render('staff-dashboard');
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


// Post Setting Params
router.post('/staff-portal/api/setting/:email/:password/:first_name/:last_name/:address/:city/:province/:postal_code/:phone/:role_id/:manager_id/:theme/:units', (req,res) => {
    models.insertByParams('staff',req.params)
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


// Post Client Profile
router.post('/staff-portal/api/client/:email/:password/:first_name/:last_name/:address/:address2/:country/:province/:city/:postal_code/:phone', (req,res) => {
    models.insertByParams('client',req.params)
})

// Update Client Profile
router.put('/staff-portal/api/client/:col/:set_params/:where_params', (req,res) => {
    models.updateByParams('client',req.params.col,req.params.set_params,'id',req.params.where_params)
})


// Post Transaction
router.post('/staff-portal/api/transaction/:client_id/:email/:first_name/:last_name/:status/:isDelivery/:isPaid/:gross_total/:tax_amount/:net_total', (req,res) => {
    models.insertByParams('transactions',req.params)
})

// Update Transaction
router.put('/staff-portal/api/transaction/:col/:set_params/:where_params', (req,res) => {
    models.updateByParams('transactions',req.params.col,req.params.set_params,'email',req.params.where_params)
})


// Post Order
router.post('/staff-portal/api/order_info/:email/:transaction_id/:product_id/:addinfo/:quantity/:order_price', (req,res) => {
    models.insertByParams('order_info',req.params)
})

// Update Order
router.put('/staff-portal/api/order_info/:col/:set_params/:where_params1/', (req,res) => {
    models.updateByParams('order_info',req.params.col,req.params.set_params,'email',req.params.where_params1)
})


// Get weather data - To fetch weather api data while hidding API key
router.get('/staff-portal/api/:api/:units/:lat/:lon', async (req,res) => {
    const {api, units, lat, lon} = req.params
    const url = `https://api.openweathermap.org/data/2.5/${api}?units=${units}&lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API}`
    const getWeather= await fetch(url).then(data => data.json())
    res.send(getWeather)
})



//Pats Dashboard
router.get('/staff-portal/api/post/:id/:status', async (req, res) => {
    const {id, status} = req.params
    const test = 'Transaction status updated !'
    await models.updateStatus(id, status)
    res.send(test)
})


// // Post Test
// router.post('/staff-portal/api/:table', function (req, res) {
//   models.addNow(req.params.table, req.body)
// 	res.send('Received') // echo the result back
// })

// fetch('/staff-portal/api/:table',{
//   method:'POST',
//   header: {'Accept': 'application/json', 'Content-Type': 'application/json'},
//   body: JSON.stringify(body)
// })


// Export routes for server.js to use.
module.exports = router