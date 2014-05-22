// this is not stream
var inq = require('inquirer');
module.exports = function(mes,cb){
  inq.prompt([{
    type: 'confirm',
    name: 'ans',
    message: mes
  }],cb);
};
