var fs = require('fs'),
    Stream = require('stream'),
    path = require('path');

var mkdirp = require('mkdirp'),
    nconf = require('nconf'),
    File = require('vinyl');

var pj = path.join;
var home = process.env.HOME || process.env.USERPROFILE;

module.exports = function(){
  var s = new Stream({objectMode:true});
  s.readable = true;

  if(!fs.existsSync(pj(__dirname,"..","app.json"))){
    s.emit('error',new Error('app.conf Not Found'));
  }

  var appConf = JSON.parse(fs.readFileSync(pj(__dirname,"..","app.json"))+'');
  var dirName = appConf.name;
  var confFileName = "config.json";

  var configDir = pj(home,".config",dirName);
  var appConfPath = pj(configDir,confFileName);
  
  nconf.file({file: appConfPath});
  nconf.set('name',appConf.name);
  nconf.set('consumer_key',appConf.consumer_key);
  nconf.set('consumer_secret',appConf.consumer_secret);

  if(!fs.existsSync(appConfPath)){
    mkdirp(configDir,function(err,dir){
      nconf.save(function(err){
        if(err) return console.log(err);
        fs.readFile(appConfPath,function(e,data){
          var confFile = new File({
            base: configDir,
            path: appConfPath,
            contents: data
          });
          s.emit('data',confFile);
          s.emit('end');
        });
      });
    });
  }else{
    fs.readFile(appConfPath,function(e,data){
      var confFile = new File({
        base: configDir,
        path: appConfPath,
        contents: data
      });
      s.emit('data',confFile);
      s.emit('end');
    });
  }

  return s
};
