const express = require("express");
const meteo = require(__dirname + "/my-modules/api-calls.js");
const axios = require('axios');
const weekDate = require(__dirname+"/my-modules/date.js")
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', "ejs");

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/html/index.html');
// });



var city = "Milano";


app.get("/", (req, res) => {

    var data = weekDate.getWeekData();
    // console.log(data);

    // var giorni= await meteo.getMeteo("Milano");
    axios.get("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=adcb01a998523a982c8f04bd3e13e248")
        .then(response => {
            // console.log(`statusCode: ${res.status}`);
            var lat = response.data[0].lat.toPrecision(5);
            var lon = response.data[0].lon.toPrecision(5);
            axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,current,minutely&units=metric&appid=adcb01a998523a982c8f04bd3e13e248")
                .then(giorni => {
                    res.render("meteo", {
                        giorni: giorni.data.daily,
                        data: data
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        })
        .catch(error => {
            console.error(error);
        });
});

app.post('/', (req, res) => {
    city = req.body.city;
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
})
