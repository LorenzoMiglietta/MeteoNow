const express = require ("express");
const path = require('path');
const app = express();

let port = process.env.PORT;
if (port == null || port == ""){
    port = 3000;
}

app.listen(port, ()=>{
    console.log("Server started on port", port);
})