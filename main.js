printstring = function(str) {
	printstrings.innerHTML += str;
}

printstrings_clear = function() {
	while (printstrings.firstChild !== null)
		printstrings.firstChild.remove();
}

after_main_called = function() {
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

	playcanvas_setup();
	ws = connect();
	main_playcanvas();
	//set_input_events(canvas);
	set_input_events(document); // so F1 doesnt open Help, F5 doesnt reload page etc.
	//fitcanvas()
}
