// this is not stream
var inq = require('inquirer');
module.exports = function(mes,t,cb){
  inq.prompt([{
    type: 'confirm',
    name: 'ans',
    message: mes
  }],function(o){
    var a = o.ans;
    if(a) cb(t);
  });
};
