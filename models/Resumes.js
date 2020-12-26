/**
 * Resumes is the schema for all resumes 
 * on the Resume Building Platform
 */

 var mongoose = require('mongoose');

 const Resume = mongoose.Schema({
     created_on: String
 });

 module.exports = Resume;