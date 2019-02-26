playcanvas_setup = function() {
	playcanvas = document.getElementById("playcanvas");
	playcanvas.focus(); // focus the canvas for keyboard input
	app = new pc.Application(playcanvas, {
		mouse: new pc.Mouse(playcanvas),
		keyboard: new pc.Keyboard(window)
	});
	// Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
	app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
	app.setCanvasResolution(pc.RESOLUTION_AUTO);

	app.scene.ambientLight = new pc.Color(0.5, 0.5, 0.5);
	app.start();
}