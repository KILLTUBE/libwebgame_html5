// just change some .js files and call reload() 
// each js function will be overwritten while the game keeps running, very nice for quick testing/prototyping

url = "../libwebgame_assets/";

whenReadyCallbacks = [];

globals = {}
globals_pc = {} // for PlayCanvas... fixing prototypes doesnt work for PC yet, gotta figure out what they do exactly

// input.js
// debugKeys = true
debugKeys = false;

// downloads.js
downloads = [];

NULL = 0;

// ioq3_websocket.js
ws_url = "ws://" + window.location.hostname + ":8080";
ws_debug = false;

// game.js			
console.error = console.log;
starttime = Date.now();
showQuake = false;
//$(document).ready(function() {

// pc_fetch.js
// resolve the promise with cached asset.resource if its already loaded
// works around the limitation of PlayCanvas loadFromUrl API which only callbacks once
cached = {};

// pc_maila_model.js
mailas = [];

// pc_maila_skeleton.js
skeletons = [];

// pc_idtech3.js
refents = {};
trmodels = [];
trmodelsMap = {};
globalDisableCount = 0;
globalEnabledCount = 0;

// pc_kungmesh.js
cache_kungmesh = {};


fetch_script = function(url) {
	return new Promise(function(resolve, reject) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.onload = function() {
			resolve(script)
		}
		script.src = url;
		document.head.appendChild(script);
	});
}

reload = async function() {
	console.log("<reload>");

	var urls = [];
	urls.push("input.js");
	urls.push("chat.js");
	urls.push("emcc.js");
	urls.push("ioq3.js");
	urls.push("ioq3_websocket.js");
	urls.push("game.js");
	urls.push("TextLine.js");
	urls.push("AnimatedHistoryText.js");
	urls.push("repl.js");
	urls.push("clipboard.js");
	urls.push("canvas.js");
	urls.push("fetch.js");

	urls.push("toji_binaryfile.js");
	urls.push("toji_q3bsp_worker.js");

	urls.push("pc_samba.js");
	urls.push("pc_morphcube.js");
	urls.push("pc_maila_model.js");
	urls.push("pc_procedural_mesh.js");
	urls.push("pc_lights.js");
	urls.push("pc_hierarchy_lines.js");
	urls.push("pc_fps_camera.js");
	urls.push("pc_skybox.js");
	urls.push("pc_utils.js");
	urls.push("pc_init.js");
	urls.push("pc_idtech3.js");
	urls.push("pc_idtech3_player.js");
	urls.push("pc_bsp.js");
	urls.push("pc_setup.js");
	urls.push("pc_kungmesh.js");
	urls.push("pc_game_materials.js");
	urls.push("pc_fetch.js");
	urls.push("stuff.js");
	urls.push("socketio.js");

	// JS bindings to idtech3
	urls.push("vec3_t.js");

	urls.push("q3config.js");

	var files = []; // bunch of <script> promises

	for (var url of urls) {
		var file = fetch_script(url);
		files.push(file);
	}
	
	await Promise.all(files);

	console.log("</reload>");
}

// this needs custom emscripten code: https://github.com/KILLTUBE/libwebgame_html5/issues/5
fetch_emscripten = function(url) {
	// first setup our promise, which will be resolved when the emscripten libwebgame.js called `callback_main()`
	var promise = new Promise(function(resolve, reject) {
		callback_main = function() {
			resolve();
		}
	});
	// now load the actual emscripten libwebgame.js, we dont need to await this
	fetch_script(url);
	return promise;
}

fetch_libwebgame = async function() {
	var prefix = window.location.origin; // == "http://127.0.0.1"

	await fetch_script(prefix + "/libwebgame_vendorstuff/jquery-3.2.1.min.js");
	await fetch_script(prefix + "/libwebgame_vendorstuff/jquery.fullscreen.js");
	await fetch_script(prefix + "/libwebgame_vendorstuff/gl-matrix-min.js");
	await fetch_script(prefix + "/libwebgame_vendorstuff/socket.io.slim.js");

	await fetch_script(prefix + "/playcanvas-engine/build/output/playcanvas-latest.js");

	await fetch_script(prefix + "/playcanvas-gltf/src/AnimationClip.js");
	await fetch_script(prefix + "/playcanvas-gltf/src/AnimationClipSnapshot.js");
	await fetch_script(prefix + "/playcanvas-gltf/src/AnimationComponent.js");
	await fetch_script(prefix + "/playcanvas-gltf/src/AnimationCurve.js");
	await fetch_script(prefix + "/playcanvas-gltf/src/AnimationEvent.js");
	await fetch_script(prefix + "/playcanvas-gltf/src/AnimationKeyable.js");
	await fetch_script(prefix + "/playcanvas-gltf/src/AnimationSession.js");
	await fetch_script(prefix + "/playcanvas-gltf/src/AnimationTarget.js");
	await fetch_script(prefix + "/playcanvas-gltf/src/playcanvas-anim.js");
	await fetch_script(prefix + "/playcanvas-gltf/src/playcanvas-gltf.js");
	

	await reload();

	await fetch_emscripten("libwebgame.js");
	after_main_called();
}
