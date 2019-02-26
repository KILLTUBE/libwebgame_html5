create_light_directional = function() {
	var light = new pc.Entity();
	light.addComponent("light", {
		type: "directional",
		color: new pc.Color(1, 1, 1),
		range: 100,
		intensity: 1,
		layers: [worldLayer.id, weaponlayer.id]
	});
	light.setLocalPosition(player.pos());
	light.setEulerAngles(-45,0,45)
	light.light.intensity = 0.5
	lights.addChild(light)
	return light
}

create_light_point = function() {
	var light = new pc.Entity();
	light.addComponent("light", {
		type: "point",
		color: new pc.Color(1, 1, 1),
		range: 1,
		layers: [worldLayer.id, weaponlayer.id]
	});
	light.setLocalPosition(player.pos());
	// set the direction for our light
	// light.setLocalEulerAngles(45, 30, 0);
	lights.addChild(light);
	return light
}

// playcanvas editor
// setup_light(0.5, 1, 0.388, 3)
// pbr corset scene https://cx20.github.io/gltf-test/examples/playcanvas/index.html?category=tutorialModels&model=Corset&scale=1&type=glTF
// setup_light(1, 1, 1, 3)

setup_light = function(exposure, gammaCorrection, skyboxIntensity, toneMapping) {
	pc.app.scene.exposure = exposure
	pc.app.scene.gammaCorrection = gammaCorrection
	pc.app.scene.skyboxIntensity = skyboxIntensity
	pc.app.scene.toneMapping = toneMapping
}

//light = new pc.Entity();
//light.addComponent("light", {
//type: "point",
//color: new pc.Color(1, 1, 1),
//range: 100,
//intensity: 1,
//castShadows: true,
//shadowBias: 0.005,
//normalOffsetBias: 0.01,
//shadowResolution: 2048,
//layers: [worldLayer.id, weaponlayer.id]
//});
//light.setLocalPosition(0, 0, 2);
//// light.setLocalEulerAngles(45, 30, 0); // set the direction for our light
//lights.addChild(light);
