fetch_array = function(url, type) {
	return new Promise(function(resolve, reject) {
		fetch(url).then(function(response) {
			response.arrayBuffer().then(function(arraybuffer) {
				resolve(new type(arraybuffer))
			})
		})
	})
}

  Int32Array.fetch = function(url) { return fetch_array(url, Int32Array  ) }
Float32Array.fetch = function(url) { return fetch_array(url, Float32Array) }

String.fetch = async function(url) {
	var arraybuffer = await fetch_cached_arraybuffer(url);
	var uint8array  = new Uint8Array(arraybuffer);
	//var string      = new TextDecoder("ascii").decode(uint8array);
	// TextDecoder result bugs with q3bsp.parse
	var string = "";
	for (var ascii of uint8array)
		string += String.fromCharCode(ascii);
	return string;
}

XML = function() {}
XML.fetch = async function(url) {
	return new Promise(function(resolve) {
		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", function() {
			resolve(this.responseXML);
		});
		oReq.open("GET", url);
		oReq.send();
	});
}

MagicFile = function() {
	//this.arraybuffer = arraybuffer; // atm dont care to save anything, just want it uploaded into webassembly
}

cached_fetches = {};
fetch_cached_arraybuffer = async function(url) {
	if (url in cached_fetches) {
		console.log("cached_fetch: ", url);
		return cached_fetches[url];
	}
	const promise = new Promise(async function(resolve, reject) {
		// todo: need some kind of system which loads the latest version, maybe query first a .json with timestamps or so
		const response    = await fetch(url);
		const arraybuffer = await response.arrayBuffer();
		resolve(arraybuffer);
	});
	cached_fetches[url] = promise;
	return promise;
}

// await MagicFile.fetch(url + "libwebgame/maps/atcs.bsp", "./maps/atcs.bsp")
MagicFile.fetch = async function(url, filename_internally) {
	var arraybuffer = await fetch_cached_arraybuffer(url);
	if (typeof arraybuffer === "undefined") {
		debugger;
	}
	var u  = new Uint8Array(arraybuffer);
	var mem = 0;
	
	// write the file byte by byte into the allocated memory... todo: check if there is a faster way
	mem = _malloc(u.length + 1);
	for (var i=0; i<u.length; i++) 
		HEAP8[mem + i] = u[i];
	HEAP8[mem + u.length] = 0; // terminate string
	
	var c_buffer = mem;
	var c_buffersize = u.length;
	var c_filename = alloc_string(filename_internally);
	// register the file for our fileapi.cpp system
	_file_loaded(c_filename, c_buffer, c_buffersize);
}
