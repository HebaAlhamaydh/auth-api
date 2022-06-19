'use steict';

const express = require('express');
const signInRouter = express.Router();
const basic = require('../middlewares/basicAuth');

signInRouter.post('/signin', basic, (req, res) => {
  
      res.status(200).json(req.user);

});

module.exports = signInRouter;