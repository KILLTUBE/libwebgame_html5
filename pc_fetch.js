// e.g.
// pc.Texture.fetch(url + "libwebgame/kungmodels/crowbar/triangles_0.jpg").then(_ => tex = _)
// or
// tex = await pc.Texture.fetch(url + "libwebgame/kungmodels/crowbar/triangles_0.jpg")
pc.Texture.fetch = function(url) {
	return new Promise(function(resolve, reject) {
		//var image = new Image();
		//image.crossOrigin = "anonymous";
		//
		//image.onload = function () {
		//	//console.log(this)
		//	var texture = new pc.Texture(app.graphicsDevice);
		//	texture.setSource(image);
		//	resolve(texture)
		//};
		//
		//image.onerror = function (bla) {
		//	console.log("image.onerror", bla);
		//};
		//
		//image.src = url;
		
		if (url in cached) {
			resolve(cached[url].resource)
			return;
		}
		app.assets.loadFromUrl(url, "texture", function(err, asset) {
			cached[url] = asset;
			resolve(asset.resource)
		})		
	})
}

// playbot_anim_run = await pc.Animation.fetch(url + "playcanvas/examples/assets/Playbot/Playbot_run.json")
pc.Animation.fetch = function(url) {
	return new Promise(function(resolve, reject) {
		if (url in cached) {
			resolve(cached[url].resource)
			return;
		}
		app.assets.loadFromUrl(url, "animation", function(err, asset) {
			cached[url] = asset;
			asset.resource.asset = asset;
			resolve(asset.resource)
		})
	})
}

// playbot_model = await pc.Model.fetch(url + "playcanvas/examples/assets/Playbot/Playbot.json")
pc.Model.fetch = function(url) {
	return new Promise(function(resolve, reject) {
		if (url in cached) {
			resolve(cached[url].resource)
			return;
		}
		app.assets.loadFromUrl(url, "model", function(err, asset) {
			cached[url] = asset;
			resolve(asset.resource)
		})
	})
}

// playbot_model = await pc.Model.fetch(url + "playcanvas/examples/assets/Playbot/Playbot.json")
pc.Model.fetch = function(url) {
	return new Promise(function(resolve, reject) {
		if (url in cached) {
			resolve(cached[url].resource)
			return;
		}
		app.assets.loadFromUrl(url, "model", function(err, asset) {
			cached[url] = asset;
			asset.resource.asset = asset;
			resolve(asset.resource)
		})
	})
}

// playbot_sound = await pc.Sound.fetch(url + "playcanvas/examples/assets/footsteps_gravel_01.mp")
pc.Sound.fetch = function(url) {
	return new Promise(function(resolve, reject) {
		if (url in cached) {
			resolve(cached[url])
			return;
		}
		app.assets.loadFromUrl(url, "audio", function(err, asset) {
			//console.log(err, asset)
			if (err != null) {
				// meh i dont really care to catch these
				//reject(err);
				//console.log("pc.Sound.fetch", url, err);
			} else {
				cached[url] = asset;
				resolve(asset);
			}
		})
	})
}

//ProceduralMesh = function(indices, positions, uvs) {
//	this.indices = undefined;
//	this.positions = undefined;
//	this.uvs = undefined;
//}
//ProceduralMesh.prototype = Object.create( pc.Mesh.prototype )

ProceduralMesh = function() {}

ProceduralMesh.fetch = function(name) {
	var downloads = [
		  Int32Array.fetch("./" + name + "/triangles_0.vec3"),
		Float32Array.fetch("./" + name + "/vertices_0/0.vec3"),
		Float32Array.fetch("./" + name + "/uvs_0.vec2"),
	]
	return new Promise(function(resolve, reject) {
		Promise.all(downloads).then(function(tmp) {
			var indices = tmp[0]
			var positions = tmp[1]
			var uvs = tmp[2]
			for (var i=0; i<positions.length; i++)
				positions[i] *= 100;
			//console.log(indices, positions, uvs)
			//console.log("Got all: ", tmp);
			resolve(mesh_from_buffers(indices, positions, uvs))
		})
	})
}

fetch_gltf = async function(url, options) {
	var basePath = url.substring(0, url.lastIndexOf("/")) + "/";
	if (typeof options === "undefined")
		options = {};
	if ("layers" in options === false)
		options.layers = [0]; // should be worldLayer.id
	//console.log("fetch_gltf", url, options);
	return new Promise(function(resolve, reject) {
		app.assets.loadFromUrl(url, 'json', function (err, asset) {
			var json = asset.resource;
			var gltf = JSON.parse(json);
			loadGltf(gltf, app.graphicsDevice, function (model, textures, animationClips) {
				var asset = new pc.Asset('gltf', 'model', {
					url: ''
				});
				asset.resource = model;
				asset.loaded = true;
				app.assets.add(asset);
				var gltf = new pc.Entity('gltf');
				gltf.addComponent('model', {
					asset: asset,
					layers: options.layers
				});
				if ( animationClips && animationClips.length > 0 ) {
					gltf.animComponent = new AnimationComponent();
					for (var i = 0; i < animationClips.length; i++) {
						animationClips[i].transferToRoot(gltf);
						gltf.animComponent.addClip(animationClips[i]);
					}
					gltf.animComponent.playClip(animationClips[0].name);
				}
				resolve(gltf)
			}, {
				basePath: basePath
			});
		});
	})
}
