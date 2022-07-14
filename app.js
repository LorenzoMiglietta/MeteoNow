const express = require("express");
const axios = require('axios');

const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html');
});

app.post('/', (req, res) => {
    let city = "milano";
    // var str="http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid=e06672eb3d022cf9dbdffb18d384e515";
    axios
        .get("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=e06672eb3d022cf9dbdffb18d384e515")
        .then(res => {
            console.log(`statusCode: ${res.status}`);
            console.log(res);
        })
        .catch(error => {
            console.error(error);
        });
});

app.listen(port, () => {
    console.log("Server started on port", port);
})
