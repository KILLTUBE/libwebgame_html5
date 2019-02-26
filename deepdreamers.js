Composer = function() {
	this.node = document.createElement("div");
	this.node.width = 900;
	this.node.height = 600;
	document.body.appendChild(this.node);
}
Composer.prototype.setDim = function(width, height) {
	this.node.width = width;
	this.node.height = height;
	for (var c of this.node.children) {
		c.width = width;
		c.height = height;
		//console.log("set width for ", c);
	}
}
Composer.prototype.fullwindow = function() {
	this.setDim(window.innerWidth, window.innerHeight);
}
Composer.prototype.addCanvas = function() {
	var canvas = document.createElement("canvas");
	//canvas.id = id; // todo? like: "layer" + childcount
	canvas.width = this.node.width;
	canvas.height = this.node.height;
	this.node.appendChild(canvas);
	return canvas;
}


//window.onresize = function() {
//	composer.setDim(window.innerWidth, window.innerHeight);
//}

// class definitions

DeepDreamers = function(canvas) {
	this.objects = [];
	this.imguiables = [];
	this.renderablesQuake = [];
	this.canvas = canvas;
	this.gl = this.canvas.getContext("webgl");
	for (var clazz of DeepDreamers.classes)
		this.extend(clazz);
}
DeepDreamers.prototype.extend = function(clazz) {
	// on calling new dd.Canvas(512,512) I want to create a "Canvas", but 
	// it shall automatically have a "this.dd = this" field AND be registered in this.objects,
	// so that dd.render() can check if any object is "this.dirty"... and undirtyfy them
	
	// first, we clone the class
	var clone = new Object(clazz);
	// now we add a method to the class, so we can get a reference from it to "dd"
	var self = this;
	
	//clone.prototype.constructor = function() {
	//	console.log("hurr durr");
	//}
	clone.prototype.registerThisAndGetDD = function() {
		self.objects.push(this);
		return self;
	}
	//var self = this;
	//var original = clazz.prototype.constructor;
	//clazz.constructor = function() {
	//	
	//	this.dd = self;
	//	self.objects.push(213);
	//	debugger;
	//	original(arguments);
	//	
	//}
	//clazz.__proto__ = clazz.prototype;
	this[clazz.name] = clone;
}

// dd.new(Canvas)(512,512)
// i dont know atm how this could be written as: new dd.Canvas(512,512)
// this works/worked, but I rather use this.dd = registerThisAndGetDD() style in every constructor
//DeepDreamers.prototype.new = function(clazz) {
//	var self = this;
//	//DeepDreamers.current = this;
//	return function() {					
//		var o = new clazz(...arguments); // need the spread operator, otherwise the constructor doesnt accept the arguments
//		o.dd = self;
//		self.objects.push(o);
//		return o;
//	}
//}
DeepDreamers.prototype.imgui = function() {
	for (var o of this.imguiables) {
		try {
			o.imgui();
		} catch(e) {
			console.log(e);
		}
	}
}
DeepDreamers.prototype.renderQuake = function() {
	for (var o of this.renderablesQuake) {
		try {
			o.render();
		} catch(e) {
			console.log(e);
		}
	}
}
DeepDreamers.prototype.undirtyfy = function() {
	var count = 0;
	for (var o of this.objects) {
		if (o.dirty) {
			o.undirtyfy();
			count++;
		}
	}
	return count;
}
DeepDreamers.prototype.createVertexShader = function(source) {
	var gl = this.gl;
	var shader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) == false) {
		console.log("createVertexShader(source) failed to compile shader");
		console.log(shader);
		console.log(gl.getShaderInfoLog(shader));
		return undefined;
	}
	return shader;
}
DeepDreamers.prototype.createFragmentShader = function(source) {
	var gl = this.gl;
	var shader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) == false) {
		console.log("createFragmentShader(source) failed to compile shader");
		console.log(shader);
		console.log(gl.getShaderInfoLog(shader));
		return undefined;
	}
	return shader;
}
DeepDreamers.prototype.createProgram = function(vs, fs) {
	var gl = this.gl;
	var program = gl.createProgram();
	gl.attachShader(program, vs);
	gl.attachShader(program, fs);
	gl.linkProgram(program);
	if (gl.getProgramParameter(program, gl.LINK_STATUS) == false) {
		console.log("createProgram failed to link shaders");
		return undefined;
	}
	return program;
}
// static functions
DeepDreamers.registerClass = function(clazz) {
	DeepDreamers.classes.push(clazz);
}

//DeepDreamers.current = null; // set by new(), so the constructor of Canvas has access to DeepDreamers.current.gl

Canvas = function(width, height) {
	this.dd = this.registerThisAndGetDD();
	this.node = document.createElement("canvas");
	this.ctx = this.node.getContext("2d");
	this.node.width = width;
	this.node.height = height;
	this.dirty = false;
	this.texture = this.dd.gl.createTexture();
	this.drawMissingTexture();
	this.uploadTexture(); // so we have a valid texture until e.g. a URL is loaded
	this.clear();
}
Canvas.prototype.clear = function() {
	this.ctx.clearRect(0, 0, this.node.width, this.node.height);
}
Canvas.prototype.drawMissingTexture = function() {
	var amount = 128;
	var x = 256;
	var y = 256;
	this.ctx.strokeStyle = "red";
	this.ctx.lineWidth = 50;
	this.ctx.beginPath();
	this.ctx.moveTo(x - amount, y - amount);
	this.ctx.lineTo(x + amount, y + amount);
	this.ctx.stroke();
	this.ctx.moveTo(x + amount, y - amount);
	this.ctx.lineTo(x - amount, y + amount);
	this.ctx.stroke();			
}
Canvas.prototype.randomize = function() {
	var x = 256;
	var y = 256;
	var size = 256
	var grd = this.ctx.createRadialGradient(x, y, 0, x, y, size); // inner_x, inner_y, inner_radius, outer_x, outer_y, outer_radius
	grd.addColorStop(0, "red");
	grd.addColorStop(1, "rgba(1, 1, 0, .5)");
	this.ctx.fillStyle = grd;
	this.ctx.fillRect(0, 0, 512, 512); // left, top, width, height				
}
Canvas.prototype.drawURL = function(url) {
	this.image = new Image();
	var self = this;
	this.image.onload = function() {
		self.ctx.drawImage(self.image, 0, 0);
		self.dirty = true;
	}
	this.image.onerror = function(e) { console.log(e); }
	this.image.src = url;
}
Canvas.prototype.bindTexture = function() {
	this.dd.gl.bindTexture(this.dd.gl.TEXTURE_2D, this.texture);
}
Canvas.prototype.uploadTexture = function() {
	var gl = this.dd.gl;
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.node);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
	gl.bindTexture(gl.TEXTURE_2D, null);
}
Canvas.prototype.undirtyfy = function() {
	this.uploadTexture();
	this.dirty = false;
}
//DeepDreamers.registerClass(Canvas);
Program = function(vs_source, fs_source) {
	this.dd = this.registerThisAndGetDD();
	this.vs_source = vs_source;
	this.fs_source = fs_source;
	this.vs = this.dd.createVertexShader(vs_source);
	this.fs = this.dd.createFragmentShader(fs_source);
	this.program = this.dd.createProgram(this.vs, this.fs);
}
Program.prototype.use = function() {
	this.dd.gl.useProgram(this.program);
}
//DeepDreamers.registerClass(Program);