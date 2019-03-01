// "http://127.0.0.1/glTF-WebGL-PBR/models/AppleTree/glTF/AppleTree.gltf"

// s1 = await spawn_samba()
spawn_samba = async function() {
	var entity = await fetch_gltf(url + "gltf/SambaDancing/SambaDancing.gltf")
	entity.setLocalPosition( player.pos() )
	var scale = 0.006;
	entity.setLocalScale(scale, scale, scale)
	return entity
}

// corset = await spawn_corset()
spawn_corset = async function() {
	var entity = await fetch_gltf(url + "gltf/corset/Corset.gltf")
	entity.setLocalPosition( player.pos() )
	var scale = 0.8;
	entity.setLocalScale(scale, scale, scale)
	return entity
}

// appletree = await spawn_appletree()
spawn_appletree = async function() {
	var entity = await fetch_gltf(url + "gltf/AppleTree/AppleTree.gltf")
	entity.setLocalPosition( player.pos() )
	var scale = 0.8;
	entity.setLocalScale(scale, scale, scale)
	return entity
}

// damagedhelmet = await spawn_damagedhelmet()
spawn_damagedhelmet = async function() {
	var entity = await fetch_gltf(url + "gltf/DamagedHelmet/DamagedHelmet.gltf")
	entity.setLocalPosition( player.pos() )
	var scale = 0.8;
	entity.setLocalScale(scale, scale, scale)
	return entity
}

// flighthelmet = await spawn_flighthelmet()
spawn_flighthelmet = async function() {
	var entity = await fetch_gltf(url + "gltf/FlightHelmet/FlightHelmet.gltf")
	entity.setLocalPosition( player.pos() )
	var scale = 0.8;
	entity.setLocalScale(scale, scale, scale)
	return entity
}

// lantern = await spawn_lantern()
spawn_lantern = async function() {
	var entity = await fetch_gltf(url + "gltf/Lantern/Lantern.gltf")
	entity.setLocalPosition( player.pos() )
	var scale = 0.1;
	entity.setLocalScale(scale, scale, scale)
	return entity
}

// monkey = await spawn_monkey()
spawn_monkey = async function() {
	var entity = await fetch_gltf(url + "gltf/monkey/monkey.gltf")
	entity.setLocalPosition( player.pos() )
	var scale = 0.1;
	entity.setLocalScale(scale, scale, scale)
	return entity
}

// scifihelmet = await spawn_scifihelmet()
spawn_scifihelmet = async function() {
	var entity = await fetch_gltf(url + "gltf/scifihelmet/scifihelmet.gltf")
	entity.setLocalPosition( player.pos() )
	var scale = 0.1;
	entity.setLocalScale(scale, scale, scale)
	return entity
}

// yeti = await spawn_yeti()
spawn_yeti = async function() {
	var entity = await fetch_gltf(url + "gltf/yeti/Yeti_Idle.gltf")
	entity.setLocalPosition( player.pos() )
	var scale = 0.03;
	entity.setLocalScale(scale, scale, scale)
	return entity
}

// metalroughspheres = await spawn_metalroughspheres()
spawn_metalroughspheres = async function() {
	var entity = await fetch_gltf(url + "gltf/MetalRoughSpheres/MetalRoughSpheres.gltf")
	entity.setLocalPosition( player.pos() )
	var scale = 0.3;
	entity.setLocalScale(scale, scale, scale)
	return entity
}

// suzanne = await spawn_suzanne()
spawn_suzanne = async function() {
	var entity = await fetch_gltf(url + "gltf/Suzanne/Suzanne.gltf")
	entity.setLocalPosition( player.pos() )
	var scale = 0.3;
	entity.setLocalScale(scale, scale, scale)
	return entity
}

// normaltangentmirrortest = await spawn_normaltangentmirrortest()
spawn_normaltangentmirrortest = async function() {
	var entity = await fetch_gltf(url + "gltf/NormalTangentMirrorTest/NormalTangentMirrorTest.gltf")
	entity.setLocalPosition( player.pos() )
	var scale = 0.3;
	entity.setLocalScale(scale, scale, scale)
	return entity
}

// normaltangenttest = await spawn_normaltangenttest()
spawn_normaltangenttest = async function() {
	var entity = await fetch_gltf(url + "gltf/NormalTangentTest/NormalTangentTest.gltf")
	entity.setLocalPosition( player.pos() )
	var scale = 0.3;
	entity.setLocalScale(scale, scale, scale)
	return entity
}

// gltf_maila = await spawn_maila()
spawn_maila = async function() {
	var entity = await fetch_gltf(url + "gltf/maila_full_fixed/maila_full_fixed.gltf");
	//entity.setLocalPosition( player.pos() );
	var scale = 0.3;
	entity.setLocalScale(scale, scale, scale);
	return entity;
}

// gltf_maila_hands = await spawn_maila_hands()
spawn_maila_hands = async function() {
	var entity = await fetch_gltf(url + "gltf/maila/maila_hands_3.gltf", {
		layers: [5]
	});
	//var entity = await fetch_gltf(url + "gltf/kudo/untitled.gltf");
	entity.setLocalPosition( player.pos() );
	var scale = 0.3;
	entity.setLocalScale(scale, scale, scale);
	return entity;
}

// mp44 = await spawn_mp44()
spawn_mp44 = async function() {
	var entity = await fetch_gltf(url + "gltf/mp44/mp44.gltf");
	entity.setLocalPosition( player.pos() );
	var scale = 0.3;
	entity.setLocalScale(scale, scale, scale);
	return entity;
}

// door = await spawn_door()
spawn_door = async function(addToScene) {
	var entity = await fetch_gltf(url + "gltf/door/door.gltf");
	entity.setLocalPosition( player.pos() );
	var scale = 0.3;
	entity.setLocalScale(scale, scale, scale);
	if (addToScene == undefined || addToScene == true)
		add(entity);
	return entity;
}

// gltf_maila = await spawn_gltf(url + "gltf/maila/maila.gltf", 0.05)
// gltf = await spawn_gltf(url + "gltf/blender/b.gltf", 0.05)
// crowbar = await spawn_gltf(url + "gltf/crowbar/crowbar.gltf", 0.05)
spawn_gltf = async function(url, scale) {
	url += "?now=" + Date.now() // prevent caching
	var entity = await fetch_gltf(url)
	//entity.setLocalPosition( player.pos() )
	//var scale = 1;
	entity.setLocalScale(scale, scale, scale)
	return entity
}


// ramp = await spawn_gltf(url + "ramps/ramp_1.gltf", 0.01)

