let args = process.argv.slice(2);

if(args && args[0] && (args[0] === "live" || args[0] === "dev" || args[0] === "test")){
  let mode = "development";

  if(args[0] === "live"){
    mode = "production";
  } else if(args[0] === "test"){
    mode = "test"; // should old be run via mocha
  }

  require('./api/runtime.js')(mode);
} else {
  console.log("Can't start server, please specify mode (dev or live)");
}
