// tmp = new Canvas(512, 512)

Canvas = function(width, height) {
	this.node = document.createElement("canvas");
	this.ctx = this.node.getContext("2d");
	this.node.width = width;
	this.node.height = height;
	this.dirty = false;
	this.texture = app.graphicsDevice.gl.createTexture();
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
	var gl = app.graphicsDevice.gl;
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
}
Canvas.prototype.uploadTexture = function() {
	var gl = app.graphicsDevice.gl;
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
