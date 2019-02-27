on_playerconnect = function(data) {
	console.log("on_playerconnect", data);
}

io_on_msg = function(msg) {
	//console.log("io_on_msg", msg);
	addChat(msg);
}

init_socket_io = function() {
	socket = io.connect('http://cloud.killtube.org:3000', {resource: 'nodejs'});
	socket.on("playerconnect", function(data) { on_playerconnect(data); });
	socket.on("msg"          , function(msg ) { io_on_msg(msg);         });
}
