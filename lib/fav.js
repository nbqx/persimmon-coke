var through = require('through2');

// https://dev.twitter.com/docs/api/1.1/post/favorites/create

module.exports = function(id,param,fn){
  var id = id;
  var p = param || {};
  var f = fn || function(o){return o};
  
  return through.obj(function(tw,enc,next){
    var self = this;
    if(id===undefined) return self.emit('error', new Error('empty id'));
    tw.createFavorite(id,p,function(err,data){
      if(err) return self.emit('error',err);
      self.push(data);
      next();
    });
  });
};
