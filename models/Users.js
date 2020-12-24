/**
 * Users.js is the schema model for User data 
 * and resume information
*/

var mongoose = require('mongoose');

const Users = mongoose.Schema({
    firstName: String,
    LastName: String,
    OtherNames: String,
    email: String,
    password: String,
    resume:[], // *a user can have more than one resume 
    coverLetter: [], // **a user can have more than one cover letter
    accountType: String, // account type will be used to differentiate between free accounts and paid accounts

});

module.exports = mongoose.model('Users', Users);



/**
 * Items with the double asterick(*) are  items
 * that will be considered for future updates
 */