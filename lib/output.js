var through = require('through2'),
    clc = require('cli-color'),
    ent = require('ent');

function display(d,color){
  if(d.user!==undefined){
    if(!color){
      return [
        clc.yellow(d.user.screen_name+": "),
        ent.decode(d.text),
        clc.blackBright(" - "+d.created_at+" (id: "+d.id_str+")")
      ].join('');
    }else{
      return [
        d.user.screen_name+": ",
        ent.decode(d.text),
        " - "+d.created_at+" (id: "+d.id_str+")"
      ].join('');
    }
  }else{
    return JSON.stringify(d)
  }
};

module.exports = function(color){
  return through.obj(function(c,enc,next){
    console.log(display(c,color));
    this.push(c);
    next();
  });
};

