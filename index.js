// load environment manager to perform checks
const envManager = require("./utilities/environment.js").manager;
const fs = require("fs");

if(fs.existsSync(".env")){
  // load environment
  require("dotenv").load();

  // check if .env has everything
  envManager.checkAttributes(process.env, function(){
    require('./api/runtime.js')(process.env.MODE);
  });

} else {
  throw "Please create a .env file or type the command 'npm run env'";
}
