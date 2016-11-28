class user {
  static pullFromRequest(req){
    let ip = (req.headers['x-forwarded-for']) ? req.headers['x-forwarded-for'].split(",")[0] : false ||
             req.connection.remoteAddress ||
             req.socket.remoteAddress ||
             req.connection.socket.remoteAddress;
    return {
      ip:ip
    }
  }

  constructor(req){
    if(req){
      if(req.session && req.session.user){
        this.session = req.session.user;
      }

      this.anonymous = user.pullFromRequest(req);

    } else {
      return false;
    }
  }


}

exports.user = user;
