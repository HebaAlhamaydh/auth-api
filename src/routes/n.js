"use  strict";
require("dotenv").config();
const express = require('express');
const v2Router=express.Router();

const {Users}=require("../models/index");
const Collection=require("../models/data-collection");
const bearerAuth = require('../middlewares/bearerAuth');
const acl=require("../middlewares/acl");

const usersRecord=new Collection(Users);

v2Router.get("/v2",bearerAuth,acl('read'),async (req,res)=>
{
    const allRecords = await usersRecord.read();
    res.status(200).json(allRecords);
})
v2Router.get("/v2/:id",bearerAuth,acl('read'),async (req,res)=>
{  const recordId = parseInt(req.params.id);
    let oneRecord = await usersRecord.read(recordId);
    res.status(200).json(oneRecord);
    
})

v2Router.post("/v2",bearerAuth,acl('create'),async (req,res)=>
{   let newRecord = req.body;
    let record = await usersRecord.createRecord(newRecord);
    res.status(201).json(record);
    
})
v2Router.put("/v2/:id",bearerAuth,acl('update'),async (req,res)=> {
    let recordId = parseInt(req.params.id);
    const updatRecord = req.body;
    let updatedRecord = await usersRecord.updateRecord(recordId, updatRecord)
    res.status(200).json(updatedRecord);
})
v2Router.delete("/v2/:id",bearerAuth,acl('delete'),async (req,res)=> {
    let recordId = parseInt(req.params.id);
    let foundRecord = await usersRecord.read(recordId);
    if (foundRecord) {
        let deletedRecord = await usersRecord.delete(recordId);
      res.status(204).send("deleted succeefully!!");
    } else {
      res.status(404).json({ message: ' is not found' });
    }
    
  })
  module.exports = v2Router;