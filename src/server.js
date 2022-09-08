'use strict';
require('dotenv').config();
const cors = require("cors");
const PORT = process.env.PORT || 3050;
const express = require("express");
const app = express();


const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");

const signinRouter=require("./routes/signin");
const signupRouter=require("./routes/signup");
const secretStuffRouters=require("./routes/secretStuff");
const getUsersRouter=require("./routes/gitUsers");
const v1Routes=require("./routes/v1");
const v2Router=require("./routes/v2");

app.use(express.json());
app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true, //access-control-allow-credentials:true
    })
  );
app.use(signinRouter);
app.use(signupRouter);
app.use(secretStuffRouters);
app.use(getUsersRouter);


app.use('/v2',v2Router);
app.use('/v1',v1Routes);

app.use("*", notFoundHandler);
app.use(errorHandler); 

function start(PORT) {
    app.listen(PORT, () => {
        console.log(`Listen and Running on port ${PORT}`);
    });
}

module.exports = {
    app: app,
    start: start,
};