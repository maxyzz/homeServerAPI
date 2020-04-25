const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const port = 8000;
const dbname='home'
const basicAuth = require('./_helpers/basic-auth');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
const cors = require('cors')

app.use(cors()) // Use this after the variable declaration

app.use(bodyParser.urlencoded({ extended: true }));

// use basic HTTP auth to secure the api
//app.use(basicAuth);

// use JWT auth to secure the api
app.use(jwt());

// global error handler
app.use(errorHandler);

MongoClient.connect(db.url,{ useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)
  var database = client.db(dbname);
  
  // api routes
  require('./app/routes')(app, database);
  
  // start server
  app.listen(port, () => {
    console.log('Server listening on port ' + port);
  });               
})