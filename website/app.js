/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?q='
let apiKey= '&APPID=3d42d650d5ee6afd9dfb820e0f1d4ff4&units=metric'
// Create a new date instance dynamically with 
let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
let day= days[d.getDay()];// generate the day of the week

document.getElementById('generate').addEventListener('click',getData)

function getData (e) {
    e.preventDefault()
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
            //updateUI()
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
        const allData = await response.json()
        console.log(allData)
        document.getElementById('zip').value=''
        document.getElementById('feelings').value=''
        /*const allData = await request.json()
        console.log(allData)*/
        const icon = `https://openweathermap.org/img/wn/${allData.weather[0]["icon"]}@2x.png`;// getting the weather icons from openweathermap web app
        const li = document.createElement('li')
        document.getElementsByClassName('entry')[0].classList.remove('toggle')// removeing the toggle class to display the weather card
        const cities=document.querySelector('.cities')
        li.classList.add('city')
        li.innerHTML=`<div id = "entryHolder">
        <h2 class="city-name">
          <span class="name">${allData.name}</span>
          <sup class="sys">${allData.sys.country}</sup>
        </h2>
        <div class="date" id = "date"><span>${day}</span>&nbsp;${allData.date}</div> 
        <div class="content" id = "content">${allData.feelings}</div>
        <div class="temp" id ="temp">${allData.temp}<sup>°C</sup></div>
          <figure>
            <img class="city-icon" src=${icon}>
            <figcaption class="weather">${allData.weather[0]['description']}</figcaption>
          </figure>
    </div>`
        cities.appendChild(li)
    }catch(error){
        document.getElementsByClassName('error')[0].innerHTML='Please Enter a valid Zip Code!'// catching errors
        console.log('errors',error)
    }
}

/*const updateUI = async() => {// updating the ui with the new data from user and api
    const request = await fetch('/all')
    try{
        document.getElementById('zip').value=''
        document.getElementById('feelings').value=''
        const allData = await request.json()
        console.log(allData)
        const icon = `https://openweathermap.org/img/wn/${allData.weather[0]["icon"]}@2x.png`;// getting the weather icons from openweathermap web app
        const li = document.createElement('li')
        document.getElementsByClassName('entry')[0].classList.remove('toggle')// removeing the toggle class to display the weather card
        const cities=document.querySelector('.cities')
        li.classList.add('city')
        li.innerHTML=`<div id = "entryHolder">
        <h2 class="city-name">
          <span class="name">${allData.name}</span>
          <sup class="sys">${allData.sys.country}</sup>
        </h2>
        <div class="date" id = "date"><span>${day}</span>&nbsp;${allData.date}</div> 
        <div class="content" id = "content">${allData.feelings}</div>
        <div class="temp" id ="temp">${allData.temp}<sup>°C</sup></div>
          <figure>
            <img class="city-icon" src=${icon}>
            <figcaption class="weather">${allData.weather[0]['description']}</figcaption>
          </figure>
    </div>`
        cities.appendChild(li)
    }catch(error){
        document.getElementsByClassName('error')[0].innerHTML='Please Enter a valid Zip Code!'// catching errors
        console.log('errors',error)
    }
}*/
