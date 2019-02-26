
vec3_t = function(x, y, z) {
	this.pointer = _malloc(3 * 4) // 3 * sizeof(float)
	this.view = new Float32Array(Module.buffer, this.pointer, 3);
	if (arguments.length == 3) {
		this.view[0] = x;
		this.view[1] = y;
		this.view[2] = z;
	} else {
		this.view[0] = 0.0;
		this.view[1] = 0.0;
		this.view[2] = 0.0;
	}
}

Object.defineProperty(vec3_t.prototype, "x", {
	get: function(   ) { return this.view[0];            },
	set: function(tmp) { this.view[0] = tmp; return tmp; }
});

Object.defineProperty(vec3_t.prototype, "y", {
	get: function(   ) { return this.view[1];            },
	set: function(tmp) { this.view[1] = tmp; return tmp; }
});

Object.defineProperty(vec3_t.prototype, "z", {
	get: function(   ) { return this.view[2];            },
	set: function(tmp) { this.view[2] = tmp; return tmp; }
});