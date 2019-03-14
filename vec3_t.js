
vec3_t = function(x, y, z) {
	this.ptr = _malloc(3 * 4) // 3 * sizeof(float)
	this.assignDataView();
	if (arguments.length == 3) {
		this.data[0] = x;
		this.data[1] = y;
		this.data[2] = z;
	} else {
		this.data[0] = 0.0;
		this.data[1] = 0.0;
		this.data[2] = 0.0;
	}
}

vec3_t.wrap = function(ptr) {
	var tmp = Object.create(vec3_t.prototype);
	tmp.ptr = ptr;
	tmp.data = new Float32Array(Module.buffer, tmp.ptr, 3);
	return tmp;
}

vec3_t.prototype.assignDataView = function() {
	this.data = new Float32Array(Module.buffer, this.ptr, 3);
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {vec3_t} chaining
 */

vec3_t.prototype.set = function(x, y, z) {
	this.data[0] = x;
	this.data[1] = y;
	this.data[2] = z;
	return this;
}

Object.defineProperty(vec3_t.prototype, "x", {
	get: function(   ) {
		return this.data[0];
	},
	set: function(tmp) {
		this.data[0] = tmp;
		return tmp;
	}
});

Object.defineProperty(vec3_t.prototype, "y", {
	get: function(   ) {
		return this.data[1];
	},
	set: function(tmp) {
		this.data[1] = tmp;
		return tmp;
	}
});

Object.defineProperty(vec3_t.prototype, "z", {
	get: function() {
		return this.data[2];
	},
	set: function(tmp) {
		this.data[2] = tmp;
		return tmp;
	}
});
