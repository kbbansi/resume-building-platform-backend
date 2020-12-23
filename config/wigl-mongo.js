/**
 * resume-build-mongo is the mongodb database connection config
 * for accessing the mongodb instance 
 * of the Resume Building Platform 
 */

 const mongoose = require('mongoose');
 require('dotenv/config');
 let WiGLMongoDB;

 WiGLMongoDB = mongoose;



 WiGLMongoDB.connect(process.env.WiGLMongoDbConnection, {useNewUrlParser:true, useUnifiedTopology:true}, (err) => {
     if (WiGLMongoDB.connection.readyState !== 1) {
         console.log('WiGL MongoDB Connection Not Established');
        //  console.log(process.env.WiGLMongoDbConnection);
         console.log(err.errmsg);
     } else {
         console.log('WiGL MongoDB Connection Established');
         console.log(WiGLMongoDB.connection.readyState);
         // todo:: investigate reconnection methods for failed connections
     }
 });

 module.exports = WiGLMongoDB;