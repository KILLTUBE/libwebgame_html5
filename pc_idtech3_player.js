//Struct = require_asdasdasd('ref-struct')
//vec3 = Struct({
//  'x': 'float',
//  'y': 'float',
//  'z': 'float'
//});
//
//player_forward = ccall("jl_player_forward", vec3, ["int"])

Player = function(id) {
	this.id = id;
	this.pos = new pc.Vec3(0,0,0);
}

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
