var through = require('through2');

module.exports = function(param,fn){
  var p = param || {};
  var f = fn || function(o){return o};

  return through.obj(function(tw,enc,next){
    var self = this;
    tw.getUserTimeline(p,function(err,data){
      if(err) return self.emit('error',err);
      data = data.reverse();
      for(var i=0; i<data.length; i++){
        self.push(f(data[i]));
      }
      next();
    });
  });
};
