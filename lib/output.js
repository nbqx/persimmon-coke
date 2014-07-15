var through = require('through2'),
    clc = require('cli-color'),
    ent = require('ent');

function display(d){
  if(d.user!==undefined){
    return [
      clc.yellow(d.user.screen_name+": "),
      ent.decode(d.text),
      clc.blackBright(" - "+d.created_at+" (id: "+d.id_str+")")
    ].join('');
  }else{
    return JSON.stringify(d)
  }
};

module.exports = through.obj(function(c,enc,next){
  console.log(display(c));
  this.push(c);
  next();
});

