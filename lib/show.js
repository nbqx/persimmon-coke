var through = require('through2');

module.exports = function(id,fn){
  var id = id;
  var f = fn || function(o){return o};

  return through.obj(function(tw,enc,next){
    var self = this;
    if(id===undefined) return self.emit('error', new Error('empty id'));
    tw.showStatus(id,function(err,data){
      if(err) return self.emit('error',err);
      self.push(data);
      next();
    });
  });
};
