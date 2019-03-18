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
	this.tmp_position = new vec3_t(0, 0, 0);
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

// players[1].moveTo(players[0].position)

Player.prototype.moveTo = async function(pos) {
	// this.facePosition(pos)
	vec_a.sub2(pos, this.position) // vec_a = pos - this.position;
	_vectoangles(vec_a.ptr, vec_b.ptr); // save result in vec_b
	this.viewangles = vec_b;

	// this.walkTo(pos)
	this.walk(true);
	await wait(1000); // todo: proper walk speed calculation based on distance
	this.walk(false);
}

// players[0].position = vec_a.set(-504, -16, 1000)

Object.defineProperty(Player.prototype, "position", {
	get: function() {
		this.tmp_position.ptr = _jl_entity_get_pos(this.id);
		this.tmp_position.assignDataView();
		return this.tmp_position;
	},
	set: function(value) {
		return _jl_entity_set_pos(this.id, value.ptr);
	}
});

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


// precacheSound("sound/cash_register_open_coins_cha_ching_01.wav")
// players[0].playSound("sound/cash_register_open_coins_cha_ching_01.wav");

EV_GENERAL_SOUND = 45

Player.prototype.playSound = function(path) {
	var str = alloc_string(path);
	var i = _G_SoundIndex(str);
	_G_AddEvent(this.gent(), EV_GENERAL_SOUND, i);
	_free(str);
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
