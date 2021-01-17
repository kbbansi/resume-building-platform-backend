const express = require('express');
const router = express.Router();
const isEmpty = require('is-empty');
const hashAlg = require('../config/passwords');

var user = require('../models/Users');

let auth, passwordCheck, encryptedPassword;


/**Error Messages */
const BAD_REQUEST = 'BAD_REQUEST';
const SERVER_ERROR = 'INTERNAL_SERVER_ERROR';
const NOT_FOUND = 'NOT_FOUND';
// Needed error messages

/**Login Success */
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

router.post('/login', async function (req, res, err) {
    auth = {
        email: req.body.email,
        password: req.body.password
    }

    try {
        const userAccount = await user.findOne({ email: auth.email });
        // console.log(`Obtained: ${userPassword.password} for ${auth.email}`) 
        if (userAccount) {
            console.log(userAccount.password)
            
            passwordCheck = hashAlg.hashCompare(auth.password, userAccount.password);
            if (passwordCheck) {
                console.log(`Password check passed? ${passwordCheck}`);
                res.status(200);
                res.json({
                    message: LOGIN_SUCCESS,
                    status: 200,
                    data: userAccount
                });
            } else {
                 console.log(`Password check passed? ${passwordCheck}`);
                 res.status(400);
                 res.json({
                     message: BAD_REQUEST,
                     status: 400,
                     error: 'Entered Password do not match'
                 });
            }
        } else {
            console.log(`Account for ${auth.email} is ${NOT_FOUND}`);
            res.status(404);
            res.json({
                message: NOT_FOUND,
                status: 404
            })
        }
    } catch (err) {
        console.log(err.message);
        res.status(500);
        res.json({
            message: SERVER_ERROR,
            status: 500,
            error: err.message
        })
    }
});


module.exports = router;