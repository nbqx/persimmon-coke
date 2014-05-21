var duplex = require('duplexer');
var through = require('through2');

// using duplexer, swap output
module.exports = function(param,fn){
  var p = param || {};
  var f = fn || function(o){ return o };
  var tw;

  var read = through.obj();
  var write = through.obj(function(o,enc,next){
    tw = o;
    next();
  }).on('finish',function(){
    // tw.stream('statuses/sample',function(stream){
    tw.stream('user',p,function(stream){
      stream.on('data',function(data){
        if(data.friends===undefined){
          read.push(f(data));
        }
      });
    });
  });
  
  return duplex(write,read);
};
