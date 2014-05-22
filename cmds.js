var combine = require('stream-combiner');
var init = require(__dirname+'/lib/init'),
    auth = require(__dirname+'/lib/auth'),
    output = require(__dirname+'/lib/output'),
    home = require(__dirname+'/lib/home'),
    user = require(__dirname+'/lib/user'),
    update = require(__dirname+'/lib/update'),
    stream = require(__dirname+'/lib/stream'),
    show = require(__dirname+'/lib/show'),
    fav = require(__dirname+'/lib/fav');

var authStream = combine(init(),auth);

module.exports = {
  // getHomeTimeline
  home: function(n){ return combine(authStream,home({count:n}),output)  },
  
  // getUserTimeline
  user: function(name,n){ return combine(authStream,user({screen_name: name, count: n}),output) },

  // Stream
  stream: function(){ return combine(authStream,stream(),output)},

  // RawStream => output json for piping other program
  raw_stream: function(){ return combine(authStream,stream()) },

  // updateStatus
  update: function(mes){ return combine(authStream,update(mes),output) },

  // TODO: showStatus 404?
  show: function(id){ return combine(authStream,show(id),output) },

  // TODO: createFavorite 404?
  favorite: function(id){ return combine(authStream,fav(id),output) }
};
