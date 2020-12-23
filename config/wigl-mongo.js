/**
 * resume-build-mongo is the mongodb database connection config
 * for accessing the mongodb instance 
 * of the Resume Building Platform 
 */

 const mongoose = require('mongoose');
 let WiGLMongoDB;

 WiGLMongoDB = mongoose;



 WiGLMongoDB.connect("", {useNewUrlParser:true, useUnifiedTopology:true}, (err) => {
     if (WiGLMongoDB.connection.readyState !== 1) {
         console.log('WiGL MongoDB Connection Not Established');
         console.log(WiGLMongoDB.connection.readyState);
         console.log(err.errmsg);
     } else {
         console.log('WiGL MongoDB Connection Established');
         // todo:: investigate reconnection methods for failed connections
     }
 });

 module.exports = WiGLMongoDB;