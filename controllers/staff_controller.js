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
  transaction:[
    {id:'1',status:'preparing',client:'James',gross_total:23.97,tax_amount:3.12,net_total:27.09},
    {id:'2',status:'receive order',client:'Doug',gross_total:70.94,tax_amount:9.22,net_total:80.16},
    {id:'3',status:'preparing',client:'Etam',gross_total:26.97,tax_amount:3.51,net_total:30.48},
    {id:'4',status:'receive order',client:'Haley',gross_total:62.94,tax_amount:7.55,net_total:70.49},
    {id:'5',status:'preparing',client:'Anna',gross_total:64.93,tax_amount:7.79,net_total:72.72},
    {id:'6',status:'receive order',client:'Sadia',gross_total:56.95,tax_amount:7.4,net_total:64.35}
  ],
  order:[
    {id:'1',order:'Pizza',quantity:1, transaction_id:'1'},
    {id:'2',order:'Burger',quantity:2,transaction_id:'1'},
    {id:'3',order:'Pasta',quantity:3,transaction_id:'2'},
    {id:'4',order:'Steak',quantity:1,transaction_id:'2'},
    {id:'5',order:'Pizza',quantity:2,transaction_id:'2'},
    {id:'6',order:'Burger',quantity:3,transaction_id:'3'},
    {id:'7',order:'Pizza',quantity:1,transaction_id:'4'},
    {id:'8',order:'Burger',quantity:2,transaction_id:'4'},
    {id:'9',order:'Pasta',quantity:3,transaction_id:'4'},
    {id:'10',order:'Steak',quantity:1,transaction_id:'5'},
    {id:'11',order:'Pizza',quantity:2,transaction_id:'5'},
    {id:'12',order:'Burger',quantity:3,transaction_id:'5'},
    {id:'13',order:'Pizza',quantity:1,transaction_id:'5'},
    {id:'14',order:'Burger',quantity:2,transaction_id:'6'},
    {id:'15',order:'Pasta',quantity:3,transaction_id:'6'},

  ],
  product:[
    {id:"1",description:'Pizza',price:'5.99',image:''},
    {id:"2",description:'Burger',price:'8.99',image:''},
    {id:"3",description:'Pasta',price:'12.99',image:''},
    {id:"4",description:'Steak',price:'19.99',image:''}
  ]
}

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
  res.render("staff-dashboard", data);
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
