'use strict';
const express = require('express');
const getUsersRouter=express.Router();
const {Users}=require('../models/index');
const Collection=require("../models/data-collection");
const bearerAuth = require('../middlewares/bearerAuth');
const acl=require("../middlewares/acl");

const allUsers=new Collection(Users);

getUsersRouter.get('/users',bearerAuth,acl('delete'),async(req,res,next)=>{
    try {
        const userRecords = await allUsers.read();
        const list = userRecords.map(user => user.username);
        res.status(200).json(list);
      } catch (e) {
        console.error(e);
        next(e);
      }
})

module.exports=getUsersRouter;