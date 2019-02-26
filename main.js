/*
when project is downloaded, call a cb function, which adds hooks into the EmscriptenCustomPage for keyboard/mouse
also 
*/

loadQuake = function() {
	downloadProjectLibAcidTech = new DownloadProject("libwebgame");
	setTimeout(checkQuakeDownloadsReady, 1);
}

printstring = function(str) {
	printstrings.innerHTML += str;
}

printstrings_clear = function() {
	while (printstrings.firstChild !== null)
		printstrings.firstChild.remove();
}



callback_main = function() {
	fullwindow();
	players_init();
	
	windowmode = WindowMode_Small;
	starttime = Date.now();
		
	canvas_and_overlay = document.getElementById("canvas_and_overlay");
	overlay = document.getElementById("overlay");
	printstrings = document.createElement("div");
	overlay.appendChild(printstrings);
	
	
	
	fullwindow();
	
	// why the fuck this shit doesnt work
	//canvas_ = document.getElementById("canvas")
	//canvas_ = document.getElementsByClassName("emscripten_border")[0]
	canvas_ = document;
	
	aht_centerprint = new AnimatedHistoryText( -1, 120, 36,  true);
	aht_print       = new AnimatedHistoryText( 20, 400, 16, false);
	aht_chat        = new AnimatedHistoryText( 20, 100, 16, false);
	aht_teamchat    = new AnimatedHistoryText( 20, 200, 16, false);

	downloadProjectImGui = new DownloadProject("imgui");
	
	//downloads.push( new Download("sheepshooter/baseq3/mod.pk3?1234567"  , "./baseq3/mod.pk3" ) );
	//downloads.push( new Download("assets/javascript/lib.js") );
	//downloads.push( new Download("testzip.pk3") );
	//downloads.push( new Download("demo_pak0.pk3") );
	
	playcanvas_setup();
	

	StartRenderingWhenReady()
	//fitcanvas()
}

StartRenderingWhenReady = function() {
	if (downloadProjectImGui.ready()) {
		
		
		//dd = new DeepDreamers(canvas)
		//
		//for (var callback of whenReadyCallbacks)
		//	callback();
		//whenReadyCallbacks = [];
		loadQuake();
		//set_input_events(canvas);
		set_input_events(document); // so F1 doesnt open Help, F5 doesnt reload page etc.
		
		//requestAnimationFrame(mainloop);
		
	} else {
		setTimeout(StartRenderingWhenReady, 100);
	}
}

whenReady = function(callback) {
	whenReadyCallbacks.push(callback);
}

evalwrapper = function(code) {
	return eval(code);
}
globaleval = function(code) {
	return evalwrapper.bind(globals)(code);
}
globaleval("this.loool = 333")
