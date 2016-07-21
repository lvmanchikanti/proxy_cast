var secret = require('./config').secret;
function authorize(req, res, next){
  if(req.headers.passphrase !== secret){
    res.status(403).json({
      msg: 'lol you thought'
    });
  } else {
    next();
  }
}

module.exports = authorize;
