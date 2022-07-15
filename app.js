const express = require("express");
const meteo = require(__dirname + "/my-modules/api-calls.js");
const axios = require('axios');
const weekDate = require(__dirname + "/my-modules/date.js")
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', "ejs");



var counter = 0;

app.get("/", async (req, res) => {
    let city = "Milano";
    await meteo.getMeteo(res, city, counter);
});

app.get("/no-city", (req, res) => {
    res.redirect("/");
})

app.get('/:city', async (req, res) => {
    let city = req.params.city;
    if (city != "favicon.ico") {
        counter++;
        await meteo.getMeteo(res, city, counter);
    }
})

app.post('/', async (req, res) => {
    let city = req.body.city;
    if (city === "") {
        res.redirect("/");
    } else {
        counter++;
        await meteo.getMeteo(res, city, counter);
    }
});



app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
})
