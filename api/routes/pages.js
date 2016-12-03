const user = require("../tools/user.js").user;
const reqVerify = require("../tools/utilities.js").reqVerify;
const request = require("request");

module.exports = function(app, keys) {
  const tomoeuri = process.env.TOMOE_WEB_URL;
  const tomoeauth = { "Authorization" : "Bearer " + process.env.TOMOE_AUTHORIZATION_TOKEN}

  function runPage(req, res){
    let current_user = new user(req);
    if(current_user){
      res.render('client/index', {status:process.env.MODE, user:current_user, keys:{ google_maps_javascript_key: process.env.GOOGLE_AUTOCOMPLETE_ACCESS_TOKEN}});
    } else {
      res.send("404");
    }
  }

  app.get('/', function(req, res){
    runPage(req, res);
  });
  // homepage
  app.get('/:site', function(req, res){
    runPage(req, res);
  });


  app.get('/api/logout', function(req, res){
    if(req.session.user != undefined){
      res.clearCookie('user');
      res.clearCookie('pass');
      req.session.destroy(function(e){
        res.redirect('/apply')
      });
    } else {
      res.redirect('/apply');
    }
  });

  function updateUser(res, req, error, response, body){
    if (!error && response.statusCode == 201 && body && body.hacker) {
      req.session.user = body.hacker;

      res.cookie('username', body.email, { maxAge: 1080000000 });
      res.cookie('password', body.password, { maxAge: 1080000000 });

      res.status(201).send(body);
    } else {
      if(body && body.errors){
        res.status(response.statusCode).send(body.errors[0]);
      } else {
        res.sendStatus(500);
      }
    }
  }

  app.post('/api/signup', function(req, res){

    const verify = {
      body:[
        {
          check:["email", "password"],
          text:"You are missing your email and password!"
        },
        {
          check:["email"],
          text:"You are missing your email!"
        },
        {
          check:["password"],
          text:"You are missing your password!"
        },
        {
          check:["confirmPassword"],
          text:"Please confirm your password!"
        },
      ]
    }


    reqVerify(req, res, verify, function(){
      if(req.body.confirmPassword === req.body.password){
        const options = {
          method:"POST",
          uri: tomoeuri + '/1.0/hackers?',
          headers:tomoeauth,
          json:true,
          body:{
            email:req.body.email,
            password:req.body.password,
            name:"",
            survey:{},
            status:"started"
          }
        }

        request(options, function (error, response, body) {
          updateUser(res, req, error, response, body);
        });
      } else {
        res.status(400).send({text:"Your passwords do not match!", issue:["confirmPassword", "password"]});
      }
    });


  });

  app.post('/api/login', function(req, res){
    const verify = {
      body:[
        {
          check:["email", "password"],
          text:"You are missing your email and password!"
        },
        {
          check:["email"],
          text:"You are missing your email!"
        },
        {
          check:["password"],
          text:"You are missing your password!"
        },
      ]
    }

    reqVerify(req, res, verify, function(){
        const options = {
          method:"GET",
          headers:tomoeauth,
          uri: tomoeuri + '/1.0/hackers/' + req.body.email + "?password=" + req.body.password + "&verifyLogin=true",
        }

        request(options, function (error, response, body) {
          updateUser(res, req, error, response, body);
        });
    });
  });



  app.post('/api/update', function(req, res){
    if(req.session.user && req.session.user.email){
      const options = {
        method:"POST",
        uri: tomoeuri + '/1.0/hackers/' + req.session.user.email,
        body: req.body.hacker
      }

      request(options, function (error, res, body) {
        updateUser(res, req, error, response, body);
      });
    } else {
      res.status(403).send("You are not logged in!");
    }

  });

};
