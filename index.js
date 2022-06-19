'use strict';
require('dotenv').config();
let PORT = process.env.PORT || 3050;
const server=require("./src/server");
const {sequelize}=require("./src/models/index");

sequelize.sync().then(() => {

        server.start(PORT);
    }).catch(console.error);