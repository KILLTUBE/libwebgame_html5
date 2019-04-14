gametime = function() {
	return Date.now() - starttime;
}

WindowMode_Small = 0;
WindowMode_FullWindow = 1;
WindowMode_FullScreen = 2;

fullwindow = function() {
	windowmode = WindowMode_FullWindow;
	//canvas_and_overlay.style.position = "absolute";
	//canvas_and_overlay.style.width = window.innerWidth + "px";
	//canvas_and_overlay.style.height = window.innerHeight + "px";
	//canvas.width = window.innerWidth;
	//canvas.height = window.innerHeight;
	//fixCanvasSizes(window.innerWidth, window.innerHeight);
}

ticks = function() {
	return Date.now() - starttime;
}

myrun = function() {
	//Module['setStatus'] = false;
	run();
	if (Module['calledRun']) {
		//console.log("MY RUN", Module['calledRun']);
		//console.log("RUN RUN RUN");
		main_called();
	}
}

mainloop = function() {
	try {

		try {
			if (showQuake) {
				_quake_set_widthheight(window.innerWidth, window.innerHeight);
				//_GL_BindNullProgram()
				//_GL_BindNullTextures()
				//_R_BindNullVao()
				//player_pos_to_vector(0, playera.pos)
				//mailas[0].setLocalPosition(playera.pos)
				_Com_Frame();
				
				//gltf_maila_hands.setLocalPosition(player.pos());
				//const pitch = _viewpos_pitch() * -1.0;
				//const yaw   = _viewpos_yaw() /*- 90.0*/;
				//gltf_maila_hands.setLocalEulerAngles(pitch, yaw, 0);
				
				//gltf_maila_hands.setLocalPosition( entity_cam.getLocalPosition() )
				//gltf_maila_hands.setLocalRotation( entity_cam.getLocalRotation() )
			}
		} catch (e) {
			console.log("quake mainloop error");
			qerror = e;
			//console.log(e);
		}

		aht_centerprint.update();
		aht_print.update();
		//aht_chat.update();
		//aht_teamchat.update();
		
	} catch (e) {
		console.log("mainloop", e);
	}
	//_mainloop();
	//requestAnimationFrame(mainloop);
}

fixCanvasSizes = function(width, height) {
	for (var i=0; i<canvas_and_overlay.children.length; i++) {
		var node = canvas_and_overlay.children[i];
		//console.log(node, node.tagName);
		if (node.tagName == "CANVAS") {
			node.width = width;
			node.height = height;
		}
	}
}

dim = function(width, height) {
	canvas_and_overlay.style.width = width + "px";
	canvas_and_overlay.style.height = height + "px";
	//canvas.width = width
	//canvas.height = height
	fixCanvasSizes(width, height);
}

/*
Game = function() {}

Game.fullscreen = function() {
	// this fullscreen is triggered e.g. by a button
	// we request the fullscreen, that means ESC will immediately kill the fullscreen
	// thats totally annoying when debugging with devconsole, but good enough for the normal user
	// simply pressing F11 is the developer way to go fullscreen, so ESC doesnt leave it
	// document.webkitFullscreenElement == null means F11, otherwise its the requested fullscreen element
	//$(canvas).fullScreen(true);
	$(canvas_and_overlay).fullScreen(true);
}
*/

fullscreenchange = function() {
	if (isFullscreen()) {
		console.log("Fullscreen On");
		//dim(document.body.clientWidth, document.body.clientHeight)
		dim(window.innerWidth, window.innerHeight);

	} else {
		console.log("Fullscreen Off");
	}
	resize();
}


isFullscreen = function() { return 1 >= outerHeight - innerHeight }

resize = function() {
	console.log("resize...");
	if (windowmode == WindowMode_FullWindow) {
		fullwindow();
		return;
	}
	// only fix canvas size if fullscreen... otherwise keep to 900x600
	//if ($(document).fullScreen()) {
	if (isFullscreen()) {
		if (document.webkitFullscreenElement == null) {
		} else {
			// in user triggered fullscreen mode, we can simply adjust 
		}
		// assume total screen width/height
		var new_width = screen.width;
		var new_height = screen.height;
		//canvas_and_overlay.style.position = "absolute"
		//canvas_and_overlay.style.left = "0px"
		//canvas_and_overlay.style.top = "0px"
		//canvas.style.left = 0;
		//canvas.style.top = 0;
		// but substract to window.innerHeight oder window.innerWidth if devtools are open
		var threshold = 150; // e.g. Download list is around 70px
		if (window.outerWidth - window.innerWidth > threshold) // devtools are left/right
			new_width = window.innerWidth;
		if (window.outerHeight - window.innerHeight > threshold) // devtools top/bottom
			new_height = window.innerHeight;
		//new_width = window.innerWidth;
		//new_height = window.innerHeight;
		//dim(canvas.width, canvas.height)
		dim(new_width, new_height);
	} else {
		//canvas.width = 900;
		//canvas.height = 600;
		//canvas.style.position = ""
		//canvas_and_overlay.style.position = "relative";
		//dim(900, 600);
	}
}
