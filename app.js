const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const autorizationRoute = require("./MW/authorization")
// const authentication = require("./Route/authentication")
// const adminRoute = require("./Route/usersRoute")
// const teacherRoute = require("./Route/childs")
// const registerRoute = require("./Route/register");
// const changePasswordRoute = require("./Route/changePassword")
const swagger = require("./Route/swagger")
const teacherRoute = require("./Route/teacherRoute")
const childRoute = require("./Route/childRoute")
const classRoute = require("./Route/classRoute")

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
    next();
});

server.use(express.json()); // to Add body property so we can retreive data from it.


//------------------Routes-----------------------
// server.use((request, response, next)=>{
//     console.log(request.body);
//     next();
// })
// server.use(authentication);
// server.use(registerRoute);
// // server.use(autorizationRoute);

// // server.use(adminRoute);
// // server.use(teacherRoute);

// // server.use(changePasswordRoute);

// // swagger(server);

// //Ending Middle Wares

server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);

server.use((request, response)=>{
    response.status(404).json({Message: "Not Found"})
});
server.use((error, request, response, next)=>{
    response.status(error.status || 500).json({Message:error.message});
})