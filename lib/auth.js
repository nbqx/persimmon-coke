var fs = require('fs');
var through2 = require('through2');
var inq = require('inquirer');
var nconf = require('nconf');
var Tw = require('ntwitter');
var OAuth = require('oauth').OAuth;

function _auth(v,next){
  var conf = JSON.parse(v.contents+'');
  var consumer_key = conf.consumer_key;
  var consumer_secret = conf.consumer_secret;

  var o = new OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    consumer_key,
    consumer_secret,
    "1.0",
    null,
    "HMAC-SHA1"
  );

  o.getOAuthRequestToken(function(err,token,secret,res){
    if(err) return console.log(err);

    console.log([
      'open URL: ',
      'https://twitter.com/oauth/authenticate?oauth_token='+token
    ].join(""));

    // input PIN code
    var prompt = {
      type: 'input',
      name: 'pin',
      message: 'input PIN code'
    };
    inq.prompt([prompt],function(ans){
      o.getOAuthAccessToken(token,secret,ans.pin,function(x_x,access_token,access_token_secret,r){
        if(x_x) return console.log(x_x);

        nconf.file({file:v.path});
        nconf.set('user_id',r.user_id);
        nconf.set('screen_name',r.screen_name);
        nconf.set('access_token',access_token);
        nconf.set('access_token_secret',access_token_secret);

        nconf.save(function(o_x){
          if(o_x) return console.log(o_x);
          next({
            name: nconf.get('name'),
            consumer_key: nconf.get('consumer_key'),
            consumer_secret: nconf.get('consumer_secret'),
            user_id: nconf.get('user_id'),
            screen_name: nconf.get('screen_name'),
            access_token: nconf.get('access_token'),
            access_token_secret: nconf.get('access_token_secret')
          });
        });
      });
    });
  });
};

function _tw(conf){
  var tw = new Tw({
    consumer_key: conf.consumer_key,
    consumer_secret: conf.consumer_secret,
    access_token_key: conf.access_token,
    access_token_secret: conf.access_token_secret
  });
  return tw
};

module.exports = through2.obj(function(vyn,enc,next){
  var self = this;
  var conf = JSON.parse(vyn.contents+'');
  if(conf.access_token===undefined && conf.access_token_secret===undefined){
    _auth(vyn,function(data){
      self.push(_tw(data));
      next();
    });
  }else{
    self.push(_tw(JSON.parse(vyn.contents+'')));
    next();
  }
});
