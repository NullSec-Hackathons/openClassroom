var express = require('express');
var app = express();
var server = require('http').Server(app);
var PORT = process.env.PORT || 1234;
//var switchboard = require('rtc-switchboard')(server);
app.use('/js/',express.static(__dirname+'/js/'));
app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/ind.html');
})
server.listen(PORT,()=>{
  console.log(`listening on port:${PORT}`);
});

require('./signalling-server.js')(server, function(socket){
  var params = socket.handshake.query;
  if (!params.socketCustomEvent) {
    params.socketCustomEvent = 'custom-message';
}
  socket.on(params.socketCustomEvent,function(msg){
    socket.broadcast.emit(params.socketCustomEvent, msg);
  });
});

//require('reliable-signaler')(server);
