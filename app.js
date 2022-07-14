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
    
});

app.listen(port, () => {
    console.log("Server started on port", port);
})
