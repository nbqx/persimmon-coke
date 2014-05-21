var through = require('through2'),
    clc = require('cli-color');

function display(d){
  return [
    clc.yellow(d.user.screen_name+": "),
    d.text,
    clc.blackBright(" - "+d.created_at+" (id: "+d.id_str+")")
  ].join('');
};

module.exports = through.obj(function(c,enc,next){
  console.log(display(c));
  this.push(c);
  next();
});

