'use strict';

const {Users}  = require('../models/index');

const base64 = require('base-64');

async function basic (req, res, next) {
    if (req.headers.authorization) {
    
        let basicHeaderParts = req.headers.authorization.split(" ");
        let encodedString = basicHeaderParts[1];

        let decodedString = base64.decode(encodedString);
        let [username, password] = decodedString.split(":");
        Users.authenticateBasic(username, password)
            .then((validUser) => {
                console.log()
                req.user = validUser;
                next();
            })
            .catch((err) => {
                next("Invalid Signin");
            })
    }
}

module.exports = basic;



