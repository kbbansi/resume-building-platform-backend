var express = require('express');
var router = express.Router();
var WiGLMongoose = require('../config/wigl-mongo');
var user = require('../models/Users');
var passwordEncrypt = require('../config/passwords');
var isEmpty = require('is-empty');


/**Error Messages */
const BAD_REQUEST = 'BAD_REQUEST';
const SERVER_ERROR = 'INTERNAL_SERVER_ERROR';
const NOT_FOUND = 'NOT_FOUND';
// const SOME_ERROR = 'SOME_ERROR';

/**Success Messages */
const USER_CREATED = 'USER_CREATED';
const USER_UPDATED = 'USER_UPDATED'
const USER_DELETED = 'USER_DELETED'

/* GET users listing. */
router.get('/', async function (req, res, next) {
  
  try {
    const users = await user.find();
    res.status(200);
    res.json({
      data: users,
    })
  } catch (err) {
    console.log(`An Error occurred: ${err}`);
    res.status(404);
    res.json({
      message: 'No data'
    })
  }
});

/**Create new user account */
router.post('/create_account', async function (req, res) {
  // test run
  let newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    otherNames: req.body.otherNames,
    email: req.body.email,
    templateSelection: req.body.templateSelection,
    password: passwordEncrypt.passwordHash(req.body.password),
    accountType: 'free'
  };

  // check for empty values
  if (isEmpty(newUser.firstName) || isEmpty(newUser.lastName) || isEmpty(newUser.email)) {
    console.log('Empty fields found');
    res.status(400);
    res.json({
      status: BAD_REQUEST,
      errMsg: 'Empty Fields found'
    });
  } else {

    const User = new user({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      otherNames: newUser.otherNames,
      email: newUser.email,
      templateSelection: newUser.templateSelection,
      password: newUser.password,
      accountType: newUser.accountType
    });

    // todo :: check if user exists before saving user
    try {
      const response = await User.save();
      // todo :: consider email sending upon successful registration
      res.status(200);
      res.json({
        status: USER_CREATED,
        dataStream: User,
        responseBody: response
      });
    } catch (err) {
      res.status(400);
      res.json({
        status: BAD_REQUEST,
        errMsg: err
      })
    }

  }
});

module.exports = router;
