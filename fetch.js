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