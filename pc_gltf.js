GLTF = function() {}

GLTF.fetch = async function(url) {
	var basePath = url.substring(0, url.lastIndexOf("/")) + "/";
	
	return new Promise(function(resolve, reject) {


		app.assets.loadFromUrl(url, 'json', function (err, asset) {
			var json = asset.resource;
			var gltf = JSON.parse(json);
			loadGltf(gltf, app.graphicsDevice, function(roots) {
				var ents = new pc.Entity("childs:" +  roots.length)
				roots.forEach(function (root) {
					ents.addChild(root);
				});
				//gltfRoot.addChild(ents)
				resolve(ents)
			}, {
				basePath: basePath
			});
		});
		
	})
}
