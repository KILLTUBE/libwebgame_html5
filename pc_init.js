ensure_gltf_root = function() {
	if (typeof gltfRoot == "undefined") {
		gltfRoot = new pc.Entity("gltfRoot");
		app.root.addChild(gltfRoot);
	}
}

loadPlayCanvas = function() {
	body.onresize = resize;
	
	// asset stuff
	app.loader.getHandler("texture").crossOrigin = "anonymous"
	
	// ripped from https://github.com/playcanvas/engine/blob/master/examples/layers/index.html
	weaponlayer = new pc.Layer({name: "Weapon Layer"});
	//weaponlayer.opaqueSortMode = pc.SORTMODE_MANUAL
	worldLayer = app.scene.layers.getLayerByName("World"); // get the world layer index
	idx = app.scene.layers.getTransparentIndex(worldLayer);
	app.scene.layers.insert(weaponlayer, idx+1); // insert the new layer after the world layer
	skyboxLayer = app.scene.layers.getLayerByName("Skybox");

	red   = createMaterial(new pc.Color(1,0,0));
	green = createMaterial(new pc.Color(0,1,0));
	blue  = createMaterial(new pc.Color(0,0,1));
	white = createMaterial(new pc.Color(1,1,1));
	black = createMaterial(new pc.Color(0,0,0));

	app.root.name = "root"
	
	entity_cam = new pc.Entity();
	entity_cam.addComponent("camera", {
		clearColor: new pc.Color(0.5, 0.5, 0.8),
		nearClip: 0.03,
		farClip: 2000,
		fov: 100, // feels kinda strange when looking up/down, maybe switch projection matrix calculation or something
		horizontalFov: true, // maaaan looking up/down looks so shit without this, but doesnt feel perfect yet too...
		// if i set only this layer, the skybox wont work...
		//layers: [worldLayer.id/*, weaponlayer.id*/]
	});
	entity_cam_weapon = new pc.Entity();
	entity_cam_weapon.addComponent("camera", {
		clearColor: new pc.Color(0.5, 0.5, 0.8),
		nearClip: 0.03,
		farClip: 2000,
		fov: 100, // feels kinda strange when looking up/down, maybe switch projection matrix calculation or something
		horizontalFov: true, // maaaan looking up/down looks so shit without this, but doesnt feel perfect yet too...
		layers: [/*worldLayer.id,*/ weaponlayer.id]
	});

	entity_cam_weapon.camera.clearColorBuffer = false
	
	entity_cam.addComponent("script");
	entity_cam.script.create("firstPersonCamera");
	app.root.addChild(entity_cam);
	app.root.addChild(entity_cam_weapon);

	entity_cam.localPosition = new pc.Vec3(-4.6099114418029785, 3.9862234592437744, -3.417416572570801)
	entity_cam.camera.ex = -30
	entity_cam.camera.ey = 235
	
	ensure_gltf_root()
	
	setup_light(0.5, 1, 0.388, 3)
	
	lights = new pc.Entity("lights")
	app.root.addChild(lights)
	
	window.addEventListener('resize', function () {
		app.resizeCanvas(window.innerWidth, window.innerHeight);
	});
}

main_playcanvas = async function() {
	init_fps_camera();
	init_idtech3();
	loadPlayCanvas();

	//sky_on()
	sky_greenhouse();
	_q3_main();
	q3config();
	//Cmd_ExecuteString("connect :");
	showQuake = true;

	//await devmap("atcs")
	//await devmap("mp_beginning_quake3")
	//await devmap("mp_toujane")
	await devmap("mp_surf_utopia");
	//await devmap("haus");
	
	gltf_maila_hands = await spawn_maila_hands();
	gltf_maila_hands.animComponent.playSubstring("idle");
	//gltf_maila_hands.animComponent.animClips.map((clip)=>clip.name)
	//gltf_maila_hands.animComponent.animClips.map((clip)=>clip.pause())
	
	// for some reason setting `{layers: [5]}` doesnt work yet, those layer values are all `15`
	for (var mi of gltf_maila_hands.model.meshInstances)
		mi.layer = 5;
	//entity_cam.addChild(gltf_maila_hands);
	
	//mp44 = await spawn_mp44();
	//entity_cam_weapon.addChild(mp44);
	//gltf_maila_hands.children[0].children[1].children[0].children[4].addChild(mp44);
	
	//gltf_maila_hands.children[0].children[0].model.layers = [weaponlayer.id]; // rip nice api design
	//gltf_maila_hands.reparent(entity_cam_weapon);
	//Cmd_ExecuteString("cg_gunx -100"); // hide atm
	//Cmd_ExecuteString("cg_guny -2");
	//Cmd_ExecuteString("cg_gunz -2");
	
	//await devmap("mp_toujane")
	if (ws.readyState == ws.OPEN)
		Cmd_ExecuteString("connect :");
	if (true) {
		app.on("postrender", function() {
			mainloop();
		});
	}
}