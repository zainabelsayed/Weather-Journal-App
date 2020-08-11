// Setup empty JS object to act as endpoint for all routes
projectData = {}
 const express = require('express')
// Require Express to run server and routes
const app = express()
// Start up an instance of app
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const cors = require('cors');
// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'))
// Setup Server
const port = 3000
const server = app.listen(port,listening)
function listening (){
    console.log(`server running on ${port}`)
}


app.get('/all', sendData)

 function sendData(req,res) {// sending data to the projectData object
    res.send(projectData)
 }

 app.post('/add', callBack)

 function callBack(req,res){
   projectData = {// adding new data to the project data
        date: req.body.date,
        temp: req.body.temp,
        feelings: req.body.feelings,
        name: req.body.name,
        sys:req.body.sys,
        weather:req.body.weather
   }
   res.send(projectData)
   console.log(projectData)
 }

 
