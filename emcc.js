file_get_contents = function(path) {
	var c_string = alloc_string(path);
	var ret = _file_get_contents(c_string);
	_free(c_string);
	return ret;
}

Com_Init = function(commandline) {
	var c_string = alloc_string(commandline);
	var ret = _Com_Init(c_string);
	_free(c_string);
	return ret;
}

Cmd_ExecuteString = function(cmd) {
	var c_string = alloc_string(cmd);
	var ret = _Cmd_ExecuteString(c_string);
	_free(c_string);
}

alloc_string = function(str) {
    var mem = _malloc(str.length + 1);
    for (var i=0; i<str.length; i++) {
        HEAP8[mem + i] = str.charCodeAt(i);
		//console.log(str.charCodeAt(i));
    }
	HEAP8[mem + str.length]	= 0; // terminate string
    return mem;
}

addressToString = function(address) {
	var ret = "";
    for (var i=address; HEAP8[i]; i++) {
		ret += String.fromCharCode( HEAP8[i] );
	}
	return ret;
}