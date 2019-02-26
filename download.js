
// path_to_download("./maps/mp_toujane.bsp")
path_to_download = function(path) {
	download = downloadProjectLibAcidTech.downloadsAssoc[path]
	return download;
}


/*
	load_url_as_binarybuffer(url + "/libwebgame/maps/mp_toujane.bsp", function(arraybuffer) {
		mp_toujane = arraybuffer
	});
*/
load_url_as_binarybuffer = function(url, callback) {
	fetch(url).then(function(response) {
		r = response;
		response.arrayBuffer().then(function(arraybuffer) {
			callback(arraybuffer)
        })
    })
}

DownloadProject = function(name) {
	this.name = name;
	this.downloads = [];
	this.downloadsAssoc = {}
	this.loadFiles()

	this.distrib = url + "/" + name;
	
	this.onReadyCallbacks = [];
	this.onReady = function(cb) {
		this.onReadyCallbacks.push(cb);
	};
}

DownloadProject.prototype.loadFiles = function() {
	var self = this;
	//var filesAjax = $.ajax( "FileDistributor.php/index.php?project=" + self.name )
	//var filesAjax = $.ajax( "build_a/files_" + self.name + ".json" )
	var filesAjax = $.ajax( url + "/files_" + self.name + ".json?time=" + Date.now() ) // todo: use proper hash or lastChange
	.done(function(files) {
		//alert( "success"  + msg);
		self.files = files;
		self.bytes = 0;
		self.progress = 0; // 0 to 1, self.loadedBytes / self.bytes
		self.loadedBytes = 0;
		for (var file of files) {
			self.bytes += file.filesize;
			var dl = new Download(self.distrib + "/" + file.filename /*+ "?lastChange=" + file.lastChange*/, file.filename, file.filesize);
			dl.project = self;
			self.downloads.push( dl );
			self.downloadsAssoc[file.filename] = dl;
		}
	})
	.fail(function(msg) {
		//alert( "error" + msg);
	})
}

DownloadProject.prototype.ready = function() {
	// dont pretend to be ready when loadFiles() didnt even get the json file list
	if (this.downloads.length == 0)
		return false;
	for (var i=0; i<this.downloads.length; i++) {
		if (this.downloads[i].ready == false)
			return false;
	}
	return true;
}

getExtension = function(filename) {
	return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
}

function Download(filename, filename_internally, filesize) {
    this.filename = filename;
    this.filename_internally = filename_internally;
	this.ready = false;
	this.c_filename = 0;
	this.c_buffer = 0;
	this.c_buffersize = 0;
	this.buffer = undefined;
	this.filesize = filesize;
	var self = this;
	
	{
	
		fetch(filename).then(function(response) {
			r = response;
			response.arrayBuffer().then(function(arraybuffer) {
				
				self.project.loadedBytes += self.filesize;
				self.project.progress = self.project.loadedBytes / self.project.bytes;
				self.project.procent = Math.floor(self.project.progress * 100)
				aht_centerprint.addText(`${self.project.procent}% - ${self.filename_internally}`);
				
				// need to figure out some proper meta information
				//if (arraybuffer.length % 4 == 0)
				//	self.asFloat = new Float32Array(arraybuffer)
				// meh, after all, this shit class should just do downloading... not mallocing and converting and whatnot...
				// so just save the arraybuffer for later usage
				self.arraybuffer = arraybuffer;
				
				// write the file byte by byte into the allocated memory... todo: check if there is a faster way
				
				
				
				ab = arraybuffer;
				u = new Int8Array(ab)
				mem = 0
				
				//if (isJPG == false) {
					mem = _malloc(u.length + 1);
					for (var i=0; i<u.length; i++) 
						HEAP8[mem + i] = u[i];
					HEAP8[mem + u.length] = 0; // terminate string
				//}
				// set some maintainance values for debugging
				self.ready = true;
				self.buffer = u;
				self.c_buffer = mem;
				self.c_buffersize = u.length;
				self.c_filename = alloc_string(filename_internally);
				// register the file for our fileapi.cpp system
				_file_loaded(self.c_filename, self.c_buffer, self.c_buffersize)
				
				
				if (getExtension(self.filename_internally) == "js")
				{
					try {
						var source = new TextDecoder().decode( self.buffer );
						var wrapeval = function(source) {
							eval(source);
						}
						wrapeval.bind(self.project)(source);
					} catch (e) {
						console.log(e);
					}
				}
				// and make this pleb say something
				//console.log("Download finished: ", filename, " as ", filename_internally);
				
				if (self.project.ready()) {
					for (var callback of self.project.onReadyCallbacks)
						callback();
				}
			})
		})
	}
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
	var uint8array  = new Uint8Array(arraybuffer);
	var u = uint8array;
	var mem = 0;
	
	// write the file byte by byte into the allocated memory... todo: check if there is a faster way
	mem = _malloc(u.length + 1);
	for (var i=0; i<u.length; i++) 
		HEAP8[mem + i] = u[i];
	HEAP8[mem + u.length] = 0; // terminate string
	
	var ready = true;
	var buffer = u;
	var c_buffer = mem;
	var c_buffersize = u.length;
	var c_filename = alloc_string(filename_internally);
	// register the file for our fileapi.cpp system
	_file_loaded(c_filename, c_buffer, c_buffersize)
}
