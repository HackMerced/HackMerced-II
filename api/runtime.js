const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const session = require('express-session');
const methodOverride = require('method-override');
const favicon = require('serve-favicon');
const http = require('http');
const path = require('path');
const app = express();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const request = require('request');

module.exports = function(status){

  // all environments

  // set base directory as one above
  __dirname = __dirname + "/..";

  // set app

  app.set('port', process.env.PORT || 6320);
  app.set('views', path.join( __dirname , 'views'));
  app.set('view engine', 'jade');
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cookieParser());
  app.use(session({ secret: 'beta-engine', resave:false, saveUninitialized:false}));
  app.use(methodOverride());

  var keys = require('../assets/keys/keys.js')(status);

  // warning
  if(keys.status === "development"){
    console.log(
      "\n" +
      "******************************************************************\n" +
      "***YOU ARE CURRENTLY RUNNING A DEVELOPMENT VERSION OF HACKMERCED***\n" +
      "******************************************************************\n" +
      "\nPlease make sure you are developing right now, and not using this\n" +
      "for production." +
      "\n" +
      "\nTo set up server for production, please use node production.js." +
      "\n\n" +
      "******************************************************************\n"
    );
    }

    // routes to pages
  require('./routes/pages.js')(app, keys);



  app.use(express.static(path.join(__dirname, 'public')));

  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
};
