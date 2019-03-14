Player = function(id) {
	this.id = id;
	// <nope>not viable currently, i need to rewrite bunch of C code later that those basic structs are always available at fixed addresses</nope>
	this.assignDataViews();
	//this.tmp_velocity = new vec3_t();
}

Player.prototype.assignDataViews = function() {

	
	this.velocity = vec3_t.wrap(_jl_player_get_velocity(this.id));
	this.viewangles = vec3_t.wrap(_jl_player_get_viewangles(this.id));
}

//Object.defineProperty(Player.prototype, "velocity", {
//	get: function() {
//
//		return _player_get_deaths(this.id);
//	}
//});

Object.defineProperty(Player.prototype, "deaths", {
	get: function() {
		return _player_get_deaths(this.id);
	},
	set: function(value) {
		return _player_set_deaths(this.id, value);
	}
});

Object.defineProperty(Player.prototype, "health", {
	get: function() {
		return _player_get_health(this.id);
	},
	set: function(value) {
		return _player_set_health(this.id, value);
	}
});

Object.defineProperty(Player.prototype, "maxhealth", {
	get: function() {
		return _player_get_maxhealth(this.id);
	},
	set: function(value) {
		return _player_set_maxhealth(this.id, value);
	}
});

Object.defineProperty(Player.prototype, "score", {
	get: function() {
		return _player_get_score(this.id);
	},
	set: function(value) {
		return _player_set_score(this.id, value);
	}
});

Object.defineProperty(Player.prototype, "team", {
	get: function() {
		return _player_get_team(this.id);
	},
	set: function(value) {
		return _player_set_team(this.id, value);
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
