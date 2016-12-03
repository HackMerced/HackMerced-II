const user = require("../tools/user.js").user;
const reqVerify = require("../tools/utilities.js").reqVerify;
const request = require("request");

module.exports = function(app, keys) {
  const tomoeuri = keys.tomoe_url;
  const tomoeauth = { "Authorization" : "Bearer " + keys.tomoe_auth}

  function runPage(req, res){
    let current_user = new user(req);
    if(current_user){
      res.render('client/index', {status:keys.status, user:current_user, keys:{ google_maps_javascript_key: keys.google_maps_javascript_key.client}});
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
          }
        }

        request(options, function (error, response, body) {
          if (!error && response.statusCode == 201 && body && body.hacker) {
            req.session.user = body.hacker;

            res.cookie('user', o.user, { maxAge: 1080000000 });
            res.cookie('pass', o.pass, { maxAge: 1080000000 });

            res.status(201).send(body);
          } else {
            res.status(response.statusCode).send(body);
          }
        });
      } else {
        res.status(400).send({text:"Your passwords do not match!", issue:["confirmPassword", "password"]});
      }
    });


  });

  app.post('/api/login', function(req, res){
    if(req.body.email){
      if(req.body.password){
          const options = {
            method:"GET",
            headers:tomoeauth,
            uri: tomoeuri + '/1.0/hackers/' + req.body.email + "?password=" + req.body.password + "&verifyLogin=true",
          }

          request(options, function (error, response, body) {
            if (!error && response.statusCode == 201 && body && body.hacker) {
              req.session.user = body.hacker;

              res.cookie('user', o.user, { maxAge: 1080000000 });
              res.cookie('pass', o.pass, { maxAge: 1080000000 });

              res.status(201).send(body);
            } else {
              res.status(response.statusCode).send(pack);
            }
          });
      } else {
        res.status(400).send({text:"You are missing your password", issue:["password"]});
      }
    } else {
      res.status(400).send({text:"You are missing your email", issue:["email"]});
    }
  });

  app.post('/api/update', function(req, res){
    if(req.session.user && req.session.user.email){
      const options = {
        method:"POST",
        uri: tomoeuri + '/1.0/hackers/' + req.session.user.email,
        body: req.body.hacker
      }

      request(options, function (error, res, body) {
        if (!error && res.statusCode == 201 && body && body.hacker) {
          res.status(201).send(body);
        } else {
          res.status(res.statusCode).send(pack);
        }
      });
    } else {
      res.status(403).send("You are not logged in!");
    }

  });




  // app.get('/2016', function(req, res){
  //     res.render('client/index', {status:keys.status});
  // });
  //
  // app.get('/join-our-team', function(req, res){
  //     res.render('client/index', {status:keys.status});
  // });
  //
  // app.get('/volunteer', function(req, res){
  //     res.render('client/index', {status:keys.status});
  // });
  //
  // app.get('/contact', function(req, res){
  //     res.render('client/index', {status:keys.status});
  // });
  //
  // app.get('/sponsor', function(req, res){
  //     res.render('client/index', {status:keys.status});
  // });
  //
  // app.get('/apply', function(req, res){
  //     res.render('client/index', {status:keys.status});
  // });
};
