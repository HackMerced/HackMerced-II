const version = "/1.0";

app.get(version + '/universities', function(req, res){
  runPage(req, res);
});
