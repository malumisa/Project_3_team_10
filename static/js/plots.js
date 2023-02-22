console.log(cities);

for(var i=0;i<cities.length;i++){
        row=cities[i];
        let bulk=row.city
        const options = {
        method: 'GET',
        url:`http://api.weatherapi.com/v1/current.json?key=29ad3cbdd70c4198ac704843231502 &q=${bulk}&.json`
        }
        
        const dataPromise = d3.json(options.url);
        console.log("Data Promise: ", dataPromise);
// Fetch the JSON data and console log it
        d3.json(options.url).then(function(data) {
    // console.log(data);
        if (data.location['country'] === 'Canada') {
        // console.log(data);
    }
});
};

// //31acb2c094e3b8adc5fe6b3a88b35505 

// const apiKey = "31acb2c094e3b8adc5fe6b3a88b35505";  
// const KELVIN = 273; 

let d = new Date();
let date = d.getDate();
// console.log(date)
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[d.getMonth()];
let year = d.getFullYear();
document.getElementById('date').innerHTML = date + " "+ month + " " + year;


if('geolocation' in navigator){  
    navigator.geolocation.getCurrentPosition(setPosition);  
}else{  
   alert("Browser doesn't Support Geolocation");
} 

function setPosition(position){  
    let latitude = position.coords.latitude;  
    let longitude = position.coords.longitude;  
      
    checkWeather(latitude, longitude) 
}  

function checkWeather(latitude, longitude) {

let api = `http://api.weatherapi.com/v1/current.json?key=29ad3cbdd70c4198ac704843231502 &q=${bulk}&`
// console.log(api);
fetch(api)
.then(response => response.json())
.then(data => {
    if (data.location['country'] === 'Canada') {
        let temp = Math.floor(data.condition['temp_c']);  
        let city = data.location['name'];
        let feels_like = Math.floor(data.condition['feelslike_c']);
        let status = data.condition[0].text;
        let icon = data.condition[0].icon;
        let windSpeed =data.condition['wind_mph']; 

    document.getElementById('city').innerHTML = city;
    document.getElementById('temp').innerHTML = temp;
    document.getElementById('status').innerHTML = status;
    document.getElementById('feelsLike').innerHTML = feels_like + "°C";
    document.getElementById('windSpeed').innerHTML = windSpeed +"m/h";
    document.getElementById('icon').src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';  

}})
.catch(err => console.log(err))
}


function locate() {

    let location = document.getElementById('location').value;

    let loacateThis = `http://api.weatherapi.com/v1/current.json?key=29ad3cbdd70c4198ac704843231502 &q=${bulk}&`
     
    fetch(loacateThis)
    .then(response => response.json())
    .then(data => {
        if (data.location['country'] === 'Canada') {
    
            let temp = Math.floor(data.condition['temp_c']);  
            let city = data.location['name'];
            let feels_like = Math.floor(data.condition['feelslike_c']);
            let status = data.condition[0].text;
            let icon = data.condition[0].icon;
            let windSpeed =data.condition['wind_mph']; 
    
        document.getElementById('city').innerHTML = city;
        document.getElementById('temp').innerHTML = temp;
        document.getElementById('status').innerHTML = status;
        document.getElementById('feelsLike').innerHTML = feels_like + "°C";
        document.getElementById('windSpeed').innerHTML = windSpeed +"m/h";
        document.getElementById('icon').src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'; 
       
    
    }})
    .catch(err => console.log(err))
    }
