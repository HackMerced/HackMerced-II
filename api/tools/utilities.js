const reqVerify = function(req, res, limits, resolve){
  /*
    limits = {
      body:[
        {
          check:["email", "password"],
          text:"You are missing your email"
        }
      ]
    }

  */
  let error = false;

  for(let i in limits){
    let searchThrough = req[i]; // limits.body aka req.body


    for(let x in limits[i]){
      let isValid = false;
      let toCheck = limits[i][x];
      for(let y in toCheck.check){

        for(let z in searchThrough){

          if(toCheck.check[y] === z && searchThrough[z]){
            isValid = true;
          }
        }
      }

      if(!isValid){
        error = limits[i][x];
        break;
      }
    }
    if(error){
      break;
    }
  }

  if(error){
    res.status(400).send({text:error.text, issue:error.check});
  } else {
    resolve();
  }


}

exports.reqVerify = reqVerify;
