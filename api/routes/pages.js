module.exports = function(app, keys) {

  // homepage
  app.get('/:site', function(req, res){
      res.render('client/index', {status:keys.status});
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
