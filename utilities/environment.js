// import
const fs = require("fs");

// list of environment variables
const environment_variables = [
  "mode",
  "sendgrid_client_key",
  "sendgrid_secret_key",
  "google_autocomplete_access_token",
  "tomoe_web_url",
  "tomoe_authorization_token",
  "filestack_api_key",
  "mixpanel_api_key"
]

class manager{
  constructor(){

  }

  static checkAttributes(environment, resolve){
    let errors = [];
    for(let index in environment_variables){
      errors.push(environment_variables[index]);

      for(let variable in environment){

        if(environment_variables[index].toUpperCase() === variable && environment[variable]){
          errors.splice((errors.length-1), 1);
        }
      }
    }

    if(errors.length){
      throw "Your environment is missing the following variables: " + errors.join(", ");
    } else {
      resolve();
    }

  }

  static generateEnvironment(args){
    const envExists = fs.existsSync(".env");
    if((envExists && (args && args[0] && args[0] === "--force")) || !envExists){
      let file = "";

      for(let i in environment_variables){
        file += environment_variables[i].toUpperCase() + "=\n";
      }

      fs.writeFile(".env", file, (err) => {
        if (err) throw err;
        console.log('Your .env has been saved!');
      });
    } else {
      throw "Your .env file exists, to overwrite your .env file, please type 'node ./utilities/genEnv.js --force'"
    }
  }
}

exports.manager = manager;
