module.exports = function(app, keys) {

  // homepage
  app.get('/', function(req, res){
      res.render('client/index', {status:keys.status});
  });

};
