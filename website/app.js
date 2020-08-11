/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q='
let apiKey= '&APPID=3d42d650d5ee6afd9dfb820e0f1d4ff4&units=metric'
// Create a new date instance dynamically with 
let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
let day= days[d.getDay()];// generate the day of the week

document.getElementById('generate').addEventListener('click',getData)

function getData (e) {
    document.getElementsByClassName('error')[0].innerHTML=''//reset the error message content
    const zipCode = document.getElementById('zip').value// getting the zip code or the city name value
    const feelings = document.getElementById('feelings').value// getting the feeling value
    getWeather(baseURL,zipCode,apiKey)
    .then(
        function(data){
            console.log(data)
            const {name, sys, weather } = data// getting the weather data from the api
            console.log( name, sys, weather )
            postData('/add',{date:newDate, temp:Math.round((data.main.temp)),
                            feelings: feelings, name:data.name, sys:data.sys, weather: data.weather})//posting data to server
            updateUI()
        }
    ).catch((error)=>{
        document.getElementsByClassName('error')[0].innerHTML='Please Enter a valid Zip Code!'
        console.log('errors',error)// catching errors and send a message with it
    })
}

const getWeather = async (baseURL,zipCode,apiKey) => {// fetching data from the weather api
    const res = await fetch(baseURL+zipCode+apiKey)
    try {
        const data = await res.json()
        console.log(data)
        return data
    } catch(error){
        console.log('error',error)
    }
}

const postData = async (url='', data={})=>{// posting new data to server
    const response = await fetch(url,{
        method:'POST',
        credentials:"same-origin",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    try{
        const newData = await response.json()
        console.log(newData)
        return newData
    }catch(error){
        console.log('errors',error)
    }
}

const updateUI = async() => {// updating the ui with the new data from user and api
    const request = await fetch('/all')
    try{
        const allData = await request.json()
        console.log(allData)
        const icon = `https://openweathermap.org/img/wn/${allData.weather[0]["icon"]}@2x.png`;// getting the weather icons from openweathermap web app
        
        document.getElementsByClassName('entry')[0].classList.remove('toggle')// removeing the toggle class to display the weather card
        document.getElementsByClassName('name')[0].innerHTML= allData.name// adding the city name to ui
        document.getElementsByClassName('sys')[0].innerHTML= allData.sys.country// adding the country name to ui
        document.getElementsByClassName('date')[0].innerHTML= `<span>${day}</span>&nbsp;`+allData.date// adding the date to ui
        document.getElementsByClassName('temp')[0].innerHTML= allData.temp+`<sup>°C</sup>`// adding the temp to ui
        document.getElementsByClassName('content')[0].innerHTML=allData.feelings// adding the user's feelings to ui
        document.getElementsByClassName('city-icon')[0].src=icon// adding the weather icon to ui
        document.getElementsByClassName('weather')[0].innerHTML=allData.weather[0]['description']// adding theweather descreption to ui
    }catch(error){
        document.getElementsByClassName('error')[0].innerHTML='Please Enter a valid Zip Code!'// catching errors
        console.log('errors',error)
    }
}