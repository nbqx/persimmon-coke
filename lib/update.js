var through = require('through2');

// https://dev.twitter.com/docs/api/1.1/post/statuses/update

module.exports = function(mes,param,fn){
  var mes = mes;
  var p = param || {};
  var f = fn || function(o){return o};

  return through.obj(function(tw,enc,next){
    var self = this;

    if(mes===undefined) return self.emit('error', new Error('empty text'));
    if(mes==="") return self.emit('error', new Error('empty text'));
    
    tw.updateStatus(mes,p,function(err,data){
      if(err) return self.emit('error',err);
      self.push(data);
      next();
    });
  });
};
