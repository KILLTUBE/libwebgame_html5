//typedef enum {
// SE_NONE must be zero
SE_NONE = 0;		// evTime is still valid
SE_KEY = 1;			// evValue is a key code, evValue2 is the down flag
SE_CHAR = 2;		// evValue is an ascii char
SE_MOUSE = 3;		// evValue and evValue2 are relative signed x / y moves
SE_JOYSTICK_AXIS = 4;	// evValue is an axis number and evValue2 is the current state (-127 to 127)
SE_CONSOLE = 5;		// evPtr is a char*
//} sysEventType_t;

addbot      = () => Cmd_ExecuteString("addbot")
kill        = () => Cmd_ExecuteString("kill")
firstperson = () => Cmd_ExecuteString("set cg_thirdperson 0")
thirdperson = () => Cmd_ExecuteString("set cg_thirdperson 1")
giveall     = () => Cmd_ExecuteString("give all")
map_restart = () => Cmd_ExecuteString("map_restart")
god         = () => Cmd_ExecuteString("god")
maplist     = () => Cmd_ExecuteString("maplist")
respawn     = () => Cmd_ExecuteString("respawn")
status      = () => Cmd_ExecuteString("status")

map = async function(mapname) {
	await MagicFile.fetch(url + `libwebgame/maps/${mapname}.bsp`, `./maps/${mapname}.bsp`)
	Cmd_ExecuteString("map " + mapname)
}

devmap = async function(mapname) {
	await MagicFile.fetch(url + `libwebgame/maps/${mapname}.bsp`, `./maps/${mapname}.bsp`)
	Cmd_ExecuteString("devmap " + mapname)
}

testbots = function() {
	for (var i=0; i<32; i++) {
		addbot()
		_Com_Frame()
	}
}

rip_mailas_sync_hierarchy = function() {
	for (var maila of mailas) {
		maila.syncHierarchy = function() {}
	}
}

rip_mailas_dirtify = function() {
	for (var maila of mailas) {
		//maila._dirtify = function() {}
		maila.children[0]._dirtify = function() {}
	}
}

callback_printf = function(addr) {
	const str = addressToString(addr)
	console.warn(str);
}


sfx2name      = {};
sfx2asset     = {};
soundEntities = {};

nextSoundNum = 1;

debug_sound = false;

callback_AL_RegisterSound = function(sampleAddr) {
	const sample = addressToString(sampleAddr);
	const sfx = nextSoundNum++;
	sfx2name[sfx] = sample;
	if (debug_sound)
		console.warn("AL_RegisterSound", sample, sfx);
	// todo: print error when file doesnt exist
	pc.Sound.fetch(url + "libwebgame/" + sample).then(function(asset) {
		sfx2asset[sfx] = asset;
	});
	return sfx;
}

callback_AL_StartSound = function(origin, entnum, entchannel, sfx) {
	if (sfx == 0) {
		if (debug_sound)
		console.warn("Missing sound...");
		return;
	}
	if (debug_sound)
		console.warn("AL_StartSound", arguments);
	if (sfx in sfx2asset) {
		var name = sfx2name[sfx];
		var entity = new pc.Entity(name);
		app.root.addChild(entity);
		entity.addComponent("sound");
		entity.sound.addSlot(name, {
			loop: false,
			autoPlay: true,
			asset: sfx2asset[sfx]
		});
	}
}

// since sdl isnt linked by emscripten anymore, we need to write the bit of code we need ourselves
SDL_startTime = Date.now();
_SDL_GetTicks = function() {
	return (Date.now() - SDL_startTime) | 0;
}