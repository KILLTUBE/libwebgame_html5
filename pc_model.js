
//var entity, light, camera;
//
//// Create an Entity with a camera component
//var camera = new pc.Entity();
//camera.addComponent("camera", {
//	clearColor: new pc.Color(0,0,0)
//});
//
//camera.rotateLocal(-30, 0, 0);
//camera.translateLocal(0, 0, 5);
//
//// Create an Entity for the ground
//var ground = new pc.Entity();
//ground.addComponent("model", {
//	type: "box"
//});
//ground.setLocalScale(50, 1, 50);
//ground.setLocalPosition(0, -0.5, 0);
//
//// Create an Entity with a point light component and a sphere model component.
//var lightDir = new pc.Entity();
//lightDir.addComponent("light", {
//	type: "directional",
//	color: new pc.Color(1, .4, 0),
//	intensity: 1
//});
//lightDir.setLocalEulerAngles(-80, 70, 0);
//
//var light = new pc.Entity();
//light.addComponent("light", {
//	type: "spot",
//	color: new pc.Color(.6, .85, 1),
//	outerConeAngle: 45,
//	innerConeAngle: 40,
//	range: 20,
//	intensity: 2,
//	castShadows: true,
//	shadowBias: 0.005,
//	shadowResolution: 2048
//});
//light.setLocalPosition(0, 5, 0);
//light.addComponent("audiolistener");



// playbot = await Playbot()
Playbot = async function() {
	var playbot_assets = [
			pc.Sound.fetch(url + "playcanvas/examples/assets/footsteps_gravel_01.mp3"  ),
			pc.Model.fetch(url + "playcanvas/examples/assets/Playbot/Playbot.json"     ),
		pc.Animation.fetch(url + "playcanvas/examples/assets/Playbot/Playbot_run.json" ),
		pc.Animation.fetch(url + "playcanvas/examples/assets/Playbot/Playbot_idle.json")
	]	
	var [sound, model, anim_run, anim_idle] = await Promise.all( playbot_assets )
	
	var entity = new pc.Entity();
	
	
	// add sound component
	entity.addComponent('sound');

	//// add footsteps slot
	//entity.sound.addSlot('footsteps', {
	//	asset: sound,
	//	pitch: 1.7,
	//	loop: true,
	//	autoPlay: true
	//});

	// add model
	entity.addComponent("model", {
		type: "asset",
		asset: model,
		castShadows: true
	});

	// add animation
	entity.addComponent("animation", {
		assets: [anim_run, anim_idle],
		speed: 0.8
	});

	// add entity in the hierarchy
	app.root.addChild(entity);

	var pos;
	var angle = 135;
	var radius = 3;
	var height = 0;//1.1;
	//app.on("update", function (dt) {
	//	angle += 30*dt;
	//	if (angle > 360) {
	//		angle -= 360;
	//	}
	//	var pos = camera.getPosition();
	//	entity.setLocalPosition(radius * Math.sin(angle*pc.math.DEG_TO_RAD), height, radius * Math.cos(angle*pc.math.DEG_TO_RAD));
	//	entity.setLocalEulerAngles(0, angle+90, 0);
	//});
	return entity;
}

// maila = await Maila()
Maila_model_test = async function() {
	var playbot_assets = [
			pc.Model.fetch(url + "maila/Maila_Model.json"     ),
		//pc.Animation.fetch(url + "playcanvas/examples/assets/Playbot/Playbot_run.json" ),
		//pc.Animation.fetch(url + "playcanvas/examples/assets/Playbot/Playbot_idle.json")
	]	
	var [model/*, anim_run, anim_idle*/] = await Promise.all( playbot_assets )
	var entity = new pc.Entity();
	entity.addComponent("model", {
		type: "asset",
		asset: model,
		castShadows: true
	});

	//entity.addComponent("animation", {
	//	assets: [anim_run, anim_idle],
	//	speed: 0.8
	//});
	app.root.addChild(entity);


	return entity;
}