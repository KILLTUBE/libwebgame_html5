GLTF = function() {}

GLTF.fetch = async function(url, options) {
	var basePath = url.substring(0, url.lastIndexOf("/")) + "/";
	if (typeof options === "undefined")
		options = {};
	if ("layers" in options === false)
		options.layers = [0]; // should be worldLayer.id
	console.log("GLTF.fetch", url, options);
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
