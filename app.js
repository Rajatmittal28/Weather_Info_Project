const dotenv = require("dotenv").config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apikey = process.env.API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID="+`${apikey}`;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = Math.floor(Number(weatherData.main.temp)-273);
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            const currentTime = new Date().toLocaleTimeString();
            const maxTemp = Math.floor(Number(weatherData.main.temp_max)-273);
            const minTemp = Math.floor(Number(weatherData.main.temp_min)-273);
            const humidity = weatherData.main.humidity;
            const pressure = weatherData.main.pressure;
            const visibility = weatherData.visibility;
            const windSpeed = weatherData.wind.speed;
            const windDirn = weatherData.wind.deg;
            
            res.write("<h1>Weather Description is as following</h1>");
            res.write("<h3>The Weather is currently "+ weatherDescription + "<img src="+imageUrl+"> at current time "+ currentTime +"</h3>");
            res.write("<h3> The Current Temperature in "+ query +" is " + temp + " degress in Celsius</h3>");
            res.write("<h5>High/Low Temp: " + maxTemp+"/"+minTemp+" degress in Celsius</h5>");
            res.write("<h5>humidity: "+humidity+" %</h5>");
            res.write("<h5>pressure: "+pressure+" hPa</h5>");    
            res.write("<h5>visibility: "+visibility+" km</h5>");
            res.write("<h5>wind Speed: "+windSpeed+" km/hr</h5>");
            res.write("<h5>wind dirn: "+windDirn+" deg</h5>");
            res.send();
        });
    });
});



app.listen(3000,function(){
    console.log("server is running on port 3000");
});


