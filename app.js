const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();






const server = express();

const port = process.env.PORT;

mongoose.connect(process.env.db_URL)
.then(()=>{
    console.log("DB Connected .....");
    server.listen(port, ()=>{
        console.log("I am Listening .....", port);
    })
})
.catch((error)=>{
    console.log("DB Connection Problem " + error)
})

server.use((request, response, next)=>{
    console.log("Log MiddleWare", request.url, request.method);
    
});

server.use(express.json()); // to Add body property so we can retreive data from it.



//------------------Routes-----------------------