sky_nature = function() {
	data = {
		name: 'forest',
		cubemap: url + 'skybox/1.dds',
		textures: [
			url + 'skybox/2.png',
			url + 'skybox/3.png',
			url + 'skybox/4.png',
			url + 'skybox/5.png',
			url + 'skybox/6.png',
			url + 'skybox/7.png'
		]
	};

	textures = data.textures.map(function(v, i) {
		var asset = new pc.Asset(data.name + '-' + i, 'texture', { url: v }); 
		app.assets.add(asset);
		return asset.id;
	});

	cubemap = new pc.Asset(
		data.name,
		'cubemap',
		{ url: data.cubemap },
		{
			anisotropy: 1,
			magFilter: 1,
			minFilter: 5,
			rgbm: true,
			textures: textures
		}
	);

	app.setSkybox(cubemap)
}

sky_off = function() {
	app.scene.setSkybox(undefined)
}

sky_helipad = function() {
	helipad_textures_string = [
		"pc_sky_helipad/Helipad_posx.png",
		"pc_sky_helipad/Helipad_negx.png",
		"pc_sky_helipad/Helipad_posy.png",
		"pc_sky_helipad/Helipad_negy.png",
		"pc_sky_helipad/Helipad_posz.png",
		"pc_sky_helipad/Helipad_negz.png"
	]

	helipad_textures = helipad_textures_string.map(function(v, i) {
		var asset = new pc.Asset("helipad" + '-' + i, 'texture', { url: url + v });
		app.assets.add(asset);
		return asset.id;
	});	
	
	cubemapAsset = new pc.Asset('helipad', 'cubemap', {
		url: url + "pc_sky_helipad/Helipad.dds"
	}, {
		textures: helipad_textures,
		"magFilter": 1,
		"minFilter": 5,
		"anisotropy": 1,
		"name": "Helipad",
		"rgbm": true,
		//"prefiltered": "Helipad.dds"
	});
	app.assets.add(cubemapAsset);
	app.assets.load(cubemapAsset);
	cubemapAsset.ready(function () {
		app.scene.skyboxMip = 2;
		app.scene.setSkybox(cubemapAsset.resources);
		
	});
	//app.setSkybox(cubemapAsset)
}

sky_greenhouse = function() {
	data = {
		name: 'forest',
		cubemap: url + 'pc_seemore/seemoreGreenhouse.dds',
		textures: [
			// todo: use the actual greenhouse skybox... also somehow separate skybox from cubemap
			url + 'skybox/2.png',
			url + 'skybox/3.png',
			url + 'skybox/4.png',
			url + 'skybox/5.png',
			url + 'skybox/6.png',
			url + 'skybox/7.png'
		]
	};

	textures = data.textures.map(function(v, i) {
		var asset = new pc.Asset(data.name + '-' + i, 'texture', { url: v }); 
		app.assets.add(asset);
		return asset.id;
	});

	cubemap = new pc.Asset(
		data.name,
		'cubemap',
		{ url: data.cubemap },
		{
			anisotropy: 1,
			magFilter: 1,
			minFilter: 5,
			rgbm: true,
			textures: textures
		}
	);

	app.setSkybox(cubemap)
}