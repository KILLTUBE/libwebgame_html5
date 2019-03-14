Player = function(id) {
	this.id = id;
	// <nope>not viable currently, i need to rewrite bunch of C code later that those basic structs are always available at fixed addresses</nope>
	this.assignDataViews();
	//this.tmp_velocity = new vec3_t();
}

Player.prototype.assignDataViews = function() {

	
	this.velocity = vec3_t.wrap(_jl_player_get_velocity(this.id));
	//this.viewangles = vec3_t.wrap(_jl_player_get_viewangles(this.id));
	this.tmp_viewangles = new vec3_t(0, 0, 0);
}

Player.prototype.gent = function() {
	return _jl_g_entities() + this.id * _jl_g_entities_sizeof();
}
/**
 * @param {boolean} state
 * @example
 * players[1].walk(true); await wait(100); players[1].walk(false);
 */

Player.prototype.walk = function(state) {
	_player_forwardmove(this.gent(), state);
}

Object.defineProperty(Player.prototype, "viewangles", {
	get: function() {
		this.tmp_viewangles.ptr = _jl_player_get_viewangles(this.id);
		this.tmp_viewangles.assignDataView();
		return this.tmp_viewangles;
	},
	set: function(value) {
		return _jl_player_set_viewangles(this.id, value.ptr);
	}
});

Object.defineProperty(Player.prototype, "deaths", {
	get: function() {
		return _player_get_deaths(this.gent());
	},
	set: function(value) {
		return _player_set_deaths(this.gent(), value);
	}
});

Object.defineProperty(Player.prototype, "health", {
	get: function() {
		return _player_get_health(this.gent());
	},
	set: function(value) {
		return _player_set_health(this.gent(), value);
	}
});

Object.defineProperty(Player.prototype, "maxhealth", {
	get: function() {
		return _player_get_maxhealth(this.gent());
	},
	set: function(value) {
		return _player_set_maxhealth(this.gent(), value);
	}
});

Object.defineProperty(Player.prototype, "score", {
	get: function() {
		return _player_get_score(this.gent());
	},
	set: function(value) {
		return _player_set_score(this.gent(), value);
	}
});

Object.defineProperty(Player.prototype, "team", {
	get: function() {
		return _player_get_team(this.gent());
	},
	set: function(value) {
		return _player_set_team(this.gent(), value);
	}
});

Player.prototype.forward = function() {
	var ret = player_forward(this.id);
	var arr = new Float32Array(3)
	arr[0] = ret.x;
	arr[1] = ret.y;
	arr[2] = ret.z;
	return arr;
}

//Object.defineProperty(Player.prototype, 'pos2', {
//	get: function() {
//		var n = _entity_get_position(0) >> 2 // divide by 4 for HEAPF32
//		var x = HEAPF32[n    ]
//		var y = HEAPF32[n + 1]
//		var z = HEAPF32[n + 2]
//		return new pc.Vec3(x/100.0, z/100, y/-100);
//	}
//});

player_pos_to_vector = function(id, vec3) {
	var n = _entity_get_position(0) >> 2 // divide by 4 for HEAPF32
	var x = HEAPF32[n    ]
	var y = HEAPF32[n + 1]
	var z = HEAPF32[n + 2]
	vec3.set(x/100.0, z/100, y/-100);
}

// depends on PlayCanvas pc.Vec3, call after its loaded
players_init = function() {
	players = Array(64)
	for (var i=0; i<64; i++)
		players[i] = new Player(i);

	playera = players[0]
	playerb = players[1]
	playerc = players[2]
	playerd = players[3]
}
