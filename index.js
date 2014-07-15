#! /usr/bin/env node
var fs = require('fs');
var argv = require('yargs').argv;
var cmd = require(__dirname+'/cmds');

// TODO: 
// cmd.update() with confirm

// TODO: 
// cmd.show(id);

// TODO: 
// cmd.favorite(id);

function title(){
  fs.createReadStream(__dirname+'/t/title.txt').pipe(process.stdout);
};

var n = 10;
if(process.stdin.isTTY){
  if(argv.n) n = argv.n; 
  var color = argv.nocolor || false;

  // home or user timeline
  if(argv.u || argv.user){
    var user = argv.u || argv.user;
    if(typeof user === 'string'){
      cmd.user(user,n,color).on('error',function(err){
        console.log(err);
        process.exit(1);
      });
    }else{
      cmd.home(n,color).on('error',function(err){
        console.log(err);
        process.exit(1);
      });
    }
  }

  // stream
  else if(argv.stream){
    title();

    cmd.stream(color).on('error',function(err){
      console.log(err);
      process.exit(1);
    });

    process.once('SIGINT',function(){
      process.exit(0);
    });
  }

  // raw-stream
  else if(argv.raw){

    cmd.raw_stream().on('data',function(data){
      console.log(JSON.stringify(data));
    }).on('error',function(err){
      console.log(err);
      process.exit(1);
    });

    process.once('SIGINT',function(){
      process.exit(0);
    });
  }

  // status update
  else if(argv._.length!==0){
    var txt = argv._.join(' ');

    // TODO: with confirm
    // var confirm = require(__dirname+'/lib/confirm');
    // confirm('update? ',function(){
    //   console.log('TODO!');
    // });
    
    cmd.update(txt).on('error',function(err){
      console.log(err);
    });
  }

  // help
  else if(argv.h || argv.help){
    fs.createReadStream(__dirname+'/t/usage.txt').pipe(process.stdout);
  }

  // default
  else{
    cmd.home(n,color).on('error',function(err){
      console.log(err);
      process.exit(1);
    });
  }

}else{
  process.stdin.on('data',function(data){
    var txt = data+'';
    cmd.update(txt).on('error',function(err){
      console.log(err);
    });
  });
}
