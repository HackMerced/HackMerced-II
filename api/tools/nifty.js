'use strict'

const crypto = require('crypto');
const request = require('request');
const OAuth = require('oauth');


function cryptobox(x, y, z){
  return crypto.randomBytes(x).toString('hex') + '_' + crypto.randomBytes(y).toString('hex') + '_' + crypto.randomBytes(z).toString('hex');
}

const tryParseJSON = function(data) {
  let result = false;

  try{
    result = JSON.parse(data);
  } catch(e){
    // who cares
  }
  return result;
};

module.exports = {
  tryParseJSON:function(data){
    return tryParseJSON(data);
  },
  request:function(type, url, method, send, cb, res){


    function tryRequest(options, callback){
      try{
        request(options, callback);
      } catch(err){
        if(res){
          res('There was an error in parsing, please reformat your data', 400);
        }
      }
    }

    function isValidURL(s) {
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      return regexp.test(s);
     }


    if(isValidURL(url)){
      if(type === 'http' || type === 'oauthv2' || type === 'refresh_token' || type === 'basicauth'){

          if(!send){
              send = {};
          }




          var options = {
              url: url,
              method: ((method) ? method.toUpperCase() : "GET"),
              headers: send.headers || {},
              timeout:20000,
          };

          if(send.body){
              options.body = send.body;
              options.json = true;
          }
          if(send.form){
              options.form = send.form;
          }
          if(send.formData){
              options.formData = send.formData;
              options.json = true;
          }

          if(type === "basicauth"){
            var hash = new Buffer(send.auth.username + ":" + send.auth.password).toString("base64")
            options.headers["Authorization"] = "Basic " + hash;
          }


          function callback(error, response, body) {
              //var response_size = (response && response.client && response.client.bytesRead) ? response.client.bytesRead : 0 ;

              if(response){
                if (!error && response.statusCode.toString()[0] === "2") {

                  var info = (typeof body === "object") ? body : tryParseJSON(body) ;

                  cb(info, response.statusCode);
                } else {

                    if(res){

                        res({error:error, body:body, res:response}, response.statusCode);

                     } else {


                     }
                }
              } else {
                res({error:"We received no response", body:"External Server Error"}, 404);
              }


          }

          if(type === "refresh_token"){
            // refresh tokens will have also run a reqeust to get the access token
            var real_options = _.clone(options);
              options.url = send.auth.refreshtokenurl;
              options.method = "POST";
              options.headers = {};

              if(send.auth.sendasbody){
                options.form = {
                  client_id:send.auth.clientid,
                  client_secret:send.auth.clientsecret,
                  refresh_token:send.auth.refreshtoken,
                  grant_type:send.auth.granttype
                }
              } else {
                options.url += "?client_id=" + send.auth.clientid
                              + "&client_secret=" + send.auth.clientsecret
                              + "&refresh_token=" + send.auth.refreshtoken
                              + "&grant_type=" + send.auth.granttype;
              }

            tryRequest(options, function(error, response, body){
              var body = tryParseJSON(body);
              if(body && (typeof body === "object") && body.access_token){
                real_options.headers["Authorization"] = "Bearer " + body.access_token;
                tryRequest(real_options, callback);
              } else {
                if(res){
                  res({error:"We could not find the access_token", body:error}, 400);
                }
              }
            });
          } else {
            tryRequest(options, callback);
          }



      } else if(type === 'oauthv1'){
          if(send.auth){
            var oauth = new OAuth.OAuth(
            send.auth.requesttokenurl,
            send.auth.accesstokenurl,
            send.auth.consumerkey,
            send.auth.consumersecret,
            '1.0A',
            null,
            send.auth.encoding || 'HMAC-SHA1'  //'HMAC-SHA1'
            );

            var method = method.toLowerCase();
            if(method === 'get' || method === 'post'){
              try{
                 oauth[method](
                  url,
                  send.auth.token, //test user token
                  send.auth.tokensecret, //test user secret
                  function (error, body, response){


                      if (!error && response.statusCode == 200) {
                        var info = (typeof body === "object") ? body : tryParseJSON(body) ;

                        cb(info);
                      } else {
                          res(e, body, res);

                      };

                });
              } catch(err){


                  if(res){
                      res('There was an error in parsing, please reformat your data', 400, {error:"There was an error in parsing, please reformat your data."});
                  }

              }
            } else {
              if(res){
                res("", 400, {error:"Sorry, we don't support that request method yet."});
              }
            }


        }  else {
            if(res){
              res("", 400, {error:"You are missing a few authentication details."});
            }
        }
      } else {
          if(res){
            res("nope", 400, {});
          }
      }
    } else {
        if(res){
          res("nope", 400, {error:"Your URL is not valid"});
        }
    }
  },
  cryptobox:function(x, y, z){
      return cryptobox(x, y, z);
  },
}
