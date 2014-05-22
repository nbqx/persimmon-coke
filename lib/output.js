var through = require('through2'),
    clc = require('cli-color'),
    ent = require('ent');

function display(d){
  return [
    clc.yellow(d.user.screen_name+": "),
    ent.decode(d.text),
    clc.blackBright(" - "+d.created_at+" (id: "+d.id_str+")")
  ].join('');
};

module.exports = through.obj(function(c,enc,next){
  console.log(display(c));
  this.push(c);
  next();
});

