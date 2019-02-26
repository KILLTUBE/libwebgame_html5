addressToStringSize = function(address, size) {
	var ret = "";
    for (var i=0; i<size; i++) {
		ret += String.fromCharCode( HEAP8[address + i] );
	}
	return ret;
}

// https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
save_file_locally = function(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

callback_save_file = function(data, size, filename) {
	data = addressToStringSize(data, size);
	filename = addressToString(filename);
	console.log("Saved ", filename, "Size: ", size/1024, "kb");
	//$.post( "FileDistributor.php/savefile.php", { "data": data, "filename": filename } );
	save_file_locally(filename, data);
}
