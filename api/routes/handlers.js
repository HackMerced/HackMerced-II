const nifty = require('../../api/tools/nifty.js');

module.exports = function handlers(app, keys) {


  // TODO: move tryParse to it's own module



  function sendEmailForSponsor(req, res){
    const body = nifty.tryParseJSON(req.body.send);

    if(body && body.email){

      const url = "https://api.sendgrid.com/v3/mail/send";

      const send = {
              headers :{
                "Authorization":"Bearer " + keys.sendgrid.secret,
                "Content-Type": "application/json",
              },
              body:{
                  "personalizations": [
                    {
                      "to": [
                        {
                          "email": "sponsor@hackmerced.com",
                        },
                      ],
                      "subject": "HackMerced Sponsorship!",
                    },
                  ],
                  "from": {
                    "email": body.email,
                  },
                  "content": [
                    {
                      "type": "text/plain",
                      "value": body.message,
                    },
                  ],
                },
            };


      nifty.request("http", url, "POST", send,
        function(){
          res.send(200);
        }, function(error){
          res.send("There was an issue with our server, please report this!", 500);
        });

    } else {
      if(!body){
        res.send("Browser error, please refresh your page or report this to us!", 412);
      } else if(!body.email) {
        res.send("Please enter your email!", 412);
      }
    }

  }

  app.post('/sponsor/email', function(req, res){
    sendEmailForSponsor(req, res);
  });
};
