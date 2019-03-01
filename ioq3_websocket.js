

logBlob = function(msg, blob) {
	const fileReader = new FileReader();
	fileReader.onload = function() {
		console.log(msg, this.result);
	};
	fileReader.readAsText(blob);	
}

mallocUint8array = function(arr) {
	const addr = _malloc(arr.length)
	for (var i=0; i<arr.length; i++) {
		HEAPU8[addr + i] = arr[i];		
	}
	return addr;
}
	
memoryString = function(addr, len) {
	const buf = new Uint8Array(len)
	for (var i=0; i < len; i++)
		buf[i] = HEAPU8[addr+i]
	return buf;
}

connect = function() {
	var ws = new WebSocket(ws_url);	
	ws.binaryType = "arraybuffer"; // who invented these fuckin only-convert-with-callback blobs
	
	ws.onopen = function () {
		//ws.send('Ping');
	};
	ws.onerror = function (error) {
		console.log('WebSocket Error ' + error);
		//Cmd_ExecuteString("disconnect");
		//ws.close();
		//connect();
	};

	// forward the packet from server to the webassembly
	ws.onmessage = function (e) {
		try {
			wsmsg = e.data;
			uint8 = new Uint8Array(e.data);
			msg = mallocUint8array(uint8);
			msg_length = uint8.length;
			//var asd  = memoryString(msg, msg_length)
			//console.log("Got from server: ", String.fromCharCode.apply(null, asd))
			_NET_inject_packet(127,0,0,1,27960,msg, msg_length)
			_free(msg);
			//console.log('Server: ' + e.data);
		} catch (e) {
			console.log(e);
		}
	};
	ws.onclose = function(e) {
		console.log("onclose", e)
	}
	return ws;
}

// _NET_inject_packet(127,0,0,1,5000,alloc_string("\xff\xff\xff\xffecho hi"), 11)
NET_send_packet = function(ip_a, ip_b, ip_c, ip_d, port, msg, msg_length) {
	try {
		if (ws.readyState == ws.CLOSED) {
			// Cmd_ExecuteString("disconnect"); // fucks up since this function is called per ES_ASM() probably
			ws = connect();
		}
		if (ws.readyState != ws.OPEN) { return; }// dont send stuff while e.g. connecting
		//console.log("NET_send_packet: ", ip_a, ip_b, ip_c, ip_d, port, msg, msg_length);
		buf = memoryString(msg, msg_length)
		//console.log("Send Client->Server: ", String.fromCharCode.apply(null, buf))
		ws.send(buf);
	} catch (e) {
		console.log("NET_send_packet", e)
	}
}

// sock = 0==client 1==server
// typedef enum { NS_CLIENT, NS_SERVER} netsrc_t;
callback_sendpacket = function(ip_a, ip_b, ip_c, ip_d, port, data, data_length, sock) {
	if (ws_debug)
		console.log("callback_sendpacket", arguments);
	try {
		if (ws.readyState == ws.CLOSED) {
			// Cmd_ExecuteString("disconnect"); // fucks up since this function is called per ES_ASM() probably
			ws = connect();
		}
		if (ws.readyState != ws.OPEN) { return; }// dont send stuff while e.g. connecting
		//console.log("NET_send_packet: ", ip_a, ip_b, ip_c, ip_d, port, data, data_length);
		buf = memoryString(data, data_length)
		//console.log("Send Client->Server: ", String.fromCharCode.apply(null, buf))
		ws.send(buf);
	} catch (e) {
		console.log("NET_send_packet", e)
	}
}
