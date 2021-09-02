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
        // console.log(response);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = Number(weatherData.main.temp)-273;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1> The Weather is currently "+ weatherDescription+"</h1>");
            res.write("<h2> The Temperature in "+ query +" is " + temp + " degress in Celsius</h2>");
            res.write("<img src="+imageUrl+">");
            res.send();
        });
    });
});



app.listen(3000,function(){
    console.log("server is running on port 3000");
});


