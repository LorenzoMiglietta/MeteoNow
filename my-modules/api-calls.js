// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

// var str="http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid=e06672eb3d022cf9dbdffb18d384e515";

const axios = require('axios');

exports.getMeteo = (city) => {
    axios.get("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=adcb01a998523a982c8f04bd3e13e248")
        .then(res => {
            // console.log(`statusCode: ${res.status}`);
            // console.log(res);
            var lat = res.data[0].lat.toPrecision(5);
            var lon = res.data[0].lon.toPrecision(5);
            // console.log(lat, lon);
            https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}
            axios.get("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly,current,minutely&appid=adcb01a998523a982c8f04bd3e13e248")
                .then(giorni => {
                    // console.log(`statusCode: ${res.status}`);
                    // console.log(giorni)
                    return giorni.data.daily;
                })
                .catch(error => {
                    console.error(error);
                });
        })
        .catch(error => {
            console.error(error);
        });
}